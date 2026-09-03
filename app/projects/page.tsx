"use client"
import Layout from '@/components/Layout';
import ProjectCard, { Project } from '@/components/ProjectCard';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
const page = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const { theme, toggleTheme } = useTheme();
    useEffect(()=> {
        fetch("jsonfiles/Projects.json").then((res)=>res.json()).then((json)=>setProjects(json));
    },[]);
  return (
    <Layout>
    <div className={`grid grid-cols-3 gap-5`}>
        {projects.map((proj,idx)=>(
            <div key = {idx}><ProjectCard name={proj.name} progress={proj.progress} domain={proj.domain}/></div>
        ))}
         <div
        className={`p-5 rounded-xl border text-bold text-2xl hover:cursor-pointer transition-all flex items-center text-center duration-200 hover:scale-[1.02] shadow-sm flex-col justify-between space-y-4 ${
            theme === "dark"
            ? "bg-purple-800 text-white border-gray-800 hover:border-purple-500/50"
            : "bg-purple-500 text-black border-gray-200 hover:border-purple-400"
        }`}
        > + New Project </div>
    </div>
    </Layout>
  )
}

export default page
