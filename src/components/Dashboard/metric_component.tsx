"use client";

import { MetricProps } from "@/Types/dashboard";

export const MetricWidget = ({ name, value, percentage, variant = "info" }: MetricProps) => {
  const colors = {
    success: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]",
    warning: "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
    danger: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.3)]",
    info: "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
  };

  return (
    <div className="p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
          {name}
        </span>
        <span className="text-xl font-black tracking-tight text-neutral-50 font-mono">
          {value}
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colors[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default MetricWidget;