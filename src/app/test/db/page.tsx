import { useState } from "react";
import { trpc } from "@/components/provider";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "shadcn/ui";

export default function FlightsPage() {
  const [flightsVisible, setFlightsVisible] = useState(false);
  const flightsQuery = trpc.getFlights.useQuery();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Flight Information</h1>
      <Button
        onClick={() => setFlightsVisible((prev) => !prev)}
        className="mb-4"
      >
        {flightsVisible ? "Hide Flights" : "Show Flights"}
      </Button>

      {flightsVisible && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell>Airline Name</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flightsQuery.data ? (
              flightsQuery.data.map((flight) => (
                <TableRow key={flight.flightNum}>
                  <TableCell>{flight.flightNum}</TableCell>
                  <TableCell>{flight.airlineName}</TableCell>
                  <TableCell>{flight.departureTime}</TableCell>
                  <TableCell>{flight.arrivalTime}</TableCell>
                  <TableCell>{flight.price}</TableCell>
                  <TableCell>{flight.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
