"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useElectricalStream } from "@/lib/DashUtils/electricStream";


const chartConfig = {
  voltage: {
    label: "Voltage (V)",
  },
  current: {
    label: "Current (A)",
  },
} satisfies ChartConfig;

export function ElectricalChart({
  title = "Electrical Metrics",
  updateInterval = 2000,
}: {
  title?: string;
  updateInterval?: number;
}) {
  const data = useElectricalStream(updateInterval);

  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl w-300 max-w-2xl bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white h-120">
      {title && <h3 className="text-lg font-semibold tracking-tight">{title}</h3>}

      <ChartContainer config={chartConfig} className="w-full h-87.5">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{ top: 20, left: 12, right: 12, bottom: 5 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#334155" />

          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            stroke="#94a3b8"
          />

          <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="#94a3b8" />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />

          <Line
            dataKey="voltage"
            type="monotone"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6" }}
            activeDot={{ r: 6 }}
          >
            <LabelList position="top" offset={10} className="fill-white" fontSize={11} />
          </Line>

          <Line
            dataKey="current"
            type="monotone"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: "#ef4444" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}