import axios from "axios";
import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

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
  return (
    <div className="h-full p-5  ">
      {/* accordion */}
      <div
        className={`rounded-3xl overflow-hidden shadow-md sticky ${
          isOpen && "rounded-b-none"
        }`}
      >
        {/* accordion header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-4 bg-primary-400 flex justify-between items-center cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <RectangleGroupIcon className="w-6 h-6" />
            <span>List of movies</span>
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
      {/* accordion body */}
      <div
        className={`p-3 pt-1 rounded-b-3xl shadow-lg bg-primary-400 ${
          isOpen ? "block" : "hidden"
        } overflow-y-scroll max-h-96`}
      >
        {data?.map((video) => (
          <div
            key={video.id}
            className="flex gap-x-2 p-2 items-center my-4 hover:bg-primary-200 cursor-pointer rounded-lg"
          >
            <img className="w-28 h-20 rounded-md" src={video.image} />
            <Link to={video.videoUrl} className="block">
              {video.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
