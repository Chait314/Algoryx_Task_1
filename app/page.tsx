'use client'
import DashBoard from '@/components/DashBoard';
import { useTheme } from '@/context/ThemeContext';

const page = () => {
  //const [isOpen, setIsOpen] = useState<boolean>(true);
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'bg-black':'bg-gray-50'}`}>
      <DashBoard/>
    </div>
  )
}

export default page
