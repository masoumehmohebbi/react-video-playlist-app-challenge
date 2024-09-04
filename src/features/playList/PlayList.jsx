import { useEffect, useState } from "react";
import Plyr from "@rocketseat/react-plyr";
import axios from "axios";

const PlayList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/data");
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideosData();
  }, []);
  console.log(data);

  return (
    <div>
      <Plyr
        type="youtube" // or "vimeo"
        // type="vimeo"
        videoId="ZZbTlgfa2Dg?si=oI8jcrf5sQ9wHNOf"
        controls={true}
      />
    </div>
  );
};

export default PlayList;
