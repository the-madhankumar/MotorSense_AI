"use client";

import { useAlertCheck } from "@/Context/alert_context";
import { useAICheck } from "@/Context/rag_context";
import { useAIStore, useSettingsStore } from "@/Context/ai_context";
import { Trash2 } from 'lucide-react';

export default function Settings() {
  const getAlerts = useAlertCheck((s) => s.getAlerts);
  const toggleAlert = useAlertCheck((s) => s.toggle);

  const getAI = useAICheck((s) => s.getAI);
  const toggleAI = useAICheck((s) => s.toggle);

  const getAIModel = useAIStore((s) => s.getAIModel);
  const change = useAIStore((s) => s.change);

  const API_KEY = useSettingsStore((s) => s.apiKey);
  const setApiKey = useSettingsStore((s) => s.setApiKey);
  const clearApiKey = useSettingsStore((s) => s.clearApiKey);

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

            {/* AI Prediction */}
            <div className="flex items-center justify-between bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <span className="text-xs text-neutral-300">AI Prediction</span>
              <button
                onClick={toggleAI}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${getAI ? "bg-sky-500" : "bg-neutral-700"
                  }`}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full transform transition ${getAI ? "translate-x-5" : "translate-x-1"
                    }`}
                />
              </button>
            </div>

            {/* Alerts */}
            <div className="flex items-center justify-between bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <span className="text-xs text-neutral-300">Alerts</span>
              <button
                onClick={toggleAlert}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${getAlerts ? "bg-sky-500" : "bg-neutral-700"
                  }`}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full transform transition ${getAlerts ? "translate-x-5" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          <h2 className="text-xs text-neutral-400 uppercase tracking-wider">
            AI & RAG Configuration
          </h2>

          {/* RAG Model */}
          <div className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5 shadow-lg">
            <label
              htmlFor="rag-model"
              className="mb-3 block text-sm font-semibold text-white"
            >
              🤖 RAG AI Model
            </label>

            <p className="mb-4 text-xs text-neutral-400">
              Select a completely free OpenRouter model.
            </p>

            <select
              id="rag-model"
              value={getAIModel}
              onChange={(e) => change(e.target.value)}
              className="
      w-full
      rounded-xl
      border border-neutral-600
      bg-neutral-800
      px-4
      py-3
      text-sm
      font-medium
      text-white
      outline-none
      transition-all
      duration-200
      hover:border-blue-500
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30
    "
            >
              <optgroup label="🆓 FREE MODELS">
                <option value="openrouter/free">
                  ⚡ Auto Free (Recommended)
                </option>

                <option value="google/gemma-4-27b-it:free">
                  💎 Gemma 4 27B
                </option>

                <option value="meta-llama/llama-3.2-3b-instruct:free">
                  🦙 Llama 3.2 3B
                </option>

                <option value="qwen/qwen3-coder:free">
                  💻 Qwen 3 Coder
                </option>

                <option value="nvidia/nemotron-3-ultra:free">
                  🚀 Nemotron Ultra
                </option>
              </optgroup>
            </select>

            <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
              ✅ All models above are available on OpenRouter's free tier.
            </div>
          </div>
          {/* API Key */}
          <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-3">
            <p className="text-xs font-medium text-neutral-300">API Key</p>

            <input
              type="password"
              value={API_KEY}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-********************************"
              className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:border-red-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={clearApiKey}
              disabled={!API_KEY}
              className="
    flex w-full items-center justify-center gap-2
    rounded-md border border-red-600
    bg-red-600/10 px-3 py-2
    text-xs font-medium text-red-400
    transition-all duration-200
    hover:bg-red-600/20 hover:border-red-500
    disabled:cursor-not-allowed disabled:opacity-50
  "
            >
              <Trash2 className="h-4 w-4" />
              <span>Reset API Key</span>
            </button>
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