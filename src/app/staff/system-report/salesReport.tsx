"use client";

import { useState, useEffect } from "react";
import StatsChart from "./statsChart";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { trpc } from "@/components/provider";

export default function SalesReport() {
  const [data, setData] = useState<
    {
      month: number;
      year: number;
      sum: number;
    }[]
  >([]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 4, 1), 20),
  });

  const total = data.reduce((acc, { sum }) => acc + sum, 0);

  // 使用 tRPC 的 systemReport.getSalesReport 查询
  // 不使用 onSuccess/onError, enabled=false 以便通过 refetch 手动触发请求
  const {
    data: queryData,
    error,
    isLoading,
    refetch,
  } = trpc.systemReport.getSalesReport.useQuery(
    {
      startDate: date?.from ?? new Date(),
      endDate: date?.to ?? addDays(new Date(), 20),
    },
    {
      enabled: false,
    }
  );

  // 当 queryData 有值时，更新本地 data 状态
  useEffect(() => {
    if (queryData) {
      setData(queryData);
      console.log("Data fetched successfully");
    }
  }, [queryData]);

  // 当有错误时打印日志或显示错误消息
  useEffect(() => {
    if (error) {
      console.error("Error fetching sales report:", error.message);
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Sales Report
      </h2>
      <div className="flex flex-1 flex-col gap-2">
        <div className="ml-4 flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? "Fetching..." : "Search"}
          </Button>
        </div>
        <h3 className="ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Total: <span>{total}</span>
        </h3>
        <h3 className="ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Breakdown
        </h3>
        <StatsChart
          data={data.map(({ month, year, sum }) => ({
            key: `${month}/${year}`,
            sum: sum,
          }))}
        />
      </div>
    </div>
  );
}
