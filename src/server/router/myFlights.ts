// server/router/myFlights.ts
import { TRPCError } from "@trpc/server";
import { publicProcedure, createTRPCRouter } from "../context";
import { db } from "@/server/db";
import { flight, ticket } from "@/server/db/schema";
import { and, eq, sql } from "drizzle-orm";

// 创建 myFlights 路由
export const myFlightsRouter = createTRPCRouter({
  getMyFlights: publicProcedure.query(async ({ ctx }) => {
    const user = ctx.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view your flights.",
      });
    }

    try {
      const data = await db
        .select(flight)
        .from(flight)
        .rightJoin(ticket, eq(flight.flightNum, ticket.flightNum))
        .where(
          and(
            eq(ticket.customerEmail, user.email),
            sql`Date(${flight.departureTime}) > CURDATE()`
          )
        );

      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch your flights.",
      });
    }
  }),
});
