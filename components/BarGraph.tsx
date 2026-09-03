"use client"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useTheme } from "@/context/ThemeContext";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
    { year: "2024", revenue:42},
    { year: "2025", revenue:74.80},
    { year: "2026", revenue:75}
];

const chartConfig = {
    revenue: {
        label: "Revenue ($)",
        color: "#9f58e2"
    }
} satisfies ChartConfig;
const BarGraph = () => {
    const {theme, toggleTheme} = useTheme();
    
    return (
    <div className="w-full max-w-xl h-[320px] p-4 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="mb-4 flex items-center justify-between">
            <h3 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
            Revenue Growth (YoY)
            </h3>
            <span className="text-xs text-purple-500 font-semibold">+0.2% overall</span>
        </div>

        <ChartContainer
            config={chartConfig}
            className="w-full h-[240px]"
            >
            <BarChart
                accessibilityLayer
                data={chartData}
            >
                <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
                />

                <XAxis
                dataKey="year"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{
                    fill: theme === "dark" ? "#9CA3AF" : "#4B5563",
                    fontSize: 12,
                }}
                />

                <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                tick={{
                    fill: theme === "dark" ? "#9CA3AF" : "#4B5563",
                    fontSize: 12,
                }}
                />

                <ChartTooltip
                cursor={false}
                content={
                    <ChartTooltipContent
                    className={
                        theme === "dark"
                        ? "bg-gray-900 border-gray-700 text-white"
                        : "bg-white border-gray-200 text-gray-900"
                    }
                    />
                }
                />

                <Bar
                dataKey="revenue"
                fill={theme === "dark" ? "#8B5CF6" : "#7C3AED"}
                radius={[6, 6, 0, 0]}
                isAnimationActive={false}
                />
            </BarChart>
            </ChartContainer>
        </div>
  );
}

export default BarGraph
