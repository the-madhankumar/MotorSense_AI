"use client";

import { useState, useEffect } from "react";
import {
  Zap,
  Activity,
  ShieldAlert,
  Gauge,
  RefreshCw
} from "lucide-react";
import { subscribeToMachineData } from "@/lib/firebaseUtils";
import { useMotorStore } from "@/Context/dashboard_context";
import { evaluateTelemetry } from "@/lib/telemetryEngine";

export default function LiveMonitoring({ deviceId = "motor_node_01" }: { deviceId?: string }) {
  const raw = useMotorStore((state) => state.raw);
  const setRaw = useMotorStore((state) => state.setRaw);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    setIsSyncing(true);
    const unsubscribe = subscribeToMachineData((latestData) => {
      if (latestData) {
        setRaw({
          voltage: latestData.voltage ?? 0,
          current: latestData.current ?? 0,
          powerFactor: latestData.powerFactor ?? latestData.PF ?? 1,
          thd: latestData.thd ?? latestData.THD ?? 0,
          vibration: latestData.vibration ?? latestData.vib ?? 0,
        });
      }
      setIsSyncing(false);
    });

    return () => unsubscribe();
  }, [setRaw]);

  const computed = evaluateTelemetry(raw);

  const {
    styles,
  } = computed;

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-200 font-mono p-6 space-y-6 antialiased">

      {/* Header Container */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-white tracking-tight">LIVE MONITORING BUS</h1>
            <span className={`h-2 w-2 rounded-full bg-emerald-500 ${isSyncing ? "animate-ping" : ""}`} />
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">Device Base Reference: {deviceId}</p>
        </div>
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-[11px]">
          <RefreshCw className={`h-3 w-3 text-sky-400 ${isSyncing ? "animate-spin" : ""}`} />
          <span className="text-neutral-400">Stream Cycle: 2500ms Intercept</span>
        </div>
      </div>

      {/* Main Grid Payload Blocks */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-sky-400" /> Incoming Telemetry Payload
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

          {/* Voltage Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Bus Voltage</span>
            <span className={`text-xl font-bold tracking-tight mt-1 block ${styles.vStatus.text}`}>
              {raw.voltage}
              <span className="text-xs text-neutral-500 font-normal ml-0.5">V</span>
            </span>
            <div className={`mt-2 text-[9px] uppercase font-sans ${styles.vStatus.text}`}>
              {styles.vStatus.label}
            </div>
          </div>

          {/* Current Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Line Current</span>
            <span className={`text-xl font-bold tracking-tight mt-1 block ${styles.cStatus.text}`}>
              {raw.current}
              <span className="text-xs text-neutral-500 font-normal ml-0.5">A</span>
            </span>
            <div className={`mt-2 text-[9px] uppercase font-sans ${styles.cStatus.text}`}>
              {styles.cStatus.label}
            </div>
          </div>

          {/* Power Factor Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Power Factor</span>
            <span className={`text-xl font-bold tracking-tight mt-1 block ${styles.pfStatus.text}`}>
              {raw.powerFactor.toFixed(2)}
            </span>
            <div className={`mt-2 text-[9px] border px-1.5 py-0.5 rounded inline-block font-sans font-medium uppercase ${styles.pfStatus.text} ${styles.pfStatus.border} ${styles.pfStatus.bg}`}>
              {styles.pfStatus.label}
            </div>
          </div>

          {/* THD Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Total Distortion</span>
            <span className={`text-xl font-bold tracking-tight mt-1 block ${styles.thdStatus.text}`}>
              {raw.thd}
              <span className="text-xs text-neutral-500 font-normal ml-0.5">% THD</span>
            </span>
            <div className={`mt-2 text-[9px] border px-1.5 py-0.5 rounded inline-block font-sans font-medium uppercase ${styles.thdStatus.text} ${styles.thdStatus.border} ${styles.thdStatus.bg}`}>
              {styles.thdStatus.label}
            </div>
          </div>

          {/* Vibration Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Vibration Peak</span>
            <span className={`text-xl font-bold tracking-tight mt-1 block ${styles.vibStatus.text}`}>
              {raw.vibration}
              <span className="text-xs text-neutral-500 font-normal ml-0.5"> mm/s</span>
            </span>
            <div className={`mt-2 text-[9px] border px-1.5 py-0.5 rounded inline-block font-sans font-medium uppercase ${styles.vibStatus.text} ${styles.vibStatus.border} ${styles.vibStatus.bg}`}>
              {styles.vibStatus.label}
            </div>
          </div>

        </div>
      </div>

      {/* Calculations & Logs Footer Blocks */}
      <div className="flex flex-col gap-4">

        {/* Vector Metrics Panel */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 border-b border-neutral-800/60 pb-2">
            <Gauge className="h-3.5 w-3.5 text-purple-400" /> Vector Power Calculations
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Active Real Power (P):</span>
              <span className="font-bold text-neutral-300">{computed.activePowerKW.toFixed(3)} kW</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Apparent Power (S):</span>
              <span className="font-bold text-neutral-300">{computed.apparentPowerKVA.toFixed(3)} kVA</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-neutral-800/40 pt-2">
              <span className="text-neutral-500">Reactive Overhead Loss (Q):</span>
              <span className={`font-bold ${raw.powerFactor < 0.85 ? "text-amber-400" : "text-neutral-400"}`}>
                {computed.reactivePowerKVAR.toFixed(3)} kVAR
              </span>
            </div>
          </div>
        </div>

        {/* Diagnostics Metrics Panel */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 border-b border-neutral-800/60 pb-2">
            <Activity className="h-3.5 w-3.5 text-amber-500" /> Winding & Load Diagnostics
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Joulean Thermal Dissipation:</span>
              <span className="font-bold text-neutral-300">{computed.thermalStressFactor.toFixed(1)} J_Index</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Harmonic Current Leakage:</span>
              <span className={`font-bold ${raw.thd > 5 ? "text-red-400" : "text-neutral-300"}`}>
                {computed.currentDistortionAmps.toFixed(2)} A (rms)
              </span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-neutral-800/40 pt-2">
              <span className="text-neutral-500">Magnetic Conversion Core:</span>
              <span className={`font-bold ${raw.vibration > 4 ? "text-red-400" : "text-emerald-400"}`}>
                {raw.vibration > 4 ? "Mechanical Stress Warning" : "Stable Baseline"}
              </span>
            </div>
          </div>
        </div>

        {/* Automated Narrative Fault Logger */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 border-b border-neutral-800/60 pb-2">
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" /> Platform Diagnostic Output
          </h4>
          <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg h-24 flex flex-col justify-between">
            <span className="text-[10px] text-neutral-500 uppercase tracking-tight block">Derived Assessment State</span>
            <p className={`text-xs font-sans leading-snug mt-1 font-medium ${computed.systemStatusColor}`}>
              {computed.systemAssessment}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}