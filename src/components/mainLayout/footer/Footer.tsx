import "./footer.css";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiGlobalLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Cine Editorial",
        url: window.location.href,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="footer">
      <div className="brand_logo">
        <h4>AUTEUR CINEMA</h4>
        <p>© {new Date().getFullYear()} CINEEDITORIAL. THE DIGITAL AUTEUR EXPERIENCE.</p>
      </div>
      <div className="footer_links">
        <Link to="#">PRIVACY POLICY</Link>
        <Link to="#">TERMS OF SERVICE</Link>
        <Link to="#">API DOCUMENTATION</Link>
        <Link to="#">CONTACT</Link>
      </div>
      <div className="social_btns">
        <button>
          <RiGlobalLine />
        </button>
        <button>
          <IoShareSocialOutline onClick={handleShare} />
        </button>
      </div>
    </section>
  );
};

export default Footer;
