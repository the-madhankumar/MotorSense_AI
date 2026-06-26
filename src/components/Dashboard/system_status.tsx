"use client"

import { SysteStatusType } from "@/Types/dashboard";

const SystemStatus = ({ status }: { status: SysteStatusType }) => {
    const secondsAgo =
        status.time !== undefined
            ? 2
            : null;

    return (
        <div
            className={`group flex items-center gap-3 rounded-full border px-4 py-2 transition-all duration-300 hover:scale-105 ${status.connect
                    ? "border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300"
                    : "border-rose-300 bg-rose-500/10 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-300"
                }`}
        >
            <span
                className={`relative flex h-3 w-3 ${status.connect ? "text-emerald-500" : "text-rose-500"
                    }`}
            >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-current" />
            </span>

            <span className="text-sm font-semibold">{status.name}</span>

            {status.time !== undefined ? (
                <span className="text-xs font-medium opacity-80">
                    {secondsAgo} sec ago
                </span>
            ) : (
                <span className="text-xs font-medium opacity-80">
                    {status.connect ? "Online" : "Offline"}
                </span>
            )}
        </div>
    );
};

export default SystemStatus;