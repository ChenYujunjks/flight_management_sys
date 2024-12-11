"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { flight } from "@/server/db/schema";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { trpc } from "@/components/provider";
interface FlightsTableWithPurchaseProps {
  data: InferSelectModel<typeof flight>[];
}
const flightsTableColumn: ColumnDef<InferSelectModel<typeof flight>>[] = [
  {
    header: "Flight Number",
    accessorKey: "flightNum",
    cell: ({ row }) => {
      const val: string = row.getValue("flightNum");
      return <div className="font-mono">{val}</div>;
    },
  },
  {
    header: "Airline Name",
    accessorKey: "airlineName",
  },
  {
    header: "Departure Airport",
    accessorKey: "departureAirport",
  },
  {
    header: "Arrival Airport",
    accessorKey: "arrivalAirport",
  },
  {
    header: "Departure Time",
    accessorKey: "departureTime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("departureTime"));
      return (
        <div className="font-mono">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </div>
      );
    },
  },
  {
    header: "Arrival Time",
    accessorKey: "arrivalTime",
    cell: ({ row }) => {
      const date = new Date(row.getValue("arrivalTime"));
      return (
        <div className="font-mono">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </div>
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

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    header: "Airplane ID",
    accessorKey: "airplaneIdNum",
    cell: ({ row }) => {
      const val: string = row.getValue("airplaneIdNum");
      return <div className="font-mono">{val}</div>;
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const val: string = row.getValue("status");
      return <div className="font-mono uppercase">{val}</div>;
    },
  },
  {
    header: "Purchase",
    id: "purchase",
    cell: ({ row }) => {
      return <PurchaseDialog row={row} />;
    },
  },
];

const FlightsTableWithPurchase: React.FC<FlightsTableWithPurchaseProps> = ({
  data,
}) => {
  if (!data) return <div>No flights available.</div>;

  return <DataTable columns={flightsTableColumn} data={data} />;
};

export default FlightsTableWithPurchase;

// PurchaseDialog 组件
function PurchaseDialog({ row }: { row: any }) {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");

  const purchaseMutation = trpc.purchase.useMutation({
    onSuccess: () => {
      toast({
        title: "Purchase successful",
        description: `Purchased flight ${row.getValue(
          "flightNum"
        )} from ${row.getValue("departureAirport")} to ${row.getValue(
          "arrivalAirport"
        )} at ${new Date(row.getValue("departureTime")).toLocaleString()}.`,
      });
    },
    onError: (error) => {
      console.error("Purchase failed:", error);
      toast({
        title: "Purchase failed",
        description: error.message || "An unknown error occurred.",
        variant: "destructive", // 用于显示错误样式
      });
    },
  });

  const handlePurchase = () => {
    purchaseMutation.mutate({
      flightNum: row.getValue("flightNum"),
      email: email || undefined,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-blue-700">Purchase</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete the purchase</DialogTitle>
        </DialogHeader>
        To purchase for someone else, enter the email address of the person
        (Optional).
        <Input
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handlePurchase}>
            Purchase for {email || "yourself"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
