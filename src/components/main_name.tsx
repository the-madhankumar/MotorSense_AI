"use client";

const MainName1 = "MOTOR";
const MainName2 = "SENSE";
const MainName3 = "AI";

const MainItem = () => {
  return (
    <div className="group flex items-center gap-2 cursor-pointer select-none transition-transform duration-300 hover:scale-105">
      <span className="text-2xl font-black tracking-wide text-slate-800 dark:text-white">
        {MainName1}
      </span>

      <span className="bg-linear-to-r from-emerald-500 via-cyan-500 to-blue-600 bg-clip-text text-2xl font-black tracking-wide text-transparent">
        {MainName2}
      </span>

      <span className="rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-2.5 py-1 text-xs font-bold tracking-[0.2em] text-white shadow-md transition-all duration-300 group-hover:shadow-violet-400/50">
        {MainName3}
      </span>
    </div>
  );
};

export default MainItem;