import "./authPages.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useEffect, useState, type SyntheticEvent } from "react";
import { FirebaseError } from "firebase/app";
import PasswordField from "../../components/auth/PasswordField";
import ErrorBanner from "../../components/auth/ErrorBanner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const validation = () => {
    if (!email || !password || !confirmPassword) {
      return "All fields are required";
    }
    if (!email.includes("@")) {
      return "Invalid email format";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleRegister = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setError("");
    const validationError = validation();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/",{replace:true});
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email already registered");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email");
            break;
          case "auth/weak-password":
            setError("Password is too weak");
            break;
          default:
            setError("Something went wrong");
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
        <img src="/imgs/bgCard4.png" alt="" className="card_bg" />

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
        <div className="auth_form_side">
          <div className="header_form">
            <h2>Create Account</h2>
            <p className="subtitle">
              Join the circle of digital auteurs today.
            </p>
          </div>
          <form className="register_form" onSubmit={handleRegister}>
            <div className="input_group">
              <label>FULL NAME</label>
              <input type="text" placeholder="Federico Fellini" />
            </div>
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
              <PasswordField
                label="CONFIRM PASSWORD"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                visible={showConfirmPassword}
                toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
