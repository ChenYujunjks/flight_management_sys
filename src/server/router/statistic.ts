// server/router/statistic.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../context";
import { db } from "@/server/db";
import { bookingAgent, flight, ticket } from "@/server/db/schema";
import { and, eq, or, sql, sum } from "drizzle-orm";
import { getUser } from "@/server/auth/getUser";
import { getUserType } from "@/server/auth/getUserType";

export const statisticRouter = publicProcedure
  .input(
    z.object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
    })
  )
  .query(async ({ input }) => {
    const { startDate, endDate } = input;

    const user = await getUser();

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view statistics.",
      });
    }

    // 如果需要根据用户类型做不同逻辑
    const userType = await getUserType(user.email);
    console.log("User type:", userType);

    const { bookingAgentId } =
      (
        await db
          .select({ bookingAgentId: bookingAgent.bookingAgentId })
          .from(bookingAgent)
          .where(eq(bookingAgent.email, user.email))
      )[0] ?? {};
    // 将日期转换为 YYYY-MM-DD 字符串
    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
    try {
      const conditions = [
        or(
          eq(ticket.customerEmail, user.email),
          eq(ticket.bookingAgentId, bookingAgentId ?? "INVALID_AGENT_ID")
        ),
        // 使用参数化，而不是手动加引号
        sql`DATE(${flight.departureTime}) BETWEEN DATE(${sql.param(
          startDateString
        )}) AND DATE(${sql.param(endDateString)})`,
      ];

      const result = await db
        .select({
          month: sql<string>`MONTH(${flight.departureTime})`,
          year: sql<string>`YEAR(${flight.departureTime})`,
          sum: sum(flight.price),
        })
        .from(ticket)
        .leftJoin(flight, eq(ticket.flightNum, flight.flightNum))
        .where(and(...conditions))
        .groupBy(
          sql`MONTH(${flight.departureTime})`,
          sql`YEAR(${flight.departureTime})`
        );
      console.log("data query result:", result);
      return result;
    } catch (error) {
      console.error("Statistics error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch statistics.",
      });
    }
  });
