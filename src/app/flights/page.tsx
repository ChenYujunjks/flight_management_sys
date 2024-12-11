"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchFlightsFormSchema } from "@/lib/types";
import FlightsTableWithPurchase from "./flightsTableWithPurchase";
import { trpc } from "@/components/provider";

const SearchPage = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof searchFlightsFormSchema>>({
    resolver: zodResolver(searchFlightsFormSchema),
  });

  // State to hold search parameters
  const [searchParams, setSearchParams] = useState<z.infer<
    typeof searchFlightsFormSchema
  > | null>(null);

  // 使用 tRPC 的 flights.search 查询
  const { data, isLoading, error, refetch } = trpc.search.useQuery(
    searchParams || {},
    {
      enabled: !!searchParams,
    }
  );

  // 用 useEffect 来替代 onSuccess
  useEffect(() => {
    if (data) {
      console.log("TTTesting");
      toast({ description: "Search completed" });
    }
  }, [data, toast]);

  // 用 useEffect 来替代 onError
  useEffect(() => {
    if (error) {
      toast({ title: "Search failed", description: error.message });
    }
  }, [error, toast]);

  const onSubmit = (param: z.infer<typeof searchFlightsFormSchema>) => {
    setSearchParams(param);
    toast({ description: "Searching..." });
    // 触发查询
    refetch();
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Search Flights
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-flow-col justify-stretch gap-4 p-4"
        >
          <FormField
            control={form.control}
            name="departureAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Airport</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrivalAirport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival Airport</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end">
            Search
          </Button>
        </form>
      </Form>
      <h3 className="ml-4 scroll-m-20 text-xl font-semibold tracking-tight">
        Result:
      </h3>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && data && <FlightsTableWithPurchase data={data} />}
    </main>
  );
};

export default SearchPage;
