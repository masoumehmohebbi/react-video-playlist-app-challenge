import axios from "axios";
import { useEffect, useState } from "react";

const PlayList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!open) return;

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

  return <div>PlayList</div>;
};

export default PlayList;
