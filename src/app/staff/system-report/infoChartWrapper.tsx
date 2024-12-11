"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";

// 动态导入 InfoChart，不进行 SSR
const InfoChart = dynamic(() => import("./infoChart"), {
  ssr: false,
});

interface InfoChartWrapperProps {
  data: any[];
  color: string;
}

const InfoChartWrapper: FC<InfoChartWrapperProps> = ({ data, color }) => {
  return <InfoChart data={data} color={color} />;
};

export default InfoChartWrapper;
