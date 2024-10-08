import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import useGetVideoLists from "../features/playList/useGetVideoLists";
import Loading from "./Loading";

const SideBar = ({ setCurrentVideo, currentVideo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, data: AllVideos } = useGetVideoLists();

  useEffect(() => {
    //! Fitst way: Use Utils Func
    // fetchVideos(setData, setCurrentVideo, currentVideo);

    //! */ Second Way: Use React-query
    const fetchVideos = async () => {
      try {
        if (AllVideos.length > 0 && !currentVideo) {
          setCurrentVideo(AllVideos[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [setCurrentVideo, currentVideo]);

  if (isLoading) return <Loading />;
  return (
    <div dir="rtl" className="h-full p-5">
      <div
        className={`rounded-3xl overflow-hidden shadow-md sticky ${
          isOpen && "rounded-b-none"
        }`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-4 bg-primary-500 flex justify-between items-center cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <RectangleGroupIcon className="w-6 h-6" />
            <span className="text-lg font-bold">لیست فیلم ها</span>
          </div>
          <span
            className={`transition-all duration-200 w-6 h-6 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDownIcon />
          </span>
        </div>
      </div>
      <div
        className={`p-4 pt-1 rounded-b-3xl shadow-lg bg-primary-500 ${
          isOpen ? "block" : "hidden"
        } overflow-y-scroll max-h-96`}
      >
        {AllVideos.map((video) => (
          <div
            dir="ltr"
            key={video.id}
            className={`flex gap-x-2 p-2 items-center my-4 hover:bg-primary-300 shadow-lg hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer rounded-lg ${
              currentVideo && video.id === currentVideo.id
                ? "border-2 border-primary-900 bg-primary-700 hover:bg-primary-800 shadow-lg"
                : ""
            }`}
            onClick={() => setCurrentVideo(video)}
          >
            <img
              className="w-28 h-20 rounded-md"
              src={video.image}
              alt={video.title}
            />
            <div>
              <h4 className="text-secondary-0">{video.title}</h4>
              <p className="text-secondary-600">{video.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
