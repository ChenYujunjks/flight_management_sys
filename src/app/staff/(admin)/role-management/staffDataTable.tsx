"use client";

import { type Row, type ColumnDef } from "@tanstack/react-table";
import { type InferSelectModel } from "drizzle-orm";
import { DataTable } from "@/components/dataTable";
import { type airlineStaff } from "@/server/db/schema";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { updatePermissionAction } from "./updatePermissionAction";

// 定义一个新类型，剔除不需要的字段
type TableAirlineStaff = Omit<
  InferSelectModel<typeof airlineStaff>,
  "password"
>;
const staffTableColumn: ColumnDef<TableAirlineStaff>[] = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Airline Name",
    accessorKey: "airlineName",
  },
  {
    header: "Permission",
    accessorKey: "permission",
  },
  {
    header: "Action",
    id: "action",
    cell: ({ row }) => {
      return <PermDialog row={row} />;
    },
  },
];

const StaffDataTable = ({
  data,
}: {
  data: InferSelectModel<typeof airlineStaff>[];
}) => {
  return <DataTable columns={staffTableColumn} data={data} />;
};

function PermDialog({
  row,
}: {
  row: Row<{
    email: string;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    airlineName: string;
    permission: number;
  }>;
}) {
  const { toast } = useToast();
  const [permission, setPermission] = useState<number>(
    row.getValue("permission")
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-blue-700">Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Role Permission</DialogTitle>
        </DialogHeader>
        <Select
          onValueChange={(e) => {
            setPermission(parseInt(e));
          }}
          value={`${permission}`} // 确保 Select 显示当前值
        >
          <SelectTrigger>
            <SelectValue placeholder="Select permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Admin</SelectItem>
            <SelectItem value="1">Operator</SelectItem>
            <SelectItem value="0">None</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button
            onClick={() => {
              startTransition(async () => {
                try {
                  await updatePermissionAction({
                    email: row.getValue("email"),
                    permission,
                  });
                  toast({ description: "Update successful" });
                } catch (error) {
                  toast({ title: "Update failed", description: error.message });
                }
              });
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default StaffDataTable;
