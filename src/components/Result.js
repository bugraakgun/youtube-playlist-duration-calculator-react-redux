import VideoList from "./VideoList";

export default function Result({
  videoData,
  duration,
  errorMessage,
  playlistId,
}) {
  return (
    <div>
      {duration || errorMessage ? (
        <div
          className={`p-4 mb-4 text-sm text-blue-800 dark:text-gray-200 rounded-lg ${errorMessage ? "bg-red-200 dark:bg-red-950" : "bg-blue-50 dark:bg-gray-400"}`}
          role="alert"
        >
          <span className="font-medium">
            {errorMessage ? "Error: " : "Duration: "}
          </span>
          <span>{errorMessage ? errorMessage : duration}</span>
        </div>
      ) : null}
    
      <VideoList videoData={videoData} playlistId={playlistId} />
    </div>
  );
}
