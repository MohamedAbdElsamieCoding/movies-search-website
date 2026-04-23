import { Outlet } from "react-router-dom";
import Footer from "../components/mainLayout/footer/Footer";
import Navbar from "../components/mainLayout/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="app_layout">
      <Navbar />
      <main className="app_content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
