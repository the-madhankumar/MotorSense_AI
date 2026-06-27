"use client";

import useCurrentMenu, { MENU } from "@/Context/sidebar_context";
import AIApp from "@/Screens/AI";
import Alerts from "@/Screens/Alert";
import Dashboard from "@/Screens/Dashboard";
import LiveMonitoring from "@/Screens/Live";
import Reports from "@/Screens/Reports";
import Settings from "@/Screens/Settings";

function getCurrentView(currentMenu: string) {
  switch (currentMenu) {
    case MENU.DASHBOARD:
      return <Dashboard />;
    case MENU.REPORTS:
      return <Reports />;
    case MENU.SETTINGS:
      return <Settings />
    case MENU.ALERT:
      return <Alerts />
    case MENU.LIVE_MONITORING:
      return <LiveMonitoring />
    case MENU.AI_PREDICTION:
      return <AIApp />
    default:
      return <div>Select a menu item</div>;
  }
}

export default function Home() {
  const currentMenu = useCurrentMenu((state) => state.currentMenu);

  return (
    <div className="main-container h-screen text-black">
      {getCurrentView(currentMenu)}
    </div>
  );
}