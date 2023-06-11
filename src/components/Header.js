import React from "react";
import { FaGithubSquare, FaMoon, FaSun } from "react-icons/fa";
export default function Header() {
  return (
    <nav className="bg-neutral-200 border-b border-gray-300">
      <div className="px-80 py-7">
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl text-red-500 ">
            Youtube Playlist Length
          </span>
          <span>
            <a href="https://github.com/bugraakgun/youtube-playlist-total-time-calculator-react-redux" target="_blank" className="text-4xl text-red-500 hover:text-red-600 transition-colors">
              <FaGithubSquare />
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
}
