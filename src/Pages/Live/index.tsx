"use client";

import { useState, useEffect } from "react";
import { 
  Zap, 
  Activity, 
  ShieldAlert, 
  Gauge, 
  RefreshCw 
} from "lucide-react";

interface LiveData {
  voltage: number;
  current: number;
  powerFactor: number;
  thd: number;
  vibration: number;
}

export default function LiveMonitoring({ deviceId = "motor_node_01" }: { deviceId?: string }) {
  const [raw, setRaw] = useState<LiveData>({
    voltage: 220,
    current: 3,
    powerFactor: 0.75,
    thd: 15,
    vibration: 0
  });
  const [isSyncing, setIsSyncing] = useState(true);

  const activePowerKW = (raw.voltage * raw.current * raw.powerFactor) / 1000;
  const apparentPowerKVA = (raw.voltage * raw.current) / 1000;
  const reactivePowerKVAR = Math.sqrt(Math.pow(apparentPowerKVA, 2) - Math.pow(activePowerKW, 2));
  const thermalStressFactor = Math.pow(raw.current, 2) * 12.5; 
  const currentDistortionAmps = raw.current * (raw.thd / 100);

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-200 font-mono p-6 space-y-6 antialiased">
      
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-white tracking-tight">LIVE MONITORING BUS</h1>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">Device Base Reference: {deviceId}</p>
        </div>
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-[11px]">
          <RefreshCw className={`h-3 w-3 text-sky-400 ${isSyncing ? "animate-spin" : ""}`} />
          <span className="text-neutral-400">Stream Cycle: 2500ms Intercept</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-sky-400" /> Incoming Telemetry Payload
        </h3>
        <div className="grid grid-cols-5 gap-3">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Bus Voltage</span>
            <span className="text-xl font-bold text-white tracking-tight mt-1 block">{raw.voltage}<span className="text-xs text-neutral-500 font-normal ml-0.5">V</span></span>
            <div className="mt-2 text-[9px] text-emerald-400 uppercase font-sans">Stable Delta</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Line Current</span>
            <span className="text-xl font-bold text-white tracking-tight mt-1 block">{raw.current}<span className="text-xs text-neutral-500 font-normal ml-0.5">A</span></span>
            <div className="mt-2 text-[9px] text-neutral-400 uppercase font-sans">Draw Baseline</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Power Factor</span>
            <span className="text-xl font-bold text-amber-400 tracking-tight mt-1 block">{raw.powerFactor}</span>
            <div className="mt-2 text-[9px] border px-1 rounded inline-block font-sans font-medium text-amber-400 border-amber-900 bg-amber-950/30">
              POOR EFFICIENCY
            </div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Total Distortion</span>
            <span className="text-xl font-bold text-red-400 tracking-tight mt-1 block">{raw.thd}<span className="text-xs text-neutral-500 font-normal ml-0.5">% THD</span></span>
            <div className="mt-2 text-[9px] border px-1 rounded inline-block font-sans font-medium text-red-400 border-red-900 bg-red-950/30">
              CRITICAL DISTORTION
            </div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <span className="text-[10px] text-neutral-500 uppercase block">Vibration Peak</span>
            <span className="text-xl font-bold text-neutral-300 tracking-tight mt-1 block">{raw.vibration}<span className="text-xs text-neutral-500 font-normal ml-0.5"> mm/s</span></span>
            <div className="mt-2 text-[9px] border px-1 rounded inline-block font-sans font-medium text-neutral-400 border-neutral-800 bg-neutral-900/40">
              STATIC/RESTING
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 border-b border-neutral-800/60 pb-2">
            <Gauge className="h-3.5 w-3.5 text-purple-400" /> Vector Vector Power Calculations
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Active Real Power (P):</span>
              <span className="font-bold text-neutral-300">{activePowerKW.toFixed(3)} kW</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Apparent Power (S):</span>
              <span className="font-bold text-neutral-300">{apparentPowerKVA.toFixed(3)} kVA</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-neutral-800/40 pt-2">
              <span className="text-neutral-500">Reactive Overhead Loss (Q):</span>
              <span className="font-bold text-amber-400">{reactivePowerKVAR.toFixed(3)} kVAR</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 border-b border-neutral-800/60 pb-2">
            <Activity className="h-3.5 w-3.5 text-amber-500" /> Winding & Load Diagnostics
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Joulean Thermal Dissipation:</span>
              <span className="font-bold text-neutral-300">{thermalStressFactor.toFixed(1)} J_Index</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500">Harmonic Current Leakage:</span>
              <span className="font-bold text-red-400">{currentDistortionAmps.toFixed(2)} A (rms)</span>
            </div>
            <div className="flex items-center justify-between text-xs border-t border-neutral-800/40 pt-2">
              <span className="text-neutral-500">Magnetic Conversion Core:</span>
              <span className="font-bold text-emerald-400">Stable Baseline</span>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 border-b border-neutral-800/60 pb-2">
            <ShieldAlert className="h-3.5 w-3.5 text-red-400" /> Platform Diagnostic Output
          </h4>
          <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-lg h-[84px] flex flex-col justify-between">
            <span className="text-[10px] text-neutral-500 uppercase tracking-tight block">Derived Assessment State</span>
            <p className="text-xs text-red-400 font-sans leading-snug mt-1 font-medium">
              High harmonic distortion levels detected inside grid lines. Indication of capacitor bank degradation or inverter feedback tracking anomalies.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}