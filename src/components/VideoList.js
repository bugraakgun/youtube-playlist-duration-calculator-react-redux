import React from "react";

export default function VideoList({ videoData, playlistId }) {
  const hourRegex = /(?:([\d.]+)H)/;
  const minuteRegex = /(?:([\d.]+)M)/;
  const secondRegex = /(?:([\d.]+)S)/;

  const calculateDuration = (duration) => {
    let hour = duration.match(hourRegex)?.[1] || 0;
    let minute = duration.match(minuteRegex)?.[1] || 0;
    let second = duration.match(secondRegex)?.[1] || 0;
    let sec = parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
    hour = Math.floor(sec / 3600);
    minute = Math.floor((sec / 60) % 60);
    second = Math.floor(sec % 60);

    return hour ? `${hour} hour, ${minute} minute, ${second} second` : `${minute} minute, ${second} second`;
  };
  return (
    <ul className="w-full text-sm font-medium text-gray-900   rounded-lg grid gap-y-2 mb-16">
      {videoData
        ? videoData.map((item, index) => (
            <li
              key={index}
              className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-500 bg-gray-200 dark:bg-gray-500 rounded-lg"
            >
              <a
                href={`https://youtube.com/watch?v=${item.id}&list=${playlistId}`}
                target="_blank"
                className="hover:opacity-80 transition-all grid grid-cols-4 justify-center content-center gap-4"
              >
                <span>{item.snippet.title}</span>
                <span className="line-clamp-2 col-span-2">
                  {item.snippet.description}
                </span>
                <span>{calculateDuration(item.contentDetails.duration)}</span>
              </a>
            </li>
          ))
        : null}
    </ul>
  );
}
