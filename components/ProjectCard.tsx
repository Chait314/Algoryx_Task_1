"use client";

import { useTheme } from "@/context/ThemeContext";

export type Project = {
  name: string;
  progress: number; // Value between 0 and 100
  domain: string;
};

const ProjectCard = ({ name, progress, domain }: Project) => {
  const { theme } = useTheme();

  // Clamp progress between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
        className={`p-5 rounded-xl border hover:cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-sm flex flex-col justify-between space-y-4 ${
            theme === "dark"
            ? "bg-[#161B22] text-white border-gray-800 hover:border-purple-500/50"
            : "bg-white text-black border-gray-200 hover:border-purple-400"
        }`}
        >
        {/* Top Header & Domain Badge */}
        <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-bold tracking-tight truncate">{name}</h4>
            <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                theme === "dark"
                ? "bg-purple-950/40 text-purple-300 border-purple-800/50"
                : "bg-purple-50 text-purple-700 border-purple-200"
            }`}
            >
            {domain}
            </span>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
            <span
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
            >
                Completion
            </span>
            <span className="font-bold text-purple-500">
                {normalizedProgress}%
            </span>
            </div>

            {/* Progress Bar Track */}
            <div
            className={`w-full h-2 rounded-full overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-200"
            }`}
            >
            {/* Animated Fill Bar */}
            <div
                className="h-full bg-gradient-to-r from-purple-600 to-violet-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${normalizedProgress}%` }}
            />
            </div>
        </div>
        </div>
  );
};

export default ProjectCard;