import axios from "axios";
import React, { useState } from "react";
import Result from "./Result";

const key = process.env.REACT_APP_API_KEY;

export default function Main() {
  const [link, setLink] = useState("");
  const [errorMessage,setErrorMessage] = useState('');
  const [videoIds, setVideoIds] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const fetchPlaylist = async () => {
    if(!link?.length){
      setErrorMessage("URL cannot be left blank");
      return;
    }
    let url = '';
    try {
      url = new URL(link);
      setErrorMessage(null);
    } catch (e) {
      setErrorMessage(e.message);
      return;
    }
    
    const playlistId = url.searchParams.get("list");
    setPlaylistId(playlistId); 
    var numOfPage = 0;
    var i = 0;
    var nextPageToken = "";
    do{
    await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&key=${key}&maxResults=50&pageToken=${nextPageToken}`
      )
      .then((response) => {
        setVideoIds(response.data);
        setErrorMessage(null);
        nextPageToken = response.data.nextPageToken;
        numOfPage = Math.ceil(response.data.pageInfo.totalResults / response.data.pageInfo.resultsPerPage);
      })
      .catch((error)=>{
        setErrorMessage(error.message);
      }); 
      i++;
    }
    while(i < numOfPage);
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
    </div>
  );
}
