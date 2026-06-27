"use client";

import useCurrentMenu, { MENU } from "@/Context/sidebar_context";
import AIApp from "@/pages/AI";
import Alerts from "@/pages/Alert";
import Dashboard from "@/pages/Dashboard";
import LiveMonitoring from "@/pages/Live";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";

function getCurrentView(currentMenu: string) {
  switch (currentMenu) {
    case MENU.DASHBOARD:
      return <Dashboard />;
    case MENU.REPORTS:
      return <Reports />;
    case MENU.SETTINGS:
      return <Settings />
    case MENU.ALERT:
      return <Alerts/>
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