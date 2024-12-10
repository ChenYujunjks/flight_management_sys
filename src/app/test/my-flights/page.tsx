// app/flights/my-flights/page.tsx
import { and, eq, sql } from "drizzle-orm";
import { getUser } from "@/server/auth/getUser";
import { db } from "@/server/db";
import { flight, ticket } from "@/server/db/schema";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // 确保路径正确选的加载

type Flight = {
  flightNum: string;
  airlineName: string | null;
  departureAirport: string | null;
  arrivalAirport: string | null;
  departureTime: string | null;
  arrivalTime: string | null;
  price: string | null;
  airplaneId: string | null;
  status: string | null;
};

export default async function MyFlightsPage() {
  const user = await getUser();

  if (!user) {
    return (
      <main className="flex flex-col gap-4 p-4">
        <h2 className="text-3xl font-semibold">My Flights</h2>
        <p>您需要登录才能查看您的航班信息。</p>
      </main>
    );
  }

  // 执行数据库查询
  let data: Flight[] = [];
  try {
    data = await db
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
      .innerJoin(ticket, eq(flight.flightNum, ticket.flightNum))
      .where(
        and(
          eq(ticket.customerEmail, user.email),
          sql`DATE(${flight.departureTime}) > CURDATE()`
        )
      );
  } catch (error) {
    console.error("数据库查询错误:", error);
    return (
      <main className="flex flex-col gap-4 p-4">
        <h2 className="text-3xl font-semibold">My Flights</h2>
        <p>获取航班信息时发生错误，请稍后再试。</p>
      </main>
    );
  }
  console.log("flights incoming:", data);
  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="text-3xl font-semibold">My Flights</h2>
      {data.length === 0 ? (
        <p>您没有即将到来的航班。</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>航班号</TableHead>
              <TableHead>航空公司</TableHead>
              <TableHead>出发机场</TableHead>
              <TableHead>到达机场</TableHead>
              <TableHead>出发时间</TableHead>
              <TableHead>到达时间</TableHead>
              <TableHead>价格</TableHead>
              <TableHead>飞机编号</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((flight) => (
              <TableRow key={flight.flightNum}>
                <TableCell>{flight.flightNum}</TableCell>
                <TableCell>{flight.airlineName ?? "N/A"}</TableCell>
                <TableCell>{flight.departureAirport ?? "N/A"}</TableCell>
                <TableCell>{flight.arrivalAirport ?? "N/A"}</TableCell>
                <TableCell>
                  {flight.departureTime
                    ? new Date(flight.departureTime).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {flight.arrivalTime
                    ? new Date(flight.arrivalTime).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {flight.price
                    ? `$${parseFloat(flight.price).toFixed(2)}`
                    : "N/A"}
                </TableCell>
                <TableCell>{flight.airplaneId ?? "N/A"}</TableCell>
                <TableCell>{flight.status ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
