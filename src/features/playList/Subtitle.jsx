import { useState, useEffect } from "react";

const Subtitles = ({ subtitleUrl, currentTime }) => {
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  useEffect(() => {
    const fetchSubtitles = async () => {
      const response = await fetch(subtitleUrl);
      const text = await response.text();
      const parsedSubtitles = parseVTT(text);
      setSubtitles(parsedSubtitles);
    };

    fetchSubtitles();
  }, [subtitleUrl]);

  useEffect(() => {
    const activeSubtitle = subtitles.find(
      (subtitle) => currentTime >= subtitle.start && currentTime <= subtitle.end
    );
    setCurrentSubtitle(activeSubtitle ? activeSubtitle.text : "");
  }, [currentTime, subtitles]);

  const parseVTT = (vttText) => {
    const subtitles = [];
    const regex = /(\d+:\d+:\d+.\d+)\s-->\s(\d+:\d+:\d+.\d+)\n(.+)/g;
    let match;

    while ((match = regex.exec(vttText)) !== null) {
      const [_, start, end, text] = match;
      subtitles.push({
        start: parseTime(start),
        end: parseTime(end),
        text,
      });
    }

    return subtitles;
  };

  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    return (
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseFloat(seconds)
    );
  };

  return (
    <div className="absolute bottom-10 w-full text-center text-white text-xl bg-black bg-opacity-50 p-2">
      {currentSubtitle}
    </div>
  );
};

export default Subtitles;
