import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const PlayList = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchVidosLists = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/data");
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVidosLists();
  }, []);

  console.log(data);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  if (data.length === 0) return <div>Loading...</div>;
  return (
    <div>
      <ReactPlayer url={data[currentIndex]?.videoUrl} controls width="100%" />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={data.length <= 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={data.length <= 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PlayList;
