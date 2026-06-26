import { kpiType, MetricProps, MotorStore, SysteStatusType } from "@/Types/dashboard";
import { create } from "zustand";

const KPI: kpiType[] = [
  {
    name: "Health Score",
    value: 96,
    unit: "%",
    trend: { direction: "down", label: "+2%" },
    statusVariant: "success"
  },
  {
    name: "Motor Status",
    value: "Running",
    statusVariant: "success"
  },
  {
    name: "Current Fault",
    value: "None",
    statusVariant: "info"
  },
  {
    name: "AI Confidence",
    value: 98.3,
    unit: "%",
    statusVariant: "success"
  },
  {
    name: "Remaining Life",
    value: 278,
    unit: "Hours",
    statusVariant: "warning"
  },
  {
    name: "Efficiency",
    value: 91,
    unit: "%",
    statusVariant: "success"
  }
];

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

export { KPI,SYSTEM_STATUS, mockElectricalData }