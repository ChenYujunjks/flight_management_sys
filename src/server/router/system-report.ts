// server/router/system-report.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, createTRPCRouter } from "../context";
import { getUser } from "@/server/auth/getUser";
import { db } from "@/server/db";
import { airlineStaff, flight, ticket } from "@/server/db/schema";
import { and, eq, sql, count } from "drizzle-orm";

export const systemReportRouter = createTRPCRouter({
  getSalesReport: publicProcedure
    .input(
      z.object({
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
      })
    )
    .query(async ({ input }) => {
      const user = await getUser();
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Please log in" });
      }

      const airlineName = (
        await db
          .select({ name: airlineStaff.airlineName })
          .from(airlineStaff)
          .where(eq(airlineStaff.email, user.email))
      )[0]?.name;

      if (!airlineName) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Airline not found for this user",
        });
      }

      const result = await db
        .select({
          month: sql<string>`MONTH(${flight.departureTime})`,
          year: sql<string>`YEAR(${flight.departureTime})`,
          sum: count(ticket.ticketId),
        })
        .from(ticket)
        .leftJoin(flight, eq(ticket.flightNum, flight.flightNum))
        .where(
          and(
            eq(flight.airlineName, airlineName),
            sql`DATE(${flight.departureTime}) BETWEEN DATE('${
              input.startDate.toISOString().split("T")[0]
            }') AND DATE('${input.endDate.toISOString().split("T")[0]}')`
          )
        )
        .groupBy(
          sql`MONTH(${flight.departureTime})`,
          sql`YEAR(${flight.departureTime})`
        );

      // 将 month/year 转为 number，因为目前是 string
      return result.map((r) => ({
        month: Number(r.month),
        year: Number(r.year),
        sum: Number(r.sum),
      }));
    }),
});
