import { and, eq, sql } from "drizzle-orm";
import FlightsTable from "@/components/flightsTable";
import { getUser } from "@/server/auth/getUser";
import { db } from "@/server/db";
import { flight, ticket } from "@/server/db/schema";

export default async function MyFlightsPage() {
  const user = await getUser();
  const data = await db
    .select({
      flightNum: flight.flightNum,
      airlineName: flight.airlineName,
      departureAirport: flight.departureAirport,
      arrivalAirport: flight.arrivalAirport,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      price: flight.price,
      airplaneId: flight.airplaneId,
      status: flight.status,
    })
    .from(flight)
    .rightJoin(ticket, eq(flight.flightNum, ticket.flightNum))
    .where(
      and(
        eq(ticket.customerEmail, user!.email),
        sql`Date(${flight.departureTime}) > CURDATE()`
      )
    );

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My Flights
      </h2>
      <FlightsTable data={data} />
    </main>
  );
}
