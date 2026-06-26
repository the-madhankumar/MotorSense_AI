"use client";

import { useState } from "react";

type Severity = "critical" | "warning" | "info";
type Status = "New" | "Acknowledged" | "In Progress" | "Resolved";

interface Alert {
  id: string;
  title: string;
  severity: Severity;
  category: "Mechanical" | "Electrical" | "AI" | "System";
  time: string;
  status: Status;
  confidence: number;
  summary: string;
  action: string;
  evidence: { label: string; value: string }[];
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    title: "Bearing Vibration High",
    severity: "critical",
    category: "Mechanical",
    time: "10:36 AM",
    status: "New",
    confidence: 94,
    summary: "Vibration is above safe threshold indicating possible bearing wear.",
    action: "Inspect bearing within 24 hours.",
    evidence: [
      { label: "Vibration", value: "3.8 mm/s" },
      { label: "Current", value: "5.6 A" },
    ],
  },
  {
    id: "2",
    title: "THD Increase Detected",
    severity: "warning",
    category: "Electrical",
    time: "10:12 AM",
    status: "Acknowledged",
    confidence: 88,
    summary: "Power quality disturbance detected in supply line.",
    action: "Check capacitor bank and supply stability.",
    evidence: [
      { label: "THD", value: "6.5%" },
      { label: "Voltage", value: "228 V" },
    ],
  },
];

export default function AlertsPanel() {
  const [alerts] = useState(initialAlerts);
  const [selected, setSelected] = useState<Alert>(alerts[0]);

  const getColor = (severity: Severity) => {
    if (severity === "critical") return "text-red-500";
    if (severity === "warning") return "text-amber-500";
    return "text-sky-500";
  };

  return (
    <div className="flex h-screen bg-neutral-950 text-white p-4 gap-4 font-mono">

      {/* LEFT SIDE - LIST */}
      <div className="w-[320px] bg-neutral-900 rounded-xl p-3 overflow-y-auto">
        <h2 className="text-sm font-bold mb-3">Alerts</h2>

        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => setSelected(alert)}
            className={`p-3 mb-2 rounded-lg cursor-pointer border transition
              ${selected.id === alert.id
                ? "border-white bg-neutral-800"
                : "border-neutral-800 hover:bg-neutral-800"
              }`}
          >
            <div className="flex justify-between">
              <p className="text-sm font-semibold">{alert.title}</p>
              <span className={`text-xs ${getColor(alert.severity)}`}>
                {alert.severity}
              </span>
            </div>

            <p className="text-xs text-neutral-400 mt-1">
              {alert.category} • {alert.time}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <div className="flex-1 bg-neutral-900 rounded-xl p-5">

        {/* Title */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">{selected.title}</h1>
          <span className={`text-sm ${getColor(selected.severity)}`}>
            {selected.severity.toUpperCase()}
          </span>
        </div>

        <p className="text-xs text-neutral-400 mt-1">
          Confidence: {selected.confidence}%
        </p>

        {/* Summary */}
        <div className="mt-4 bg-neutral-800 p-3 rounded-lg">
          <p className="text-sm text-neutral-300">
            {selected.summary}
          </p>
        </div>

        {/* Evidence */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold mb-2">Sensor Data</h3>

          <div className="grid grid-cols-2 gap-2">
            {selected.evidence.map((e, i) => (
              <div key={i} className="bg-neutral-800 p-3 rounded-lg">
                <p className="text-xs text-neutral-400">{e.label}</p>
                <p className="text-sm font-semibold">{e.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Recommended Action</h3>

          <div className="bg-emerald-900/20 border border-emerald-800 p-3 rounded-lg">
            <p className="text-sm text-emerald-300">
              {selected.action}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-2">
          <button className="px-4 py-2 bg-neutral-800 rounded-lg text-sm">
            Acknowledge
          </button>

          <button className="px-4 py-2 bg-emerald-700 rounded-lg text-sm">
            Resolve
          </button>

          <button className="px-4 py-2 bg-neutral-800 rounded-lg text-sm">
            Escalate
          </button>
        </div>

      </div>
    </div>
  );
}