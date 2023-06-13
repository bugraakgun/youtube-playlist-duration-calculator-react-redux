import axios from "axios";
import React, { useState } from "react";
import Result from "./Result";

const key = process.env.REACT_APP_API_KEY;

export default function Main() {
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [playlistId, setPlaylistId] = useState(null);
  const [videoData, setVideoData] = useState([]);
  const [duration, setDuration] = useState("");

  var url = "";
  var numOfPage = 0;
  var i = 0;
  var nextPageToken = "";
  var data = [];
  const hourRegex = /(?:([\d.]+)H)/;
  const minuteRegex = /(?:([\d.]+)M)/;
  const secondRegex = /(?:([\d.]+)S)/;
  var hour = 0;
  var minute = 0;
  var second = 0;
  
  const fetchPlaylist = async () => {
    if (!link?.length) {
      setErrorMessage("URL cannot be left blank");
      setVideoData(null);
      setDuration(null);
      return;
    }

    try {
      url = new URL(link);
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage(e.message);
      setVideoData(null);
      setDuration(null);
      return;
    }
    const playlistId = url.searchParams.get("list");
    setPlaylistId(playlistId);

    do {
      await axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&key=${key}&maxResults=50&pageToken=${nextPageToken}`
        )
        .then((response) => {
          fetchVideos(response.data);
          setErrorMessage(null);
          nextPageToken = response.data.nextPageToken;
          numOfPage = Math.ceil(
            response.data.pageInfo.totalResults /
              response.data.pageInfo.resultsPerPage
          );
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
      i++;
    } while (i < numOfPage);
    setVideoData(data);
  };
  var totalSeconds = 0;

  const fetchVideos = async (videoId) => {
    var id = [];
    videoId.items.forEach((item) => {
      id.push(item.contentDetails.videoId);
    });
    id = id.join(",");
    await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${id}&key=${key}`
      )
      .then((response) => {
        response.data.items.forEach((item) => {
          data.push(item);
          parserDuration(item.contentDetails.duration);
        });
        convertDuration(totalSeconds);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const parserDuration = (duration) => {
    hour = duration.match(hourRegex)?.[1] || 0;
    minute = duration.match(minuteRegex)?.[1] || 0;
    second = duration.match(secondRegex)?.[1] || 0;
    totalSeconds += parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);

  };

  const convertDuration = (sec) => {
    hour = Math.floor(sec / 3600);
    minute = Math.floor((sec / 60) % 60);
    second = Math.floor(sec % 60);
    setDuration(`${hour} hour, ${minute} minute, ${second} second`);
  };

  return (
    <div className="px-80 py-7">
      <div className="container mb-9">
        <input
          type="text"
          placeholder="https://www.youtube.com/playlist?list=PL6rBC_87VKs76V9Vc0s44Gg_Q6qObZrFY"
          className="placeholder:italic placeholder:text-slate-400 border-2 rounded-lg py-1.5 px-3 w-4/5 shadow-md shadow-gray-500/50 focus:outline-1 focus:outline-red-500"
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  shadow-lg shadow-red-500/50   font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 w-1/6"
          onClick={fetchPlaylist}
        >
          Calculate
        </button>
      </div>
      <Result
        videoData={videoData}
        duration={duration}
        errorMessage={errorMessage}
        playlistId={playlistId}
      />
    </div>
  );
}
