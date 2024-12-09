"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTable } from "@/components/dataTable";
import { type flight } from "@/server/db/schema";

// 定义表格列
const flightsTableColumn: ColumnDef<InferSelectModel<typeof flight>>[] = [
  {
    header: "Flight Number",
    accessorKey: "flightNumber",
    cell: ({ row }) => {
      const val: string = row.getValue("flightNumber");
      return <span className="font-mono">{val}</span>;
    },
  },
  {
    header: "Airline Name",
    accessorKey: "airlineName",
    cell: ({ row }) => <span>{row.getValue("airlineName")}</span>,
  },
  {
    header: "Departure Airport",
    accessorKey: "departureAirport",
    cell: ({ row }) => <span>{row.getValue("departureAirport")}</span>,
  },
  {
    header: "Arrival Airport",
    accessorKey: "arrivalAirport",
    cell: ({ row }) => <span>{row.getValue("arrivalAirport")}</span>,
  },
  {
    header: "Departure Time",
    accessorKey: "departureTime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("departureTime"));
      return (
        <span className="font-mono">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    header: "Arrival Time",
    accessorKey: "arrivalTime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("arrivalTime"));
      return (
        <span className="font-mono">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <span className="font-medium">{formatted}</span>;
    },
  },
  {
    header: "Airplane ID",
    accessorKey: "airplaneIdNum",
    cell: ({ row }) => {
      const val: string = row.getValue("airplaneIdNum");
      return <span className="font-mono">{val}</span>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const val: string = row.getValue("status");
      return <span className="font-mono uppercase">{val}</span>;
    },
  },
];

const FlightsTable = ({
  data,
}: {
  data: Array<InferSelectModel<typeof flight>>;
}) => {
  return <DataTable columns={flightsTableColumn} data={data} />;
};

export default FlightsTable;
