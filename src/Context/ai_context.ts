import { create } from "zustand";

type AICheckStore = {
  getAIModel: string;
  change: (value: string) => void;
};

export const useAIStore = create<AICheckStore>((set) => ({
  getAIModel: "openrouter/free",

  change: (value) =>
    set({
      getAIModel: value,
    }),
}));

type SettingsStore = {
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  apiKey: "",

  setApiKey: (key) =>
    set({
      apiKey: key.trim(),
    }),

  clearApiKey: () =>
    set({
      apiKey: "",
    }),
}));