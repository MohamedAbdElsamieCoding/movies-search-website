import "./footer.css";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiGlobalLine } from "react-icons/ri";

const Footer = () => {
  return (
    <section className="footer">
      <div className="brand_logo">
        <h4>AUTEUR CINEMA</h4>
        <p>© 2024 CINEEDITORIAL. THE DIGITAL AUTEUR EXPERIENCE.</p>
      </div>
      <div className="footer_links">
        <a href="#">PRIVACY POLICY</a>
        <a href="#">TERMS OF SERVICE</a>
        <a href="#">API DOCUMENTATION</a>
        <a href="#">CONTACT</a>
      </div>
      <div className="social_btns">
        <button>
          <RiGlobalLine />
        </button>
        <button>
          <IoShareSocialOutline />
        </button>
      </div>
    </section>
  );
};

export default Footer;
