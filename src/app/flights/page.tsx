"use client";

import { useState } from "react";
import FlightsTableWithPurchase from "./flightsTableWithPurchase";
import { trpc } from "@/components/provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FlightsPage = () => {
  const [searchParams, setSearchParams] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureDate: "",
  });

  const searchFlights = trpc.flights.search.useMutation({
    onSuccess: (data) => {
      // 处理搜索结果，例如将结果传递给表格组件
      // 您可能需要将表格组件的数据来源更改为搜索结果
      // 或者将搜索结果存储在状态中并传递给表格组件
    },
    onError: (error) => {
      toast.error("Search failed", {
        description: error.message,
      });
    },
  });

  const handleSearch = () => {
    searchFlights.mutate(searchParams);
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Departure Airport"
          value={searchParams.departureAirport}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              departureAirport: e.target.value,
            }))
          }
        />
        <Input
          placeholder="Arrival Airport"
          value={searchParams.arrivalAirport}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              arrivalAirport: e.target.value,
            }))
          }
        />
        <Input
          type="date"
          placeholder="Departure Date"
          value={searchParams.departureDate}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              departureDate: e.target.value,
            }))
          }
        />
        <Button onClick={handleSearch}>Search Flights</Button>
      </div>
      {/* 假设您希望根据搜索结果更新表格 */}
      {/* 需要修改 FlightsTableWithPurchase 以接受数据作为 props */}
      <FlightsTableWithPurchase />
    </div>
  );
};

export default FlightsPage;
