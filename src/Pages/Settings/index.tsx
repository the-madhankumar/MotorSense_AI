"use client";

import { useState } from "react";

export default function Settings() {
  const [liveMonitoring, setLiveMonitoring] = useState(true);
  const [aiPrediction, setAiPrediction] = useState(true);
  const [alerts, setAlerts] = useState(true);

  const [sensitivity, setSensitivity] = useState("medium");
  const [ragModel, setRagModel] = useState("gpt-4o-mini");
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white font-mono flex flex-col">

      {/* HEADER */}
      <div className="px-8 py-6 border-b border-neutral-800 bg-neutral-900/40 backdrop-blur">
        <h1 className="text-sm font-bold tracking-widest uppercase text-neutral-300">
          Motor AI Control Panel
        </h1>
        <p className="text-[11px] text-neutral-500 mt-1">
          Configure AI model, RAG system, alerts, and motor behavior
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="space-y-6">

          <h2 className="text-xs text-neutral-400 uppercase tracking-wider">
            System Controls
          </h2>

          {/* Toggle Group */}
          <div className="space-y-4">

            {/* Live Monitoring */}
            <div className="flex items-center justify-between bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <span className="text-xs text-neutral-300">Live Monitoring</span>
              <button
                onClick={() => setLiveMonitoring(!liveMonitoring)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                  liveMonitoring ? "bg-sky-500" : "bg-neutral-700"
                }`}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full transform transition ${
                    liveMonitoring ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* AI Prediction */}
            <div className="flex items-center justify-between bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <span className="text-xs text-neutral-300">AI Prediction</span>
              <button
                onClick={() => setAiPrediction(!aiPrediction)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                  aiPrediction ? "bg-sky-500" : "bg-neutral-700"
                }`}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full transform transition ${
                    aiPrediction ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Alerts */}
            <div className="flex items-center justify-between bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <span className="text-xs text-neutral-300">Alerts</span>
              <button
                onClick={() => setAlerts(!alerts)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                  alerts ? "bg-sky-500" : "bg-neutral-700"
                }`}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full transform transition ${
                    alerts ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Sensitivity */}
          <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-3">
            <p className="text-xs text-neutral-400">Sensitivity Level</p>

            <div className="flex gap-2">
              {["low", "medium", "high"].map((level) => (
                <button
                  key={level}
                  onClick={() => setSensitivity(level)}
                  className={`px-3 py-1 text-[10px] rounded-md transition ${
                    sensitivity === level
                      ? "bg-sky-500 text-white"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {level.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          <h2 className="text-xs text-neutral-400 uppercase tracking-wider">
            AI & RAG Configuration
          </h2>

          {/* RAG Model */}
          <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-2">
            <p className="text-xs text-neutral-300">RAG Model</p>

            <select
              value={ragModel}
              onChange={(e) => setRagModel(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 p-2 rounded-md"
            >
              <option value="gpt-4o-mini">GPT-4o Mini (Fast)</option>
              <option value="gpt-4o">GPT-4o (Balanced)</option>
              <option value="llama-3">LLaMA 3 (Local)</option>
            </select>
          </div>

          {/* API Key */}
          <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-2">
            <p className="text-xs text-neutral-300">API Key</p>

            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-********************************"
              className="w-full bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 p-2 rounded-md"
            />
          </div>

          {/* System Status */}
          <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-2 text-[11px]">
            <p className="text-neutral-400">System Status</p>
            <p className="text-green-400">ESP32: Connected</p>
            <p className="text-green-400">Firebase: Active</p>
            <p className="text-green-400">ML Model: Running</p>
            <p className="text-green-400">RAG Engine: Ready</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-8 py-4 border-t border-neutral-800 flex justify-between text-[11px] text-neutral-500">
        <span>All changes apply in real-time</span>

        <button className="text-rose-400 hover:text-rose-300 transition">
          Reset System
        </button>
      </div>
    </div>
  );
}