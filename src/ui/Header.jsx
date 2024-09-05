import { RiPlayList2Fill } from "react-icons/ri";
const Header = () => {
  return (
    <nav
      className={`py-3 w-full bg-primary-500 transiton-all duration-100 ease-out z-20 shadow-lg backdrop-blur-2xl
    blur-0 opacity-100 sticky top-0 font-sans items-center px-2 gap-x-5 sm:px-5 flex justify-center font-black`}
    >
      <RiPlayList2Fill className="text-secondary-900 w-9 h-9" />
      <h1 className="text-3xl" style={{ fontFamily: "Protest Guerrilla" }}>
        Video PlayList
      </h1>
    </nav>
  );
};

export default Header;
