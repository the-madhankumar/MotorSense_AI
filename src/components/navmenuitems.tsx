"use client"

import useCurrentMenu from "@/Context/sidebar_context";
import { LucideIcon } from "lucide-react";

type NavMenuItemProps = {
    name: string,
    icon: LucideIcon
};

const NavMenuItem = ({ name, icon: Icon }: NavMenuItemProps) => {
    const currentMenu = useCurrentMenu((state) => state.currentMenu);
    const updateMenu = useCurrentMenu((state) => state.updateMenu);
    return (
        <div onClick={() => updateMenu(name)}
            className={`navmenuitem-container ${currentMenu === name ? "text-white" : "text-gray-500"} p-2 flex flex-row gap-2 cursor-pointer`}>
            <Icon size={20} />
            <span>{name}</span>
        </div>
    );
}

export default NavMenuItem;