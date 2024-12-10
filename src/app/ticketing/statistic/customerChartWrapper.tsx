// src/app/ticketing/statistic/customerChartWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const CustomerChart = dynamic(() => import("./customerChart"), {
  ssr: false,
});

export default function CustomerChartWrapper({ data }: { data: any }) {
  return <CustomerChart data={data} />;
}
