"use client";

import useCurrentMenu, { MENU } from "@/Context/sidebar_context";
import Dashboard from "@/Pages/Dashboard";
import Reports from "@/Pages/Reports";

function getCurrentView(currentMenu: string) {
  switch (currentMenu) {
    case MENU.DASHBOARD:
      return <Dashboard />;
    case MENU.REPORTS:
      return <Reports />;
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