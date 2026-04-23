import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { MovieCardType } from "../types/movieCard.type";

interface Props {
  movie: MovieCardType;
}
const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();
  const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  return (
    <div
      className="movie_card"
      key={movie.id}
      onClick={() => {
        navigate(`/movie/${movie.id}`);
      }}
    >
      <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
      <div className="movie_info">
        <h4>{movie.title}</h4>
        <div className="meta">
          <span>{movie.release_date.split("-")[0]}</span>
          <div className="rating_section">
            <FaStar className="star_icon" />
            <span className="rating">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
