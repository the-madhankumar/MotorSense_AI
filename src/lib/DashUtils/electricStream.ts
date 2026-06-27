import { useEffect, useRef, useState } from "react";
import { subscribeToMachineData } from "@/lib/firebaseUtils";
import type { DataPoint } from "@/Types/dashboard";

export function useElectricalStream(updateInterval = 2000, maxPoints = 50) {
  const bufferRef = useRef<any>(null);

  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToMachineData((latest) => {
      bufferRef.current = latest;
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const raw = bufferRef.current;

      if (!raw) return;

      const point: DataPoint = {
        time: new Date().toLocaleTimeString(),
        voltage: raw.voltage ?? 0,
        current: raw.current ?? 0,
      };

      setData((prev) => {
        const updated = [...prev, point];
        return updated.slice(-maxPoints);
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, maxPoints]);

  return data;
}