import { Outlet } from "react-router-dom";
import Footer from "../components/mainLayout/footer/Footer";
import AuthNavbar from "../components/auth/AuthNavbar";

const AuthLayout = () => {
  return (
    <div className="auth_layout">
      <AuthNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
