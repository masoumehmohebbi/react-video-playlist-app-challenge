const Header = () => {
  return (
    <nav
      className={`py-3 w-full bg-secondary-200 transiton-all duration-100 ease-out z-20 shadow-menu md:shadow-none backdrop-blur-2xl
    blur-0 opacity-100 sticky top-0 font-sans items-center px-2 sm:px-5 flex justify-center font-black`}
    >
      <h1 className="text-xl">Video PlayList</h1>
    </nav>
  );
};

export default Header;
