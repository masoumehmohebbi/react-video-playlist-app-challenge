import axios from "axios";
import { useEffect, useState } from "react";
import PlayListItem from "./PlayListItem";
import Loading from "../../ui/Loading";

const PlayList = () => {
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

  console.log(data);

  if (data.length === 0)
    return (
      <div className="h-[70%] flex items-center justify-center">
        <Loading />
      </div>
    );
  return (
    <div>
      <PlayListItem data={data} />
    </div>
  );
};

export default PlayList;
