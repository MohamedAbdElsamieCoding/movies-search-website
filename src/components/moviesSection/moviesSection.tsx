import "./moviesSection.css";
import { FaStar } from "react-icons/fa6";

const MoviesSection = () => {
  return (
    <div className="movies_section">
      <h2>Recent Discovery</h2>

      <div className="movies_grid">
        {[1, 2, 3, 4,5,6,7,8,9,10,11].map((movie) => (
          <div className="movie_card" key={movie}>
            <img src="/src/imgs/cover.png" alt="cover" />
            <div className="movie_info">
              <h4>The Last Nomad</h4>
              <div className="meta">
                <span>2023 • 124m</span>
                <div className="rating_section">
                  <FaStar className="star_icon" />
                  <span className="rating">8.4</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesSection;
