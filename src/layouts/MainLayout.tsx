import { Outlet } from "react-router-dom";
import Footer from "../components/mainLayout/footer/Footer";
import Navbar from "../components/mainLayout/navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
