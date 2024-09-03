import ReactPlayer from "react-player";
import PlayList from "./features/playList/PlayList";
import AppLayout from "./ui/AppLayout";
export default function App() {
  return (
    // <ReactPlayer
    //   playing
    //   url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
    //   controls={true}
    //   config={{
    //     file: {
    //       tracks: [
    //         {
    //           kind: "subtitles",
    //           src: "subs/subtitles.en.vtt",
    //           srcLang: "en",
    //           default: true,
    //         },
    //         { kind: "subtitles", src: "subs/subtitles.ja.vtt", srcLang: "ja" },
    //         { kind: "subtitles", src: "subs/subtitles.de.vtt", srcLang: "de" },
    //       ],
    //     },
    //   }}
    // />

    <AppLayout>
      <PlayList />
    </AppLayout>
  );
}
