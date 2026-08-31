'use client'
import { useTheme } from '@/context/ThemeContext';
import { LayoutDashboard, Settings, ShoppingBag, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, active: false, href:"/" },
  { name: 'Customers', icon: Users, active: false, href:"/customers"},
  { name: 'Orders', icon: ShoppingBag, active: false, href:"/orders" },
  { name: 'Settings', icon: Settings, active: false, href:"/settings"},
];

const colors = [
    'bg-gray-700 text-purple-700', 'text-gray-300 hover:bg-gray-800', 'bg-purple-50 text-purple-500', 'text-gray-800 hover:bg-gray-200'
]

type SidebarProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  //  const [currentActive, setActive] = useState(0);
    const {theme, toggleTheme} = useTheme();
    const Router = useRouter();
    const pathname = usePathname();
    return (
        <>
            {isOpen && (
                <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity'
                onClick = {()=> setIsOpen(false)}/>
            )}

            <aside className={`fixed lg:relative max-h-screen inset-y-0 left-0 z-50 w-64 border-r transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${theme==='dark' ? 'bg-[#161B22] border-gray-900':'bg-[#F9FAFB] border-gray-200'}`}>
                <div className={`h-16 flex items-center justify-between px-6 border-b ${theme === 'dark'? 'border-gray-800': 'border-gray-200'}`}>
                    <div className="flex items-center gap-2">
                        <span className={`text-xl font-extrabold tracking-tight ${theme==='light' ? 'text-[#161B22]': 'text-[#F9FAFB]'}`}>
                        ALGORYX TECHNOLOGIES 
                        </span>
                    </div>
                    <button className={`lg:hidden text-gray-600 ${theme==='dark' ? 'text-white':'text-black'}`} onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                   
                </div>

                <nav className='p-4 space-y-1'>
                    {
                        navItems.map((item, idx)=>{
                            const Icon = item.icon;
                            const isActive = pathname === item.href
                            return (
                                <Link key={idx} href = {item.href}><button 
                                
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                                    isActive
                                        ? (theme === 'dark' ? colors[0] : colors[2])
                                        : (theme === 'dark' ? colors[1] : colors[3])
                                }`}>
                                    <Icon className={`w-5 h-5 ${item.active ? 'text-purple-600' : 'text-gray-500'}`} />
                                        {item.name}
                                </button></Link>
                            )
                        })
                    }
                </nav>

            </aside>
        </>
    );
};

export default Sidebar
