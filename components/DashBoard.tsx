'use client'
import { useTheme } from '@/context/ThemeContext';
import { Activity, DollarSign, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard';
import OrdersTable from '../components/OrdersTable';
import UserProfile from '../components/UserProfile';
import Layout from './Layout';

const gradients = [
    'from-purple-700 to-violet-500',
    'from-purple-600 to-violet-600',
    'from-purple-500 to-violet-700',
    'from-purple-600 to-violet-600'
]

const DashBoard = () => {
    const {theme, toggleTheme} = useTheme();
    const [gradientIndex, setGradientIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(()=> {
            setGradientIndex((prev) => (prev+1)%gradients.length)
        },50);

        return () => clearInterval(interval)
    },[])

  return (
    <Layout>
        <div className={`space-y-6 p-8 ${(theme==='dark')? 'bg-black' : 'bg-white'}`}>

            <div className='py-3'>
                <h1 className={`text-3xl md:text-4xl font-black text-black tracking-tight ${theme==='dark'?'font-white text-white':'font-black text-black'}`}>
                    Dashboard for software <span className={`bg-gradient-to-r ${gradients[gradientIndex]} transition-opacity bg-clip-text text-transparent transition-all`}>that ships.</span>
                    </h1>
                    <p className={`text-sm mt-1 ${theme==='dark'?'text-gray-400 hover:text-purple-700':'text-gray-500 hover:text-purple-500'}`}>
                        Overview of your real-time metrics and project deployment status.</p>
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-3 gap-5">
                <MetricCard title="Total Revenue" value="$1,500" change="+14.2%" isPositive={true} icon={DollarSign} />
                <MetricCard title="Active Services" value="34" change="+8.1%" isPositive={true} icon={Activity} />
                <MetricCard title="Active Users" value="8" change="-8.4%" isPositive={false} icon={Users} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                <div className='lg:col-span-2'>
                    <OrdersTable/>
                </div>
                <div className='space-y-6'>
                    <UserProfile/>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default DashBoard
