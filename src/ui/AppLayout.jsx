import Footer from "./Footer";
import Header from "./Header";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />

      <div className=" bg-secondary-900 py-11 ">{children}</div>

      <Footer />
    </div>
  );
};

export default AppLayout;
