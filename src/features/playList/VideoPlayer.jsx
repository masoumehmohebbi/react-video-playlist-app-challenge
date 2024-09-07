import { useEffect, useRef, useState } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { MdOutlineNavigateNext } from "react-icons/md";
import Loading from "../../ui/Loading";

const persianLabels = {
  play: "پخش",
  pause: "توقف",
  restart: "از ابتدا",
  rewind: "عقب",
  fastForward: "جلو",
  progress: "پیشرفت",
  currentTime: "زمان حال",
  duration: "مدت زمان",
  mute: "بی صدا",
  volume: "صدا",
  captions: "زیرنویس",
  settings: "تنظیمات",
  pip: "تصویر در تصویر",
  airplay: "پخش هوایی",
  fullscreen: "تمام صفحه",
  next: "بعدی",
  previous: "قبلی",
  quality: "کیفیت",
  settingsQuality: "کیفیت",
  settingsSpeed: "سرعت",
  settingsLoop: "حلقه",
};

const VideoPlayer = ({ currentVideo, onPrevious, onNext }) => {
  const playerRef = useRef(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.plyr) {
      const player = playerRef.current.plyr;

      if (currentVideo) {
        setChapters([
          { time: 120, label: "این دقیقه دوم است" }, // 2-minute marker
        ]);
        player.source = {
          type: "video",
          title: currentVideo.title,
          sources: [
            {
              src: currentVideo.videoUrl,
              provider: "html5",
            },
          ],
          tracks: [
            {
              kind: "captions",
              label: "فارسی",
              src: currentVideo.subtitle,
              srclang: "fa",
              default: true,
            },
          ],
        };
      }
    }
  }, [currentVideo]);

  return (
    <div className="space-y-4">
      {currentVideo ? (
        <div className="relative w-full h-full">
          <Plyr
            ref={playerRef}
            source={{
              type: "video",
              title: currentVideo.title,
              sources: [
                {
                  src: currentVideo.videoUrl,
                  provider: "html5",
                },
              ],
              tracks: [
                {
                  kind: "captions",
                  label: "فارسی",
                  srclang: "fa",
                  default: true,
                  src: currentVideo.subtitle,
                },
              ],
            }}
            options={{
              controls: [
                "play-large",
                "restart",
                "rewind",
                "play",
                "fast-forward",
                "progress",
                "current-time",
                "duration",
                "mute",
                "volume",
                "captions",
                "settings",
                "pip",
                "airplay",
                "fullscreen",
                "quality",
                "markers",
              ],
              settings: ["quality", "speed", "loop"],
              quality: {
                default: 720,
                options: [480, 720, 1080],
                forced: true,
              },
              tooltips: { controls: true, seek: true },
              i18n: persianLabels,
              markers: {
                enabled: true,
                points: [
                  {
                    time: 300,
                    label: "Point 1: 5 Minutes",
                    tooltip: "This is a tooltip for 5 minutes",
                  },
                  {
                    time: 600,
                    label: "Point 2: 10 Minutes",
                    tooltip: "Another tooltip for 10 minutes",
                  },
                ],
              },
            }}
          />
          {/* Chapter markers */}
          <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none">
            <div className="relative w-full h-full">
              <div className="chapter-markers absolute bottom-0 left-0 w-full h-full z-10">
                {chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="marker absolute"
                    style={{
                      left: `${
                        (chapter.time /
                          (playerRef.current?.plyr?.duration || 1)) *
                        100
                      }%`,
                    }}
                  >
                    <span className="tooltip">{chapter.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Video Title */}
          <div className="absolute top-4 left-0 right-0 text-center text-secondary-0 bg-black bg-opacity-50 p-2">
            <h3 className="text-xl">{currentVideo.title}</h3>
            <div className="flex justify-between mt-2">
              <button
                onClick={onPrevious}
                className="transition duration-500 bg-secondary-700 flex items-center justify-center gap-x-1 hover:bg-primary-600 text-secondary-0 px-4 py-2 rounded-3xl"
              >
                <MdOutlineNavigateNext className="w-6 h-6 rotate-180" />
                {persianLabels.previous}
              </button>
              <button
                onClick={onNext}
                className="transition duration-500 bg-secondary-700 flex items-center justify-center gap-x-1 hover:bg-primary-600 text-secondary-0 px-4 py-2 rounded-3xl"
              >
                {persianLabels.next}
                <MdOutlineNavigateNext className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Loading width="110" height="150" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
