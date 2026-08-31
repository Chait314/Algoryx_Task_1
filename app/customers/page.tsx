"use client"
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

type CustomerType = {
    clientid: string;
    client: string;
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
        <div className={`flex-col justify-center`}>
            <h1 className={`${theme === 'dark'? 'text-gray-300':'text-gray-800'} p-6 text-center text-lg font-bold`}>Customer Data</h1>
            <table className={`w-full text-center text-bg ${theme === 'dark'? 'text-gray-300':'text-gray-800'}`}>
                    <thead className={`text-xs font-bold p-2 uppercase border-b ${(theme==='dark')?'bg-gray-800 text-gray-100 border-gray-800': 'bg-gray-50 text-gray-800 border-gray-200'}`}>
                        <tr>
                            <th className='px-6 py-3.5'>ID</th>
                            <th className='px-6 py-3.5'>Name</th>
                        </tr>
                    </thead>
            <tbody className={`border ${theme === 'dark'? 'border-gray-800 bg-black':'border-gray-200 bg-gray-50'}`}>
            {
                
                customers.map((cus, idx) => (
                    <tr className= {`${theme==='dark' ? 'hover:bg-gray-700': 'hover:bg-gray-200'}`}key = {idx}>
                        <td className='px-6 py-3.5'>{cus.clientid}</td><td>{cus.client}</td>
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
