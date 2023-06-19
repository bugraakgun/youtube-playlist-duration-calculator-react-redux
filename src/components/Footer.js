import React from "react";
import { FaGithubSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-neutral-200  border-t border-gray-300 flex justify-between items-center px-40 dark:bg-slate-500">
      <span className="text-center font-medium text-gray-800 dark:text-gray-300">Buğra Akgün</span>
      <span>
        <a
          href="https://github.com/bugraakgun/youtube-playlist-total-time-calculator-react-redux"
          target="_blank"
          className="text-3xl text-red-500 hover:text-red-600 transition-colors"
        >
          <FaGithubSquare />
        </a>
      </span>
    </div>
  );
}
