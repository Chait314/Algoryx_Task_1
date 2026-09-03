'use client'
import { useTheme } from '@/context/ThemeContext'
import { Menu, Moon, Package, Search, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Notification from './Notification'

type NavbarProps = {
  onMenuClick: () => void
}

type ProductType = {
    id:string;
    Name:string;
    Cost:string
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const { theme, toggleTheme } = useTheme();
    const [ searchText, setSearchText ] = useState<string>("");
    const [ products, setProducts ] = useState<ProductType[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const filteredProducts = products?.filter((product)=>
        (product?.Name?.toLowerCase().includes(searchText.toLowerCase()))
    )
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setSearchText(e.target.value);
    }
    useEffect(()=>{
        fetch("jsonfiles/Products.json")
        .then((res) => res.json())
        .then((json) => setProducts(json));
    },[]);
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
                placeholder='search to filter...'
                value = {searchText}
                onFocus={() => setIsFocused(true)}
                className={`w-full text-sm pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 placeholder-gray-500 focus:ring-purple-800 transition-all ${theme==='dark'?'bg-[#0D1117] text-gray-200':'bg-white border-black text-gray-900'}`}
                onChange = {(e)=>handleChange(e)}
                />
                {
                    searchText && (
                        <button className = {`absolute right-2.5 top-1/2 -translate-y-1/2 z-10 ${theme==='dark'?"text-gray-400 hover:text-gray-200": "text-gray-600 hover:text-gray-700"}`}
                            onClick={()=>setSearchText('')}>
                            <X className='w-3.5 h-3.5'/>
                        </button>
                    )
                }

                {
                    isFocused && searchText.trim().length > 0 && (
                        <>
                            <div className='fixed inset-0 z-20'
                            onClick = {()=>setIsFocused(false)}/>

                            <div
                            className={`absolute left-0 right-0 mt-2 rounded-xl border shadow-2xl z-30 max-h-96 overflow-y-auto ${
                                theme === 'dark'
                                ? 'bg-[#161B22] border-gray-800 text-gray-200'
                                : 'bg-white border-gray-200 text-gray-800'
                            }`}
                            >
                                <div className = "p-3 border-b border-gray-200 dark:border-gray-800/80 flex items-center justify-between text-xs font-semibold text-gray-400">
                                    <span>Products ({filteredProducts.length})</span>
                                </div>

                                {filteredProducts.length > 0 ? (
                                    <div className='divide-y divide-gray-100 dark:divide-gray-800/60'>
                                        {filteredProducts.map((product)=>(
                                            <div key = {product.id}
                                            className='p-3 hover:bg-purple-500/10 transition-colors cursor-pointer group flex items-start justify-between gap-3'
                                            >
                                                <div className='flex items-start gap-2.5'>
                                                    <div className="p-1.5 rounded-md bg-purple-600/10 text-purple-400 mt-0.5">
                                                        <Package className="w-4 h-4" />
                                                    </div>
                                            <div>
                                                <div className={`flex items-center gap-2 ${theme==='dark'?'text-gray-100':'text-gray-900'}`}>
                                                    <h4 className="text-xs font-bold group-hover:text-purple-400 transition-colors">
                                                    {product.Name}
                                                    </h4>
                                                    <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-purple-500/20 text-purple-500">
                                                    {product.Cost}
                                                    </span>
                                                </div>
                                            </div>
                                                </div>
                                        </div>
                                        ))}
                                    </div>
                                ): (
                                        <div className="p-6 text-center text-xs text-gray-500">
                                        No Algoryx products matching &quot;{searchText}&quot;
                                        </div>
                                    )}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
        <div className="flex items-center gap-4">
            {/* <button className="relative p-2 text-gray-600 hover:cursor-pointer rounded-lg transition-colors">
                <Bell className="w-5 h-5">
                </Bell>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-600 rounded-full ring-2 ring-white" />
            </button> */}
            <Notification/>

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

        <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
            
        </div>
      </div>


    </header>
  )
}

export default Navbar
