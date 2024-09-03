import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

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
    <div className="h-full p-5">
      {/* accordion */}
      <div className="rounded-3xl overflow-hidden shadow-md sticky">
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
      <div className={`pt-1 ${isOpen ? "block" : "hidden"}`}>
        {data?.map((video) => (
          <div
            className="my-2 hover:bg-primary-200 cursor-pointer rounded-lg p-2"
            key={video.id}
          >
            {video.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
