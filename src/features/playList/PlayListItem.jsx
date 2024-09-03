import { useState } from "react";
import ReactPlayer from "react-player";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

const PlayListItem = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <ReactPlayer url={data[currentIndex]?.videoUrl} controls width="50%" />
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
