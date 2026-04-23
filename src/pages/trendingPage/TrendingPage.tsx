import { MdOutlineMovieCreation } from "react-icons/md";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import TrailerModal from "../../components/TrailerModal";
import { useMovies } from "../../hooks/useMovies";
import { getMovieTrailer } from "../../services/moviesService";
import MovieCard from "../../components/MovieCard";
import "./trendingPage.css";
import FullScreenLoader from "../../components/FullScreenLoader";

const TrendingPage = () => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const { selectedMovie, crew, loading, movieCard } = useMovies();

  const director = crew.find((person) => person.job === "Director");

  const handleTrailer = async () => {
    if (!selectedMovie) return;
    const key = await getMovieTrailer(selectedMovie.id);
    setTrailerKey(key || null);
  };

  const sliderRef = useRef<HTMLDivElement | null>(null);
  type Direction = "left" | "right";

  const scroll = (direction: Direction) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollAmount = 300;
    if (direction === "left") {
      slider.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      slider.scrollLeft += scrollAmount;
    }
  };
  const isLoading = loading.movie || loading.crew || loading.weekly;
  return (
    <>
      {(loading.movie || loading.crew || loading.weekly) && (
        <FullScreenLoader />
      )}
      {!isLoading && selectedMovie && (
        <div>
          {trailerKey && (
            <TrailerModal
              onClose={() => setTrailerKey(null)}
              trailerKey={trailerKey}
            />
          )}

          <div className="movie_details_hero">
            <img
              src={
                selectedMovie?.backdrop_path
                  ? `${import.meta.env.VITE_IMAGE_BASE_URL}${selectedMovie.backdrop_path}`
                  : "/src/imgs/cover.png"
              }
              alt="cover"
              className="movie_cover"
            />
            <div className="overlay"></div>
            <div className="hero_details">
              <span>EDITOR'S CHOICE</span>
              <h1>{selectedMovie?.title}</h1>
              <div className="movie_direct">
                <div className="director">
                  <MdOutlineMovieCreation className="icon" />
                  <p>
                    Directed by
                    <span className="director_name">
                      {director?.name || "Unknown"}
                    </span>
                  </p>
                </div>
                <p>{selectedMovie?.release_date?.split("-")[0]}</p>
                <div className="movie_rating">
                  <FaStar />
                  <p>{selectedMovie?.vote_average?.toFixed(1)}</p>
                </div>
              </div>
              <div className="btns">
                <button className="trailer_btn" onClick={handleTrailer}>
                  <FaPlay className="play_btn" />
                  <p>Watch Trailer</p>
                </button>
                <button className="favorite_btn">
                  <CiHeart className="heart_btn" />
                  <p>Add to Favorites</p>
                </button>
              </div>
            </div>
          </div>

          <div className="most_trendy">
            <div className="head_trend">
              <h1>Cinematic Pulse</h1>
              <p>
                The most discussed frames this week, curated by our editors.
              </p>
            </div>
            <div className="slider_wrapper">
              <button>
                <FaChevronLeft
                  className="arrow_btn left"
                  onClick={() => {
                    scroll("left");
                  }}
                />
              </button>
              <div className="trend_movies" ref={sliderRef}>
                {movieCard.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <button>
                <FaChevronRight
                  className="arrow_btn right"
                  onClick={() => {
                    scroll("right");
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingPage;
