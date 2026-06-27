"use client";

import { useAlertCheck, useAlertStore } from "@/Context/alert_context";
import { useAlertStream } from "@/lib/Alerts/AlertStream";
import { Alert, Severity } from "@/Types/alerts";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

function color(severity: Severity) {
  if (severity === "critical") return "text-red-500";
  if (severity === "warning") return "text-amber-500";
  return "text-sky-500";
}

function statusColor(status: Alert["status"]) {
  if (status === "Resolved") return "text-green-500";
  if (status === "Acknowledged") return "text-yellow-400";
  if (status === "In Progress") return "text-blue-400";
  return "text-white";
}

export default function AlertsPanel() {
  useAlertStream(2000);

  const alerts = useAlertStore((s: { alerts: any; }) => s.alerts);
  const selected = useAlertStore((s: { selected: any; }) => s.selected);
  const select = useAlertStore((s: { select: any; }) => s.select);
  const updateStatus = useAlertStore((s: { updateStatus: any; }) => s.updateStatus);

  return (
    <div className="flex h-screen bg-neutral-950 text-white p-4 gap-4 font-mono">

      <div className="w-85 bg-neutral-900 rounded-xl p-3 overflow-y-auto">
        <h2 className="text-sm font-bold mb-3">Live Alerts</h2>

        {alerts.map((a: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; severity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; category: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <div
            key={a.id}
            onClick={() => select(a)}
            className={`p-3 mb-2 rounded-lg cursor-pointer border ${
              selected?.id === a.id
                ? "border-white bg-neutral-800"
                : "border-neutral-800 hover:bg-neutral-800"
            }`}
          >
            <div className="flex justify-between">
              <p className="text-sm font-semibold">{a.title}</p>
              <span className={`text-xs ${color(selected?.severity)}`}>
                {a.severity}
              </span>
            </div>

            <p className={`text-xs mt-1 ${statusColor(selected?.status)}`}>
              {a.category} • {a.status}
            </p>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-neutral-900 rounded-xl p-5">

        {!selected ? (
          <div className="text-neutral-400">Select an alert</div>
        ) : (
          <>
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">{selected.title}</h1>
              <span className={`text-sm ${color(selected.severity)}`}>
                {selected.severity.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-neutral-400 mt-1">
              Confidence: {selected.confidence}%
            </p>

            <div className="mt-4 bg-neutral-800 p-3 rounded-lg">
              {selected.summary}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              {selected.evidence.map((e: { label: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; value: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
                <div key={i} className="bg-neutral-800 p-3 rounded-lg">
                  <p className="text-xs text-neutral-400">{e.label}</p>
                  <p className="text-sm font-semibold">{e.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => updateStatus(selected.id, "Acknowledged")}
                className="px-4 py-2 bg-yellow-700 rounded-lg text-sm"
              >
                Acknowledge
              </button>

              <button
                onClick={() => updateStatus(selected.id, "Resolved")}
                className="px-4 py-2 bg-green-700 rounded-lg text-sm"
              >
                Resolve
              </button>

              <button
                onClick={() => updateStatus(selected.id, "In Progress")}
                className="px-4 py-2 bg-blue-700 rounded-lg text-sm"
              >
                Escalate
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}