// router/flights/search.ts
import { publicProcedure } from "../context";
import { db } from "@/server/db";
import { flight } from "@/server/db/schema";
import { searchFlightsFormSchema } from "@/lib/types";
import { eq, and, sql } from "drizzle-orm";

export const searchRouter = publicProcedure
  .input(searchFlightsFormSchema)
  .query(async ({ input }) => {
    const { arrivalAirport, departureAirport, departureDate } = input;

    const conditions = [];

    if (arrivalAirport) {
      conditions.push(eq(flight.arrivalAirport, arrivalAirport));
    }

    if (departureAirport) {
      conditions.push(eq(flight.departureAirport, departureAirport));
    }

    if (departureDate) {
      conditions.push(sql`DATE(${flight.departureTime}) = ${departureDate}`);
    }

    // 添加必须为未来航班
    conditions.push(sql`DATE(${flight.departureTime}) > CURDATE()`);

    const result = await db
      .select()
      .from(flight)
      .where(and(...conditions));

    return result;
  });
