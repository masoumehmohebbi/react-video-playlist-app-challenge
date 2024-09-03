import Footer from "./Footer";
import Header from "./Header";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}

      <Footer />
    </div>
  );
};

export default AppLayout;
