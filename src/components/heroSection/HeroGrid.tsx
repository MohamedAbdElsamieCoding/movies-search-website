import { FaStar } from "react-icons/fa";
import Badge from "./Badge";

const HeroGrid = () => {
  return (
    <section>
      <div className="main_card">
        <div className="card_content">
          <div className="badges_row">
            <Badge  text="Featured Editorial" />
            <Badge text="9.2" icon={<FaStar />} />
          </div>
          <h2>The Neon Requiem</h2>
          <p>A masterclass in atmospheric cinematography...</p>
          <button className="view_btn">View Editorial</button>
        </div>
      </div>
    </section>
  );
};

export default HeroGrid;
