"use client"
import MetricCard from '@/components/MetricCard';
import { useTheme } from '@/context/ThemeContext';
import { Activity, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

type CustomerType = {
    clientid: string;
    client: string;
    ordersPlaced: number
}

const Customers = () => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const { theme, toggleTheme } = useTheme();
    useEffect(()=>{
        fetch("jsonfiles/Customers.json")
        .then(res => res.json())
        .then(json => setCustomers(json));
    },[]);

    return (
    <Layout>
        <div className={`flex flex-col justify-center`}>
            <div className="p-5 border-b border-gray-500 flex justify-between items-center">
                <h3 className={`text-lg font-extrabold ${(theme==='dark')? 'text-white': 'text-black'}`}>OUR CUSTOMERS</h3>
            </div>
            <div className = {`grid py-2 px-3 rounded ${theme==='dark'?'bg-black':'bg-white'} grid-cols-2 md:grid-cols-3 gap-5`}>
                <MetricCard title="Total Customers" value="8" change="-8.4%" isPositive={false} icon={Users} />
                <MetricCard title="Active Services" value="34" change="+8.1%" isPositive={true} icon={Activity} />
                {/* <MetricCard title="Active Users" value="8" change="-8.4%" isPositive={false} icon={Users} /> */}
            </div>
            <table className={`w-full text-center text-bg ${theme === 'dark'? 'text-gray-300':'text-gray-800'}`}>
                    <thead className={`text-xs font-bold p-2 uppercase border-b ${(theme==='dark')?'bg-gray-800 text-gray-100 border-gray-800': 'bg-gray-50 text-gray-800 border-gray-200'}`}>
                        <tr className = {`${(theme==='dark')?'bg-gray-800 text-gray-100 border-gray-800': 'bg-gray-200 text-gray-800 border-gray-200'}`}>
                            <th className='px-6 py-3.5'>ID</th>
                            <th className='px-6 py-3.5'>Name</th>
                            <th className='px-6 py-3.5'>Orders Placed</th>
                        </tr>
                    </thead>
            <tbody className={`border-b divide-y ${theme === 'dark'? 'border-gray-800 divide-gray-800 bg-black':'border-gray-200 divide-gray-200 bg-white'}`}>
            {
                
                customers.map((cus, idx) => (
                    <tr className= {`${theme==='dark' ? 'hover:bg-gray-700': 'hover:bg-gray-200'} hover:cursor-pointer`}key = {idx}>
                        <td className='px-6 py-3.5'>{cus.clientid}</td><td>{cus.client}</td><td>{cus.ordersPlaced}</td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    </Layout>
  )
}

export default Customers
