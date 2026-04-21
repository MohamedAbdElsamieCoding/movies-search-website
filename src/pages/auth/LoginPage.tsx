import { useEffect, useState, type SyntheticEvent } from "react";
import ErrorBanner from "../../components/auth/ErrorBanner";
import PasswordField from "../../components/auth/PasswordField";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import "./authPages.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
        return () => clearTimeout(timer);
      }, 3000);
    }
  }, [error]);

  const handleLogin = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setError("No account found with this email");
            break;

          case "auth/wrong-password":
            setError("Incorrect password");
            break;

          case "auth/invalid-email":
            setError("Invalid email format");
            break;

          default:
            setError("Login failed");
        }
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_container">
      {error && <ErrorBanner message={error} />}

      <div className="auth_card">
        <img src="/src/imgs/bgCard4.png" alt="" className="card_bg" />

        <div className="card_content">
          <span className="badge">THE PREMIERE CLUB</span>
          <h1>
            Start your <br /> <span>Cinematic Journey</span>
          </h1>
          <p>
            Access exclusive editorial curations, early access to indie
            releases, and high-fidelity streaming masterworks.
          </p>
        </div>
        <div className="auth_form_side_login">
          <div className="header_form">
            <h2>Welcome Back</h2>
            <p className="subtitle">
              Sign in to continue your cinematic journey.
            </p>
          </div>
          <form className="login_form" onSubmit={handleLogin}>
            <div className="input_group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="cinephile@auteur.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="passwords_forms">
              <PasswordField
                label="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                visible={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />
            </div>
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
