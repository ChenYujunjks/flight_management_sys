"use client";

import { useState, useEffect } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/components/provider";
import { toast } from "sonner";
import SpendingDataChart from "./spendingChart";

// 定义 Zod schema 来校验用户选择的日期范围
const dateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

type DateRangeInput = z.infer<typeof dateRangeSchema>;

export default function SpendingPage() {
  const [data, setData] = useState<
    {
      month: string;
      year: string;
      sum: string | null;
    }[]
  >([]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 4, 1), 20),
  });

  // 从 data 中计算总和
  const total = data.reduce(
    (acc, { sum }) => acc + parseFloat(sum ? sum : "0"),
    0
  );

  // 使用react-hook-form来管理表单数据
  const form = useForm<DateRangeInput>({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: {
      startDate: date?.from ?? new Date(),
      endDate: date?.to ?? addDays(new Date(), 20),
    },
  });

  const { startDate, endDate } = form.getValues();

  // 使用useQuery来查询统计数据，初始enabled为false表示不在挂载时立即请求
  const {
    refetch,
    isLoading,
    data: queryData,
    error,
  } = trpc.statistic.useQuery(
    {
      startDate,
      endDate,
    },
    {
      enabled: false, // 不自动请求，等待手动调用 refetch()
      // 移除 onSuccess 和 onError
    }
  );

  // 使用 useEffect 来代替 onSuccess
  useEffect(() => {
    if (queryData) {
      setData(queryData);
      toast.success("Statistics fetched successfully");
    }
  }, [queryData]);

  // 同样，如果需要错误处理，也可在 useEffect 中监听 error
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch statistics", { description: error.message });
    }
  }, [error]);

  // 提交表单时，使用 refetch 来手动触发请求
  const onSubmit = (input: DateRangeInput) => {
    form.setValue("startDate", input.startDate);
    form.setValue("endDate", input.endDate);
    // 触发请求
    refetch();
  };

  return (
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
              onSelect={(selected) => {
                setDate(selected);
                if (selected?.from && selected?.to) {
                  // 更新表单中的日期
                  form.setValue("startDate", selected.from);
                  form.setValue("endDate", selected.to);
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      <h3 className="ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Total:{" "}
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </span>
      </h3>
      <h3 className="ml-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Breakdown
      </h3>
      <SpendingDataChart
        data={data.map(({ month, year, sum }) => ({
          month: `${month}/${year}`,
          sum: parseFloat(sum ? sum : "0"),
        }))}
      />
    </div>
  );
}
