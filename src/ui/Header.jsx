import { RiPlayList2Fill } from "react-icons/ri";
const Header = () => {
  return (
    <nav
      className={`py-3 w-full bg-primary-500 transiton-all duration-100 ease-out z-20 shadow-lg backdrop-blur-2xl
    blur-0 opacity-100 sticky top-0 font-sans items-center px-2 gap-x-3 sm:px-5 flex justify-center font-black`}
    >
      <h1 className="text-[28px]">پلی لیست فیلم</h1>
      <RiPlayList2Fill className="text-secondary-900 w-9 h-9 absolute right-5" />
    </nav>
  );
};

export default Header;
