"use client";
import { useTheme } from "@/context/ThemeContext";

import Layout from '@/components/Layout';
import MetricCard from "@/components/MetricCard";
import { DollarSign, ListOrdered, Users } from "lucide-react";
import { useEffect, useState } from "react";

type Orders = {
    id: string;
    clientid: string
    client: string;
    amount: string;
    status: string;
}


const OrdersTable = () => {
    const { theme, toggleTheme } = useTheme(); 
    const [presentOrders, setPresentOrders] = useState<Orders[]>([]);

    const [viewAll, setViewAll] = useState<boolean>(false);
    

    useEffect(() => {
        fetch("jsonfiles/Orders.json")
        .then((res) => res.json())
        .then((json) => setPresentOrders(json));


        
    }, []);

const HandleClick = () => {
     setViewAll(!viewAll);
}

    const currOrd = (viewAll) ? presentOrders : presentOrders.slice(0,4);
  return (
    <Layout>
    <div className={`border rounded-xl overflow-hidden shadow-xs ${(theme==='dark')? 'bg-black border-gray-800': 'bg-white border-gray-200'}`}>
        <div className="p-5 border-b border-gray-500 flex justify-between items-center">
           <h3 className={`text-lg font-extrabold ${(theme==='dark')? 'text-white': 'text-black'}`}>Recent Orders</h3>
        </div>
        <div className = {`grid py-2 px-3 rounded ${theme==='dark'?'bg-black':'bg-white'} grid-cols-2 md:grid-cols-3 gap-5`}>
            <MetricCard title="Total Customers" value="8" change="-8.4%" isPositive={false} icon={Users} />
            <MetricCard title="Orders Placed" value="10" change="+2.0%" isPositive={true} icon={ListOrdered} />
            <MetricCard title="Total Revenue" value="$75" change="+0.2%" isPositive={true} icon={DollarSign} />
            {/* <MetricCard title="Active Users" value="8" change="-8.4%" isPositive={false} icon={Users} /> */}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
            <thead className={`text-xs font-bold uppercase border-b ${(theme==='dark')?'bg-gray-900 text-gray-100 border-gray-800': 'bg-gray-50 text-gray-500 border-gray-200'}`}>
            <tr>
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">Client</th>
                <th className="px-6 py-3.5">Amount</th>
                <th className="px-6 py-3.5">Status</th>
            </tr>
            </thead>
            <tbody className={`divide-y ${theme==='dark' ? 'divide-gray-800':'divide-gray-100'}`}>
            {presentOrders.map((order) => (
                <tr key={order.id} className={`transition-colors transition-all hover:overflow-x-hidden duration-300 hover:scale-[1.00] ${theme==='dark'?'hover:bg-gray-800 text-gray-100':'hover:bg-gray-100 text-gray-900'}`}>
                <td className={`px-6 py-4 font-bold ${theme==='dark'?'text-gray-50':'text-black'}`}>{order.id}</td>
                <td className={`px-6 py-4 ${theme==='dark'?'text-gray-50':'text-black'}`}>{order.client}</td>
                <td className={`px-6 py-4 font-semibold ${theme==='dark'?'text-gray-50':'text-black'}`}>{order.amount}</td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                    {order.status}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        
        </div>
    </div>
    </Layout>
    )
}

export default OrdersTable

