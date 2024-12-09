// ticketing/my-flights/page.tsx
"use client";
import { trpc } from "@/components/provider";
import FlightsTable from "@/components/flightTable";
import { Toaster, toast } from "sonner";

const MyFlightsPage = () => {
  const { data, isLoading, error, refetch } =
    trpc.myFlights.getMyFlights.useQuery(undefined, {
      onError: (err) => {
        toast.error("Failed to fetch your flights", {
          description: err.message,
        });
      },
      onSuccess: () => {
        // 可选：在成功获取数据后执行某些操作
      },
    });

  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="ml-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My Flights
      </h2>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <FlightsTable data={data} />}
      <Toaster /> {/* 确保 Toaster 被渲染以支持 toast */}
    </main>
  );
};

export default MyFlightsPage;
