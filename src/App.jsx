import { useState } from "react";
import AppLayout from "./ui/AppLayout";
import SideBar from "./ui/SideBar";
import VideoPlayer from "./features/playList/VideoPlayer";

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);

  return (
    <AppLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <SideBar
            setCurrentVideo={setCurrentVideo}
            currentVideo={currentVideo}
          />
        </div>
        <div className="col-span-8">
          <VideoPlayer currentVideo={currentVideo} />
        </div>
      </div>
    </AppLayout>
  );
}
