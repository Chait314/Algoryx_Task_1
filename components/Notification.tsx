"use client"
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Check, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

export default function Notification(){
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const unreadCount = notifications.filter((n)=>!n.read).length;
    const handleDelete = (id:string, e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation();
        setNotifications((prev = []) => prev.filter((item) => item.id !== id));
    }

    useEffect(()=>{
        const loadNotifs = () => {
            fetch("jsonfiles/Notifications.json")
            .then(res => res.json())
            .then((json) => {
                json.sort((a:Notification, b:Notification)=> {
                    if(a.read === false && b.read === true){
                        return -1;
                    }
                    if(a.read === true && b.read === false){
                        return 1;
                    }
                    return 0;
                })
                
                setNotifications(json)
            
            });
        }
        loadNotifs();
    },[]);

    const handleClearAll = () => {
        setNotifications([]);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };
  const {theme, toggleTheme} = useTheme();

  return (
    <div className='relative'>
        <button onClick = {()=> setIsOpen(!isOpen)}
            className={`relative p-2 hover:cursor-pointer rounded-lg transition-colors ${theme==='dark'?'text-gray-200 bg-gray-900 hover:text-white hover:bg-gray-800': 'text-gray-900 bg-gray-100 hover:text-black hover:bg-gray-200'}`}
            aria-label='Open-Notifications'>
                <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-[#161B22]" />
                    )}
        </button>

        {isOpen && (
            <div>
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsOpen(false)}
                />
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 border rounded-xl shadow-2xl z-40 overflow-hidden ${theme==='dark'?'bg-[#161B22] border-gray-800': 'bg-[#F9FAFB] border-gray-200'}`}>
                    
                    <div className={`p-4 border flex items-center justify-between ${theme==='dark'?'border-gray-800': 'border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                            <h3 className={`font-bold text-sm ${theme==='dark'? 'text-white':'text-black'} `}>Notifications</h3>
                            {unreadCount > 0 && (
                            <span className={`text-[10px] font-bold ${theme === 'dark'? 'bg-purple-700/20 text-purple-200':'bg-purple-400/20 text-purple-700'} px-2 py-0.5 rounded-full border border-purple-500/20`}>
                                {unreadCount} new
                            </span>
                            )}
                        </div>
                        
                        {notifications.length > 0 && (
                            <div className={`flex items-center gap-3 text-xs ${(theme==='dark')?'text-gray-300':'text-gray-700'}`}>
                            <button
                                onClick={handleMarkAllRead}
                                className={`${(theme==='dark')?'text-purple-400':'text-purple-600'} transition-colors hover:cursor-pointer flex items-center gap-1`}
                            >
                                <Check className="w-3.5 h-3.5" /> Read
                            </button>
                            <button
                                onClick={handleClearAll}
                                className={`${(theme==='dark')? 'hover:text-rose-400':'hover:text-rose-600'} hover:cursor-pointer transition-colors`}
                            >
                                Clear
                            </button>
                            </div>
                        )}

                    </div>

                    <div className = {`max-h-80 overflow-y-auto divide-y ${theme==='dark'?'divide-gray-800/60':'divide-gray-200/30'}`}>
                        {
                            notifications.length === 0 ? (
                                <div className={`p-8 text-center ${theme==='dark'?'text-gray-400':'text-gray-600'} text-sm`}>
                                    No notifications
                                </div>
                            ):
                            (
                                <AnimatePresence initial={false}>
                               { notifications.map((item)=> (
                                    <motion.div
                                        key={item.id}
                                        initial = {{opacity:1, x:0, height:'auto'}}
                                        exit = {{
                                            x:'100%',
                                            opacity:0,
                                            height:0,
                                            paddingTop:0,
                                            paddingBottom:0,
                                            transition:{
                                                x: {type:'spring', stiffness:300, damping:30},
                                                opacity: {duration:0.2},
                                                height: { delay: 0.1, duration:0.2}
                                            },
                                        }}
                                        className={`p-4 flex items-start justify-between gap-3 transition-colors ${
                                        item.read ? 'opacity-60 bg-transparent' : ((theme==='dark') ? 'bg-purple-900/10': 'bg-purple-400/10')
                                        } ${(theme==='dark') ? 'hover:bg-gray-700/40':'hover:bg-gray-300/40' }`}
                                    >
                                        <div className="space-y-1 flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-xs flex-col font-semibold ${(theme==='dark')? 'text-white':'text-black'}`}>
                                            {item.title} 
                                            </p>
                                            {(item.read === false)? (<nav className={`${theme==='dark' ? 'bg-purple-600 text-rose-200':'bg-purple-600 text-rose-100'} rounded-xl h-[17px] text-xs text-center w-[45px]`}>New</nav>):(<></>)}
                                            <span className={`text-[12px] ${(theme==='dark')?'text-gray-400':'text-gray-600'}`}>{item.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-snug">
                                            {item.message}
                                        </p>
                                        </div>

                                        {/* Delete Action Button */}
                                        <button
                                        onClick={(e) => handleDelete(item.id, e)}
                                        className={`text-gray-500 hover:cursor-pointer p-1 rounded-md transition-colors ${(theme==='dark')?'hover:bg-rose-500/10 hover:text-rose-400':'hover:bg-rose-600/10 hover:text-rose-600'}`}
                                        title="Delete notification"
                                        >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            )
                        }
                    </div>

                </div>
            </div>
        )}
    </div>
  )
}