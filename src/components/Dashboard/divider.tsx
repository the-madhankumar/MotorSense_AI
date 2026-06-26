import { DashboardDividerProps } from "@/Types/dashboard";

const DashboardDivider = ({ title }: DashboardDividerProps) => {
  return (
    <div className="flex items-center gap-4 py-3 selection:bg-sky-500/10 selection:text-sky-600">
      <h2 className="shrink-0 font-sans text-xl font-medium tracking-wider text-neutral-800 antialiased dark:text-neutral-200">
        {title}
      </h2>

      <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800">
        <div className="h-full w-24 bg-linear-to-r from-sky-500 via-indigo-500 to-transparent dark:from-sky-400 dark:via-indigo-400" />
      </div>

      <div className="flex gap-1 opacity-40 dark:opacity-20">
        <div className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        <div className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
        <div className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
      </div>
    </div>
  );
};

export default DashboardDivider;