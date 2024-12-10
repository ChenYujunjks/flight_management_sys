// server/router/statistic.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, createTRPCRouter } from "../context";
import { db } from "@/server/db";
import { bookingAgent, flight, ticket } from "@/server/db/schema";
import { and, eq, or, sql, sum } from "drizzle-orm";

export const statisticRouter = createTRPCRouter({
  getStatistics: publicProcedure
    .input(
      z.object({
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { startDate, endDate } = input;
      const user = ctx.user;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to view statistics.",
        });
      }

      const { bookingAgentId } =
        (
          await db
            .select({ bookingAgentId: bookingAgent.bookingAgentId })
            .from(bookingAgent)
            .where(eq(bookingAgent.email, user.email))
        )[0] ?? {};

      try {
        const conditions = [
          or(
            eq(ticket.customerEmail, user.email),
            eq(ticket.bookingAgentId, bookingAgentId ?? "INVALID_AGENT_ID") // 修改为字符串
          ),
          sql`DATE(${flight.departureTime}) BETWEEN DATE('${
            startDate.toISOString().split("T")[0]
          }') AND DATE('${endDate.toISOString().split("T")[0]}')`,
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

        return result;
      } catch (error) {
        console.error("Statistics error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch statistics.",
        });
      }
    }),
});
