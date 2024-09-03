import Footer from "./Footer";
import Header from "./Header";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="min-h-[81vh]">{children}</div>

      <Footer />
    </div>
  );
};

export default AppLayout;
