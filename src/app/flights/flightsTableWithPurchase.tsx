// flightsTable.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InferSelectModel } from "drizzle-orm";
import { toast } from "sonner";
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

const flightsTableColumn: ColumnDef<InferSelectModel<typeof flight>>[] = [
  // ... 其他列定义保持不变
  {
    header: "Purchase",
    id: "purchase",
    cell: ({ row }) => {
      return <PurchaseDialog row={row} />;
    },
  },
];

const FlightsTableWithPurchase = () => {
  const { data, isLoading, error } = trpc.getFlights.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <DataTable columns={flightsTableColumn} data={data || []} />;
};

export default FlightsTableWithPurchase;

// PurchaseDialog 组件
function PurchaseDialog({ row }: { row: any }) {
  const [email, setEmail] = useState<string>("");
  const purchaseMutation = trpc.flights.purchase.useMutation({
    onSuccess: () => {
      toast.success("Purchase successful", {
        description: `Purchased flight ${row.getValue(
          "flightNumber"
        )} From ${row.getValue("departureAirport")} to ${row.getValue(
          "arrivalAirport"
        )} At ${new Date(row.getValue("departureTime")).toLocaleString()}`,
      });
    },
    onError: (error) => {
      toast.error("Purchase failed", {
        description: error.message,
      });
    },
  });

  const handlePurchase = () => {
    purchaseMutation.mutate({
      flightNum: row.getValue("flightNumber"),
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
