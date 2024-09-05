import { useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { MdOutlineNavigateNext } from "react-icons/md";
import Loading from "../../ui/Loading";

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

// Fake subtitle data
const fakeCaptions = [
  { start: 0, end: 5, text: "سلام، این یک ویدیو تستی است." },
  { start: 6, end: 10, text: "این متن نمونه برای زیرنویس است." },
  { start: 11, end: 15, text: "امیدواریم که مفید باشد!" },
];

// Convert captions to WebVTT format and encode in Base64
const captionsToVTT = (captions) => {
  const vttContent =
    "WEBVTT\n\n" +
    captions
      .map((caption, index) => {
        const start =
          new Date(caption.start * 1000).toISOString().substr(11, 8) + ".000";
        const end =
          new Date(caption.end * 1000).toISOString().substr(11, 8) + ".000";
        return `${index + 1}\n${start} --> ${end}\n${caption.text}\n`;
      })
      .join("\n");

  // Encode in Base64
  const uint8Array = new TextEncoder().encode(vttContent);
  let binary = "";
  for (let i = 0; i < uint8Array.byteLength; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
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
                  srclang: "fa",
                  default: true,
                  src: "data:text/vtt;base64," + captionsToVTT(fakeCaptions),
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
