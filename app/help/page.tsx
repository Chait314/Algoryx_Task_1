"use client";

import Layout from "@/components/Layout";
import { useTheme } from "@/context/ThemeContext";
import { BookOpen, ChevronDown, ExternalLink, HelpCircle, MessageSquare, Search } from "lucide-react";
import { useState } from "react";

type FAQItem = {
    id: string;
    category: string;
    question: string;
    answer: string;
    author: string;
    likes: number;
};

const faqData: FAQItem[] = [
    {
    id: "1",
    category: "Deployment",
    question: "How do I configure AGX Dynamics standalone builds in containerized environments?",
    answer: "You can pass `NEXT_TELEMETRY_DISABLED=1` and set `output: 'standalone'` in your `next.config.ts`. Ensure your Dockerfile multi-stage runner stage copies the `.next/standalone` folder and explicitly sets non-root user permissions.",
    author: "Alex R. (Algoryx Lead)",
    likes: 24,
    },
    {
    id: "2",
    category: "API & SDK",
    question: "Why are my WebSocket telemetry feeds dropping during high-frequency simulation runs?",
    answer: "This usually happens when the browser main thread gets blocked by heavy Recharts re-renders. We recommend throttling state updates to 30fps or offloading simulation math to a dedicated Web Worker.",
    author: "DevCommunity_99",
    likes: 18,
    },
    {
    id: "3",
    category: "Authentication",
    question: "Can I manage multi-tenant API keys directly from the Algoryx Admin Dashboard?",
    answer: "Yes! Navigate to Settings > API Keys. From there, you can issue scoped tokens for Breakpoint CLI tools, set rate limits, and assign tenant-level access permissions.",
    author: "Sarah_SaaS",
    likes: 31,
    },
    {
    id: "4",
    category: "UI & Themes",
    question: "How do I sync dark mode preferences across micro-frontends?",
    answer: "Wrap your root layout with our custom `ThemeContext`. It syncs theme states across local storage and applies the `.dark` class directly to the HTML document node.",
    author: "FrontendNinja",
    likes: 12,
    },
];

const HelpPage = () => {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [openId, setOpenId] = useState<string | null>("1");

    const filteredFaqs = faqData.filter(
        (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
        <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-500 font-semibold text-xs tracking-wider uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>Algoryx Knowledge Base</span>
            </div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            How can we <span className="bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-transparent">help you today?</span>
            </h1>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Search community discussions, deployment guides, and developer FAQs.
            </p>

            {/* Search Input */}
            <div className="relative mt-4 max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search questions, deployment topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                theme === "dark"
                    ? "bg-[#161B22] border-gray-800 text-white placeholder-gray-500 focus:border-purple-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-600"
                }`}
            />
            </div>
        </div>

        {/* Quick Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
            { title: "Developer Docs", desc: "SDK reference and API endpoints", icon: BookOpen },
            { title: "Community Forum", desc: "Ask questions and share feedback", icon: MessageSquare },
            { title: "System Status", desc: "Real-time service operational status", icon: ExternalLink },
            ].map((item, idx) => (
            <div
                key={idx}
                className={`p-4 rounded-xl border transition-all hover:scale-[1.01] cursor-pointer ${
                theme === "dark"
                    ? "bg-[#161B22] border-gray-800 hover:border-purple-500/50"
                    : "bg-white border-gray-200 hover:border-purple-400"
                }`}
            >
                <item.icon className="w-5 h-5 text-purple-500 mb-2" />
                <h3 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{item.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
            ))}
        </div>

        {/* Community FAQ Accordion List */}
        <div className="space-y-4">
            <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Popular Community Questions
            </h2>

            <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                    <div
                    key={faq.id}
                    className={`rounded-xl border transition-colors overflow-hidden ${
                        theme === "dark" ? "bg-[#161B22] border-gray-800" : "bg-white border-gray-200"
                    }`}
                    >
                    <button
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        className="w-full p-4 flex items-center justify-between text-left gap-4"
                    >
                        <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${
                            theme === "dark" ? "bg-purple-950 text-purple-300 border border-purple-800/50" : "bg-purple-50 text-purple-700"
                        }`}>
                            {faq.category}
                        </span>
                        <span className={`text-sm font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
                            {faq.question}
                        </span>
                        </div>
                        <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        />
                    </button>

                    {isOpen && (
                        <div className={`px-4 pb-4 pt-1 text-xs leading-relaxed space-y-3 border-t ${
                        theme === "dark" ? "border-gray-800/60 text-gray-300" : "border-gray-100 text-gray-600"
                        }`}>
                        <p>{faq.answer}</p>
                        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2">
                            <span>Answered by <strong className="text-purple-400">{faq.author}</strong></span>
                            <span>{faq.likes} developers found this helpful</span>
                        </div>
                        </div>
                    )}
                    </div>
                );
                })
            ) : (
                <p className="text-sm text-gray-500 py-4">No community questions found matching your search term.</p>
            )}
            </div>
        </div>
        </div>
        </Layout>
    );
};

export default HelpPage;