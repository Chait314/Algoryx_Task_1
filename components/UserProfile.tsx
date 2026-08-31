'use client'

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

type User = {
    name: string;
    hierarchy: string;
    initials: string;
    role: string;
}

export default function UserProfile() {
    const [user, setUser] = useState<User>({
        name:"John Doe", hierarchy: "Administrator", initials: "JD", role: "Software Engineer"
    });
    const { theme, toggleTheme } = useTheme();
  return (
    <div className={`border p-6 rounded-xl shadow-xs flex items-center gap-4 ${theme==='dark' ? 'bg-gray-900 border-gray-700': 'bg-gray-50 border-gray-200'}`}>
      <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
        {user.initials}
      </div>
      <div>
        <h4 className={`text-base font-extrabold ${theme==='dark' ? 'text-gray-50': 'text-black'}`}>{user.name}</h4>
        <p className={`text-xs ${theme==='dark'?'text-gray-200':'text-gray-900'}`}>{user.role}</p>
        <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          Admin Profile
        </span>
      </div>
    </div>
  );
}