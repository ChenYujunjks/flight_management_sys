"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const SpendingDataChart = ({ data }: { data: unknown[] }) => {
  return (
    <BarChart
      width={512}
      height={512}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="sum" fill="#227D51" />
    </BarChart>
  );
};

export default SpendingDataChart;
