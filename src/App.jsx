import { useEffect, useState } from "react";
import AppLayout from "./ui/AppLayout";
import SideBar from "./ui/SideBar";
import VideoPlayer from "./features/playList/VideoPlayer";
import axios from "axios";
import { fetchVideos } from "./utils/getVideoList";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    // const fetchVideos = async () => {
    //   try {
    //     const { data } = await axios.get("http://localhost:5000/data");
    //     setData(data);
    //     if (data.length > 0 && !currentVideo) {
    //       setCurrentVideo(data[0]);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // fetchVideos();
    fetchVideos(setData, setCurrentVideo, currentVideo);
  }, [setCurrentVideo, currentVideo]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data?.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <SideBar
            setCurrentVideo={(video) => {
              const index = data.findIndex((v) => v.id === video.id);
              setCurrentIndex(index);
            }}
            currentVideo={data[currentIndex]}
          />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <VideoPlayer
            currentVideo={data[currentIndex]}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </AppLayout>
  );
}
