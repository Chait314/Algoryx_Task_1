'use client'
import { useTheme } from "@/context/ThemeContext";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";


type MetricsCard = {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: LucideIcon;
}



const MetricCard = ({title, value, change, isPositive, icon}: MetricsCard) => {
  const IconComponent = icon;
    const {theme, toggleTheme} = useTheme();
  return (
    <div className={`border p-6 rounded-xl shadow-xs ${theme==='dark'? 'bg-gray-900 text-white border-gray-800' : 'bg-gray-100 text-black border-gray-100'} transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold ${theme==='dark'? 'text-gray-100' : 'text-gray-900'}`}>{title}</span>
        {IconComponent && <IconComponent className={`w-5 h-5 ${theme==='dark'? 'text-purple-500':'text-purple-600'}`}/>}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className={`text-3xl font-extrabold text-black tracking-tight ${(theme==='dark'? 'text-gray-50': 'text-black')}`}>{value}</span>
        <span className={`flex items-center text-xs font-semibold ${isPositive ? (theme==='dark')?'text-emerald-500':'text-emerald-600'  : (theme==='dark')?'text-rose-500':'text-rose-600'}`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
          {change}
        </span>
      </div>
    </div>
  )
}

export default MetricCard
