import { useEffect, useRef } from "react";
import { subscribeToMachineData } from "@/lib/firebaseUtils";
import { useAlertCheck, useAlertStore } from "@/Context/alert_context";
import { Alert } from "@/Types/alerts";

function createAlerts(data: any): Alert[] {
  const alerts: Alert[] = [];

  if (data.vibration > 3.5) {
    alerts.push({
      id: crypto.randomUUID(),
      title: "High Vibration Detected",
      severity: "critical",
      category: "Mechanical",
      time: new Date().toLocaleTimeString(),
      status: "New",
      confidence: 92,
      summary: "Vibration exceeds safe threshold.",
      action: "Inspect bearing immediately.",
      evidence: [
        { label: "Vibration", value: `${data.vibration}` },
        { label: "Current", value: `${data.current}` },
      ],
    });
  }

  if (data.thd > 6) {
    alerts.push({
      id: crypto.randomUUID(),
      title: "THD Spike Detected",
      severity: "warning",
      category: "Electrical",
      time: new Date().toLocaleTimeString(),
      status: "New",
      confidence: 85,
      summary: "Power quality issue detected.",
      action: "Check capacitor bank.",
      evidence: [
        { label: "THD", value: `${data.thd}%` },
        { label: "Voltage", value: `${data.voltage}V` },
      ],
    });
  }

  return alerts;
}

export function useAlertStream(interval = 2000) {
  const buffer = useRef<any>(null);

  const addAlerts = useAlertStore((s: { addAlerts: any; }) => s.addAlerts);
  const getAlerts = useAlertCheck((s) => s.getAlerts);

  useEffect(() => {
    const unsub = subscribeToMachineData((data) => {
      buffer.current = data;
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!buffer.current) return;
      if (!getAlerts) return;

      const newAlerts = createAlerts(buffer.current);

      if (newAlerts.length) {
        addAlerts(newAlerts);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [interval, addAlerts]);
}