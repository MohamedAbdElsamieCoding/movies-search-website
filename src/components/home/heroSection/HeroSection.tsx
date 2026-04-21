import HeaderText from "./HeaderText";
import HeroGrid from "./HeroGrid";
import "./heroSection.css";

const HeroSection = () => {
  return (
    <section className="hero_section">
      <HeaderText />
      <HeroGrid />
    </section>
  );
};

export default HeroSection;
