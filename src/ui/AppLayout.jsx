import Footer from "./Footer";
import Header from "./Header";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="min-h-[89vh] bg-secondary-50">{children}</div>

      <Footer />
    </div>
  );
};

export default AppLayout;
