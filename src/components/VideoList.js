import React from "react";

export default function VideoList({ videoData }) {
  const calculateDuration = (duration) => {
    const hourRegex = /(?:([\d.]+)H)/;
    const minuteRegex = /(?:([\d.]+)M)/;
    const secondRegex = /(?:([\d.]+)S)/;
    let hour = duration.match(hourRegex)?.[1] || 0;
    let minute = duration.match(minuteRegex)?.[1] || 0;
    let second = duration.match(secondRegex)?.[1] || 0;
    let sec = parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
    hour = Math.floor(sec / 3600);
    minute = Math.floor((sec / 60) % 60);
    second = Math.floor(sec % 60);
    return `${hour} hour, ${minute} minute, ${second} second`;
  };
  return (
    <ul className="w-full text-sm font-medium text-gray-900  rounded-lg grid gap-2">
      {videoData
        ? videoData.map((item) => (
            <li className="w-full px-4 py-2 border-b border-gray-200 bg-gray-200 rounded-lg">
              <a
                href="#"
                className="hover:opacity-80 transition-all grid grid-cols-3 justify-center content-center"
              >
                <span>{item.snippet.title}</span>
                <span className="line-clamp-2">{item.snippet.description}</span>
                <span>{calculateDuration(item.contentDetails.duration)}</span>
              </a>
            </li>
          ))
        : null}
    </ul>
  );
}
