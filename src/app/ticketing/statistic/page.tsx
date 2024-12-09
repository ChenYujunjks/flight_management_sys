// statistic/page.tsx
"use client";

import { useState } from "react";
import SpendingDataChart from "./spendingChart";
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

const dateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

type DateRangeInput = z.infer<typeof dateRangeSchema>;

export default function SpendingPage() {
  const [data, setData] = useState<
    {
      month: number;
      year: number;
      sum: string;
    }[]
  >([]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 4, 1),
    to: addDays(new Date(2024, 4, 1), 20),
  });

  const total = data.reduce(
    (acc, { sum }) => acc + parseFloat(sum ? sum : "0"),
    0
  );

  const form = useForm<DateRangeInput>({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: {
      startDate: date?.from ?? new Date(),
      endDate: date?.to ?? addDays(new Date(), 20),
    },
  });

  const { handleSubmit } = form;

  const { mutate, isLoading } = trpc.statistic.getStatistics.useMutation({
    onSuccess: (result) => {
      setData(result);
      toast.success("Statistics fetched successfully");
    },
    onError: (err) => {
      toast.error("Failed to fetch statistics", { description: err.message });
    },
  });

  const onSubmit = (input: DateRangeInput) => {
    mutate({
      startDate: input.startDate,
      endDate: input.endDate,
    });
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
                  form.setValue("startDate", selected.from);
                  form.setValue("endDate", selected.to);
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
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
