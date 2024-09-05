import { useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

// Persian translations for the controls
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

  useEffect(() => {
    if (playerRef.current && playerRef.current.plyr) {
      const player = playerRef.current.plyr;

      if (currentVideo) {
        player.source = {
          type: "video",
          title: currentVideo.title,
          sources: [
            {
              src: currentVideo.videoUrl720p,
              type: "video/mp4",
              size: 720,
            },
            {
              src: currentVideo.videoUrl1080p,
              type: "video/mp4",
              size: 1080,
            },
          ],
          tracks: [
            {
              kind: "captions",
              label: "فارسی",
              src: currentVideo.subtitles,
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
                  src: currentVideo.subtitles,
                  srclang: "fa",
                  default: true,
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
              ],
              settings: ["quality", "speed", "loop"],
              quality: {
                default: 720,
                options: [720, 1080],
              },
              tooltips: { controls: true, seek: true },
              // Custom labels for controls
              i18n: {
                play: persianLabels.play,
                pause: persianLabels.pause,
                restart: persianLabels.restart,
                rewind: persianLabels.rewind,
                fastForward: persianLabels.fastForward,
                progress: persianLabels.progress,
                currentTime: persianLabels.currentTime,
                duration: persianLabels.duration,
                mute: persianLabels.mute,
                volume: persianLabels.volume,
                captions: persianLabels.captions,
                settings: persianLabels.settings,
                pip: persianLabels.pip,
                airplay: persianLabels.airplay,
                fullscreen: persianLabels.fullscreen,
                quality: persianLabels.quality,
                settingsQuality: persianLabels.settingsQuality,
                settingsSpeed: persianLabels.settingsSpeed,
                settingsLoop: persianLabels.settingsLoop,
              },
            }}
          />
          <div className="absolute top-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 p-2">
            <h3 className="text-xl">{currentVideo.title}</h3>
            <div className="flex justify-between mt-2">
              <button
                onClick={onPrevious}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                {persianLabels.previous}
              </button>
              <button
                onClick={onNext}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                {persianLabels.next}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>یک ویدیو را از نوار کناری انتخاب کنید تا پخش شود.</p>
      )}
    </div>
  );
};

export default VideoPlayer;
