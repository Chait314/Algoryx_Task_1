'use client'
import { useTheme } from '@/context/ThemeContext';
import { useState, type ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const { theme, toggleTheme} = useTheme();
    return (
        <div className={`flex h-screen font-sans overflow-hidden ${theme==='dark'? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${theme==='dark'? 'bg-gray-900' : 'bg-gray-100'}`}>
                {children}
            </main>
        </div>
        </div>
    );
}