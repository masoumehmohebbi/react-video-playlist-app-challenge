import axios from "axios";

export const fetchVideos = async (setData, setCurrentVideo, currentVideo) => {
  try {
    const { data } = await axios.get("http://localhost:5000/data");
    setData(data);
    if (data.length > 0 && !currentVideo) {
      setCurrentVideo(data[0]);
    }
  } catch (err) {
    console.log(err);
  }
};
