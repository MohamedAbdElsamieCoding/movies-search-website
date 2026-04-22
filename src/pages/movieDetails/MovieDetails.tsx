import "./movieDetails.css";
import { MdOutlineMovieCreation } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../../types/movieDetails.type";
import type { CastMember, CrewMember } from "../../types/credits.type";
import type { Review } from "../../types/review.type";

const MovieDetails = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [movieRes, creditsRes, reviewRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`),
        ]);
        const movieData = await movieRes.json();
        const creditsData = await creditsRes.json();
        const reviewData = await reviewRes.json();

        console.log(movieData);
        console.log(creditsData);
        console.log(reviewData);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 5));
        setCrew(creditsData.crew);
        setReviews(reviewData.results || []);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const director = crew.find((person) => person.job === "Director");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>No movie found</p>;
  }
  return (
    <div className="movie_details">
      <div className="movie_details_hero">
        <img
          src={
            movie?.backdrop_path
              ? `${import.meta.env.VITE_IMAGE_BASE_URL}${movie.backdrop_path}`
              : "/src/imgs/cover.png"
          }
          alt="cover"
          className="movie_cover"
        />
        <div className="overlay"></div>
        <div className="hero_details">
          <span>EDITOR'S CHOICE</span>
          <h1>{movie?.title}</h1>
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
            <p>{movie?.release_date?.split("-")[0]}</p>
            <p>{movie?.runtime} Minutes</p>
            <div className="movie_rating">
              <FaStar />
              <p>{movie?.vote_average?.toFixed(1)}</p>
            </div>
          </div>
          <div className="btns">
            <button className="trailer_btn">
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
      <div className="movie_details_layout">
        <div className="left_col">
          <div className="synopsis_section">
            <div className="section_header">
              <div className="line_left"></div>
              <span>SYNOPSIS</span>
            </div>
            <p className="synopsis_text">{movie?.overview}</p>
          </div>
          {reviews.length > 0 && (
            <div className="section_header">
              <div className="line_left"></div>
              <span>Reviews</span>
            </div>
          )}
          {reviews.slice(0, 5).map((review) => (
            <div key={review.id} className="review_card">
              <h4>{review.author}</h4>
              <p>{review.content.slice(0, 300)}...</p>
            </div>
          ))}
        </div>
        <div className="right_col">
          {cast.length > 0 && (
            <div className="section_header">
              <span>TOP CAST</span>
              <div className="line_right"></div>
            </div>
          )}
          {cast.map((actor) => (
            <div key={actor.id} className="cast_actors">
              <img
                src={
                  actor.profile_path
                    ? `${import.meta.env.VITE_IMAGE_BASE_URL}${actor.profile_path}`
                    : "/no-image.png"
                }
                alt={actor.name}
              />
              <div className="actor_details">
                <h4>{actor.name}</h4>
                <p>as {actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
