import React, { useEffect, useState } from "react";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/slice/themeSlice";

export default function Header() {
  const theme = useSelector((state)=>state.theme.value);
  const dispatch = useDispatch();
  const element = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const options = [
    {
      icon: FaMoon,
      text: "dark",
    },
    {
      icon: FaSun,
      text: "light",
    },
    {
      icon: FaDesktop,
      text: "system",
    },
  ];
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        break;
      case "light":
        element.classList.remove("dark");
        break;
      default:
        localStorage.removeItem('theme');
        onWindowMatch();
        break;
    }
  }, [theme]);
  function onWindowMatch(){
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  darkQuery.addEventListener('change',(e)=>{
    if(!('theme' in localStorage)){
      if(e.matches){
        element.classList.add('dark');
      }
      else{
        element.classList.remove('dark');
      }
    }
  })
  return (
    <nav className="bg-neutral-200 border-b border-gray-300 dark:bg-slate-500">
      <div className="px-80 py-7">
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl text-red-500 ">
            Youtube Playlist Length
          </span>
          <span className="bg-gray-300 dark:bg-gray-400 rounded-lg p-2 grid gap-x-3 grid-flow-col">
            {options.map((opt) => (
              <button
                key={opt.text}
                onClick={() => dispatch(setTheme(opt.text))}
                className={`text-2xl transition-colors ${
                  theme == opt.text && "text-sky-500"
                }`}
              >
                <opt.icon />
              </button>
            ))}
          </span>
        </div>
      </div>
    </nav>
  );
}
