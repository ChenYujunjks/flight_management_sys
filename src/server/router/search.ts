// router/flights/search.ts
import { publicProcedure } from "../context";
import { db } from "@/server/db";
import { flight } from "@/server/db/schema";
import { and, sql } from "drizzle-orm";
import { searchFlightsFormSchema } from "@/lib/types";

export const searchRouter = publicProcedure
  .input(searchFlightsFormSchema)
  .query(async ({ input }) => {
    const { arrivalAirport, departureAirport, departureDate } = input;

    const conditions = [];

    if (arrivalAirport) {
      conditions.push(`arrival_airport = '${arrivalAirport}'`);
    }

    if (departureAirport) {
      conditions.push(`departure_airport = '${departureAirport}'`);
    }

    if (departureDate) {
      conditions.push(`DATE(departure_time) = '${departureDate}'`);
    }

    const whereClause =
      conditions.length > 0 ? conditions.join(" AND ") : "TRUE";

    const result = await db
      .select()
      .from(flight)
      .where(
        and(
          sql.raw(`${whereClause}`),
          sql`DATE(${flight.departureTime}) > CURDATE()`
        )
      );

    return result;
  });
