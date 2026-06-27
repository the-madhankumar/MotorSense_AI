import { Alert, Status } from "@/Types/alerts";
import { create } from "zustand";

type AlertCheckStore = {
  getAlerts: boolean;
  toggle: () => void;
};

export const useAlertCheck = create<AlertCheckStore>((set) => ({
  getAlerts: true,
  toggle: () =>
    set((state) => ({
      getAlerts: !state.getAlerts,
    })),
}));

type AlertStore = {
  alerts: Alert[];
  selected: Alert | null;

  setAlerts: (alerts: Alert[]) => void;
  addAlerts: (alerts: Alert[]) => void;

  select: (alert: Alert) => void;

  updateStatus: (id: string, status: Status) => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  selected: null,

  setAlerts: (alerts) => set({ alerts }),

  addAlerts: (newAlerts) =>
    set((state) => ({
      alerts: [...newAlerts, ...state.alerts].slice(0, 30),
    })),

  select: (alert) => set({ selected: alert }),

  updateStatus: (id, status) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
      selected:
        state.selected?.id === id
          ? { ...state.selected, status }
          : state.selected,
    })),
}));