"use client";

import { kpiType } from "@/Types/dashboard";
import { Triangle } from 'lucide-react';

export default function KPIWidget({ kpi }: { kpi: kpiType }) {
  const variants = {
    success: {
      dot: "bg-emerald-500",
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      gradient: "from-emerald-500 to-teal-500",
    },
    warning: {
      dot: "bg-amber-500",
      badge: "bg-amber-500/15 text-amber-400 border-amber-500/20",
      gradient: "from-amber-500 to-orange-500",
    },
    danger: {
      dot: "bg-rose-500",
      badge: "bg-rose-500/15 text-rose-400 border-rose-500/20",
      gradient: "from-rose-500 to-pink-500",
    },
    info: {
      dot: "bg-sky-500",
      badge: "bg-sky-500/15 text-sky-400 border-sky-500/20",
      gradient: "from-sky-500 to-cyan-500",
    },
  };

  const color =
    variants[kpi.statusVariant as keyof typeof variants] || variants.info;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-linear-to-br from-neutral-900 to-neutral-950 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative flex items-center justify-between">
        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500">
          {kpi.name}
        </h4>

        <span
          className={`h-3 w-3 rounded-full ${color.dot} shadow-lg shadow-current`}
        />
      </div>

      <div className="relative mt-6 flex items-end gap-2">
        <h2
          className={`text-4xl font-black bg-linear-to-r ${color.gradient} bg-clip-text text-transparent`}
        >
          {kpi.value}
        </h2>

        {kpi.unit && (
          <span className="mb-1 text-sm font-semibold text-neutral-400">
            {kpi.unit}
          </span>
        )}
      </div>

      {kpi.trend && (
        <div className="relative mt-5">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${color.badge}`}
          >
            {kpi.trend.direction === "up" && <Triangle />}
            {kpi.trend.direction === "down" && <Triangle className="rotate-180" />}
            {kpi.trend.direction === "neutral" && "➖"}

            {kpi.trend.label}
          </span>
        </div>
      )}
    </div>
  );
}