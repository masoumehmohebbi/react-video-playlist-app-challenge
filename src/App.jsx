import { useEffect, useState } from "react";
import AppLayout from "./ui/AppLayout";
import SideBar from "./ui/SideBar";
import VideoPlayer from "./features/playList/VideoPlayer";
import useGetVideoLists from "./features/playList/useGetVideoLists";
import Loading from "./ui/Loading";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoading: isFetching, data: AllVideos } = useGetVideoLists();

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
    //! Fitst way: Use Utils Func
    // fetchVideos(setData, setCurrentVideo, currentVideo);

    //! */ Second Way: Use React-query
    const fetchVideos = async () => {
      try {
        if (AllVideos?.length > 0 && !currentVideo) {
          setCurrentVideo(AllVideos[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [setCurrentVideo, currentVideo]);

  if (isFetching) return <Loading />;
  return (
    <AppLayout>
      <ContentWrapperCmp
        AllVideos={AllVideos}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    </AppLayout>
  );
}

function ContentWrapperCmp({ AllVideos, setCurrentIndex, currentIndex }) {
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? AllVideos?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === AllVideos?.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-4">
        <SideBar
          setCurrentVideo={(video) => {
            const index = AllVideos.findIndex((v) => v.id === video.id);
            setCurrentIndex(index);
          }}
          currentVideo={AllVideos[currentIndex]}
        />
      </div>
      <div className="col-span-12 lg:col-span-8 px-9 overflow-hidden">
        <VideoPlayer
          currentVideo={AllVideos[currentIndex]}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
