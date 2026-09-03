"use client";

import Layout from "@/components/Layout";
import { useTheme } from "@/context/ThemeContext";
import { Bell, Building2, Moon, Save, ShieldCheck, Sun } from "lucide-react";
import React, { useState } from "react";

const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();

    const [workspaceName, setWorkspaceName] = useState("Algoryx Core");
    const [domain, setDomain] = useState("algoryx.in");
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [weeklyDigest, setWeeklyDigest] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <Layout>
        <div className="max-w-3xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
            <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Settings
            </h1>
            <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Manage your Algoryx workspace, app theme, and email notification preferences.
            </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
            {/* Workspace Details Section */}
            <div className={`p-5 rounded-xl border space-y-4 ${
            theme === "dark" ? "bg-[#161B22] border-gray-800" : "bg-white border-gray-200"
            }`}>
            <div className="flex items-center gap-2 border-b pb-3 border-gray-200 dark:border-gray-800">
                <Building2 className="w-4 h-4 text-purple-500" />
                <h2 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Workspace Details
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Workspace Name</label>
                <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors ${
                    theme === "dark"
                        ? "bg-[#0D1117] border-gray-700 text-white focus:border-purple-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-600"
                    }`}
                />
                </div>

                <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Organization Domain</label>
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors ${
                    theme === "dark"
                        ? "bg-[#0D1117] border-gray-700 text-white focus:border-purple-500"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-600"
                    }`}
                />
                </div>
            </div>
            </div>

            {/* Theme Settings Section */}
            <div className={`p-5 rounded-xl border space-y-4 ${
            theme === "dark" ? "bg-[#161B22] border-gray-800" : "bg-white border-gray-200"
            }`}>
            <div className="flex items-center justify-between border-b pb-3 border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <h2 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Appearance & Theme
                </h2>
                </div>
                <span className="text-xs font-semibold text-purple-500 capitalize">{theme} Mode</span>
            </div>

            <div className="flex items-center justify-between pt-1">
                <div>
                <p className={`text-xs font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                    Interface Theme
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Toggle between light and dark workspace views.</p>
                </div>

                <button
                type="button"
                onClick={toggleTheme}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                    theme === "dark"
                    ? "bg-purple-900/30 text-purple-300 border-purple-800 hover:bg-purple-900/50"
                    : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                }`}
                >
                Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                </button>
            </div>
            </div>

            {/* Notification Preferences Section */}
            <div className={`p-5 rounded-xl border space-y-4 ${
            theme === "dark" ? "bg-[#161B22] border-gray-800" : "bg-white border-gray-200"
            }`}>
            <div className="flex items-center gap-2 border-b pb-3 border-gray-200 dark:border-gray-800">
                <Bell className="w-4 h-4 text-purple-500" />
                <h2 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Preferences
                </h2>
            </div>

            <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                <div>
                    <p className={`text-xs font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                    System Alerts
                    </p>
                    <p className="text-xs text-gray-400">Receive real-time notifications for deployment errors.</p>
                </div>
                <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                <div>
                    <p className={`text-xs font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                    Weekly Analytics Digest
                    </p>
                    <p className="text-xs text-gray-400">Get a summary report of customer transactions via email.</p>
                </div>
                <input
                    type="checkbox"
                    checked={weeklyDigest}
                    onChange={(e) => setWeeklyDigest(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
                </label>
            </div>
            </div>

            {/* Save Actions */}
            <div className="flex items-center justify-between pt-2">
            {saved ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Preferences saved successfully
                </span>
            ) : (
                <span className="text-xs text-gray-400">All changes apply instantly to your account session.</span>
            )}

            <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer shadow-sm"
            >
                <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
            </div>
        </form>
        </div>
        </Layout>
    );
};

export default SettingsPage;