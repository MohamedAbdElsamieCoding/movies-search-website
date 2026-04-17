import { FaStar } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

import Badge from "./Badge";

const HeroGrid = () => {
  return (
    <section className="hero_grid">
      <div className="main_featured">
        <div className="card_content">
          <div className="badges_row">
            <Badge
              type="editorial"
              text="Featured Editorial"
              className="featured_badge"
            />
            <Badge
              type="rating"
              text="9.2"
              icon={<FaStar className="star_icon" />}
              className="rating_badge"
            />
          </div>
          <h2>The Neon Requiem</h2>
          <p className="text_truncate_2">
            A masterclass in atmospheric cinematography, exploring the digital
            soul of a crumbling metropolis.
          </p>
          <div className="view_btn">
            <a>View Editorial</a>
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="secondary_column">
        <div className="small_cards_wrapper">
          <div className="small_card_auteur">
            <h4>Auteur Classics</h4>
            <p>14 films explored</p>
          </div>
          <div className="small_card_auteur">
            <h4>Auteur Classics</h4>
            <p>14 films explored</p>
          </div>
        </div>
        <div className="ai_search_box">
          <h3>Cinematic AI Search</h3>
          <p>
            Describe a mood, a color, or a feeling, and our engine will find the
            frame.
          </p>
          <div className="search_input_container">
            <input
              type="text"
              placeholder="e.g. 'Melancholy sunset in Tokyo'"
            />
            <div className="ai_icon_wrapper">
              <TbSparkles />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroGrid;
