import { create } from "zustand";

export const MENU = {
  DASHBOARD: "Dashboard",
  LIVE_MONITORING: "Live Monitoring",
  AI_PREDICTION: "AI Prediction",
  ANALYTICS: "Analytics",
  MAINTENANCE: "Maintenance",
  REPORTS: "Reports",
  ALERT: "Alert",
  SETTINGS: "Settings",
} as const;

interface MenuStore {
  currentMenu: string;
  updateMenu: (menu: string) => void;
}

const useCurrentMenu = create<MenuStore>((set) => ({
  currentMenu: MENU.DASHBOARD,
  updateMenu: (menu) =>
    set({
      currentMenu: menu,
    }),
}));

export default useCurrentMenu;