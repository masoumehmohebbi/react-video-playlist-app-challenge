import { useState } from "react";
import ReactPlayer from "react-player";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import Subtitles from "./Subtitle"; // Import the Subtitles component

const PlayListItem = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const currentVideo = data[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center relative">
      <ReactPlayer
        url={currentVideo.videoUrl}
        controls={true}
        width="80%"
        pip={true}
        loop={true}
        playbackRate={1}
        previewTabIndex={2}
        muted
        onProgress={(progress) => setPlayedSeconds(progress.playedSeconds)}
      />
      <Subtitles
        subtitleUrl={currentVideo.subtitleUrl}
        currentTime={playedSeconds}
      />
      <div className="flex items-center gap-x-5 p-5">
        <button onClick={handlePrev} disabled={data.length <= 1}>
          <GrCaretPrevious className="w-7 h-7" />
        </button>
        <button onClick={handleNext} disabled={data.length <= 1}>
          <GrCaretNext className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default PlayListItem;
