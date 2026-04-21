import { useLocation, useNavigate } from "react-router-dom";
import "./authNavbar.css";
const AuthNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";
  return (
    <div className="auth_navbar">
      <div className="auth_navbar_left">
        <h1>AUTEUR CINEMA</h1>
      </div>
      <button
        className="login_btn"
        onClick={() => navigate(isLoginPage ? "/auth/register" : "/auth/login")}
      >
        {isLoginPage ? "Create Account": "Login"}
      </button>
    </div>
  );
};

export default AuthNavbar;
