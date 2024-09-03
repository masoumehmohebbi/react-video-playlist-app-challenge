// src/VideoPlayer.js

import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const VideoPlayer = ({ video }) => {
  const videoSource = {
    type: "video",
    sources: [
      {
        src: video.videoUrl,
        provider: "html5",
      },
    ],
  };

  return (
    <div className="video-container">
      <Plyr source={videoSource} />
      <h3>{video.title}</h3>
      <img src={video.thumbnailUrl} alt={video.title} />
      <p>{video.description}</p>
      <p>Author: {video.author}</p>
      <p>Views: {video.views}</p>
      <p>Upload Time: {video.uploadTime}</p>
      <p>Duration: {video.duration}</p>
      <p>Subscribers: {video.subscriber}</p>
      <p>Live: {video.isLive ? "Yes" : "No"}</p>
    </div>
  );
};

export default VideoPlayer;
