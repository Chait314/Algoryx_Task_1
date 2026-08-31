'use client'
import { useTheme } from '@/context/ThemeContext'
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react'

type NavbarProps = {
  onMenuClick: () => void
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const { theme, toggleTheme } = useTheme();
  return (
    <header className={`h-16 z-50 border-b border-gray-200 px-4 md:px-6 flex items-center justify-between ${theme==='dark'? 'bg-[#161B22] text-white':'bg-gray-50 text-black'}`}>
        <div className = "flex items-center gap-4">
            <button className={`lg:hidden text-gray-600 cursor-pointer ${theme==='dark'? 'hover:text-white':'hover:text-black'}`} onClick={onMenuClick}>
                <Menu className='w-6 h-6'/>
            </button>
            <div className='relative w-48 sm:w-64 md:w-80'>
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input
                type="text"
                placeholder='search...'
                className={`w-full text-sm pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 placeholder-gray-500 focus:ring-purple-800 transition-all ${theme==='dark'?'bg-[#0D1117] text-gray-200':'bg-gray-50 text-gray-900'}`}
                />
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:cursor-pointer rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-600 rounded-full ring-2 ring-white" />
            </button>

            <button
                onClick={() => toggleTheme()}
                className="p-2 rounded-lg transition-color hover:cursor-pointer"
                aria-label="Toggle theme"
                >
                {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                    <Moon className="w-5 h-5 text-purple-600" />
                )}
            </button>

            <button className="hidden cursor-pointer sm:inline-flex bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors">
            New Project
            </button>

            <div className="h-9 w-9 rounded-full bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-sm">
            
            </div>
      </div>


    </header>
  )
}

export default Navbar
