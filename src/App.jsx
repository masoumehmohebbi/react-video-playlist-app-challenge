import PlayList from "./features/playList/PlayList";
import AppLayout from "./ui/AppLayout";
import SideBar from "./ui/SideBar";
export default function App() {
  return (
    <AppLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <SideBar />
        </div>
        <div className="col-span-8">
          <PlayList />
        </div>
      </div>
    </AppLayout>
  );
}
