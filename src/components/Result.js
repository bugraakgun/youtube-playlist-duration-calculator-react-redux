import React, { useState, useEffect } from 'react'
import axios from 'axios';
import VideoList from './VideoList';
const key = process.env.REACT_APP_API_KEY;

export default function Result({ videoIds, setErrorMessage, errorMessage, playlistId }) {
    useEffect(() => {
        if (videoIds?.items?.length) {
            fetchVideos();
        }
    }, [videoIds])

    var totalSeconds = 0;

    const fetchVideos = async () => {
        let id = [];
        videoIds.items.forEach((item) => {
            id.push(item.contentDetails.videoId);
        });
        id = id.join(",");
        const hourRegex = /(?:([\d.]+)H)/;
        const minuteRegex = /(?:([\d.]+)M)/;
        const secondRegex = /(?:([\d.]+)S)/;
        let data = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;
        await axios.get(
            `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${id}&key=${key}`
        ).then((response) => {
            data = response.data.items;
            setVideoData(data);
            data.forEach((item) => {
                hour = item.contentDetails.duration.match(hourRegex)?.[1] || 0;
                minute = item.contentDetails.duration.match(minuteRegex)?.[1] || 0;
                second = item.contentDetails.duration.match(secondRegex)?.[1] || 0;
                totalSeconds += parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
            });
            convertDuration(totalSeconds);
            setErrorMessage(null);
        })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    const convertDuration = (sec) => {
        let hour = 0;
        let minute = 0;
        let second = 0;
        hour = Math.floor(sec / 3600);
        minute = Math.floor((sec / 60) % 60);
        second = Math.floor(sec % 60);
        setDuration(`${hour} hour, ${minute} minute, ${second} second`);
    }
    const [duration, setDuration] = useState('');
    const [videoData, setVideoData] = useState([]);
    return (
        <div>
            {duration || errorMessage
                ?
                <div className={`p-4 mb-4 text-sm text-blue-800 rounded-lg ${errorMessage ? 'bg-red-200' : 'bg-blue-50'}`} role="alert">
                    <span className="font-medium">{errorMessage ? "Error: " : "Duration: "}</span>
                    <span>
                        {errorMessage ? errorMessage : duration}
                    </span>
                </div>
                :
                null
            }

        </div>

    )
}
