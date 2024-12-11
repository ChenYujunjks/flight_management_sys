"use client";

import dynamic from "next/dynamic";

const StatsChart = dynamic(() => import("./statsChart"), {
  ssr: false,
});

export default function StatsChartWrapper({ data }: { data: any[] }) {
  return <StatsChart data={data} />;
}
