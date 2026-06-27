import { kpiType, MetricProps, MotorStore, SysteStatusType } from "@/Types/dashboard";
import { create } from "zustand";

type SensorData = {
  voltage: number;
  current: number;
  thd: number;
  powerFactor: number;
  vibration: number;
};

type KPIState = {
  sensor: SensorData;

  setSensor: (data: Partial<SensorData>) => void;

  kpis: () => any[];
};

export const useKPIStore = create<KPIState>((set, get) => ({
  sensor: {
    voltage: 0,
    current: 0,
    thd: 0,
    powerFactor: 1,
    vibration: 0
  },

  setSensor: (data) =>
    set((state) => ({
      sensor: { ...state.sensor, ...data }
    })),

  kpis: () => {
    const { voltage, current, thd, powerFactor, vibration } =
      get().sensor;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const healthScore = clamp(
      100 -
      thd * 0.5 -
      (vibration / 7.1) * 25 -
      (1 - powerFactor) * 40,
      0,
      100
    );

    const efficiency = clamp(
      powerFactor * 100 - thd * 0.7 - vibration * 2,
      0,
      100
    );

    const motorStatus =
      healthScore > 85 && vibration < 3
        ? "Running"
        : healthScore > 60
          ? "Degraded"
          : "Fault";

    const fault =
      thd > 10
        ? "High Harmonics"
        : vibration > 7.1
          ? "Excess Vibration"
          : powerFactor < 0.7
            ? "Low Power Factor"
            : "None";

    const remainingLife = clamp(
      1000 /
      (1 + (thd * 0.4 + vibration * 3 + (1 - powerFactor) * 50) / 100),
      0,
      5000
    );

    return [
      {
        name: "Health Score",
        value: Math.round(healthScore),
        unit: "%",
        statusVariant:
          healthScore > 80 ? "success" : healthScore > 50 ? "warning" : "error"
      },
      {
        name: "Motor Status",
        value: motorStatus,
        statusVariant:
          motorStatus === "Running"
            ? "success"
            : motorStatus === "Degraded"
              ? "warning"
              : "error"
      },
      {
        name: "Current Fault",
        value: fault,
        statusVariant: fault === "None" ? "info" : "error"
      },
      {
        name: "Remaining Life",
        value: Math.round(remainingLife),
        unit: "Hours",
        statusVariant: "warning"
      },
      {
        name: "Efficiency",
        value: Math.round(efficiency),
        unit: "%",
        statusVariant: "success"
      }
    ];
  }
}));

export const useMotorStore = create<MotorStore>((set) => ({
  raw: {
    voltage: 0,
    current: 0,
    powerFactor: 0,
    thd: 0,
    vibration: 0,
  },

  setRaw: (data) => set({ raw: data }),
}));

const SYSTEM_STATUS: SysteStatusType[] = [
  { name: "ESP32", connect: true },
  { name: "Firebase", connect: true },
  { name: "AI Model", connect: true },
  {
    name: "Last Sync",
    connect: true,
    time: 2000,
  },
];

const mockElectricalData = [
  { time: "0s", voltage: 12.0, current: 2.5 },
  { time: "2s", voltage: 12.4, current: 2.6 },
  { time: "4s", voltage: 13.1, current: 2.9 },
  { time: "6s", voltage: 14.0, current: 3.2 },
  { time: "8s", voltage: 14.5, current: 3.5 },
  { time: "10s", voltage: 15.2, current: 3.8 },
  { time: "12s", voltage: 15.0, current: 3.7 },
  { time: "14s", voltage: 13.8, current: 3.1 },
  { time: "16s", voltage: 12.2, current: 2.4 },
  { time: "18s", voltage: 11.5, current: 2.0 },
  { time: "20s", voltage: 11.0, current: 1.8 },
  { time: "22s", voltage: 11.8, current: 2.1 },
  { time: "24s", voltage: 12.6, current: 2.5 },
  { time: "26s", voltage: 13.5, current: 2.8 },
  { time: "28s", voltage: 14.2, current: 3.3 },
  { time: "30s", voltage: 15.1, current: 3.9 },
  { time: "32s", voltage: 15.8, current: 4.2 },
  { time: "34s", voltage: 16.0, current: 4.5 },
  { time: "36s", voltage: 14.7, current: 3.6 },
  { time: "38s", voltage: 13.0, current: 2.8 },
]

export { SYSTEM_STATUS, mockElectricalData }