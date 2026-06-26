"use client"

import MainItem from "@/components/main_name";
import NavMenuItem from "@/components/navmenuitems";
import { MENU } from "@/Context/sidebar_context";

import {
    LayoutDashboard, Activity, Brain, ChartColumn, Wrench, FileText, Bell, Settings, LucideIcon
} from "lucide-react";

type SideBarItem = {
    name: string,
    icon: LucideIcon
}

const SideBarList: SideBarItem[] = [
    {
        name: MENU.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        name: MENU.LIVE_MONITORING,
        icon: Activity,
    },
    {
        name: MENU.AI_PREDICTION,
        icon: Brain,
    },
    {
        name: MENU.REPORTS,
        icon: FileText,
    },
    {
        name: MENU.ALERT,
        icon: Bell,
    },
    {
        name: MENU.SETTINGS,
        icon: Settings,
    },
];

const SideBar = () => {
    return (
        <div className="w-74 h-screen bg-gray-900 flex flex-col p-6 gap-4 font-mono">
            <MainItem />
            <hr className="my-4 border-gray-200" />
            {SideBarList.map((element, index) => (
                <NavMenuItem
                    key={index}
                    name={element.name}
                    icon={element.icon}
                />
            ))}
        </div>
    );
}

export default SideBar;