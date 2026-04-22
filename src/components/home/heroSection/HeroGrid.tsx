import { FaStar } from "react-icons/fa";
import { TbSparkles } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

import Badge from "./Badge";
import { useEffect, useState } from "react";
import type { MovieCard } from "../../../types/movieCard.type";
import type { Genre } from "../../../types/genre.type";
import { useNavigate } from "react-router-dom";

const HeroGrid = () => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const navigate = useNavigate();

  const [moviesList, setMoviesList] = useState<MovieCard[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<MovieCard | null>(null);

  const getPopularMovies = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`,
    );
    if (!res.ok) throw new Error("Failed to fetch movies");
    const data = await res.json();

    return data.results;
  };
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getPopularMovies();
        setMoviesList(movies);
        setFeaturedMovie(movies[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const [categories, setCategories] = useState<Genre[]>([]);
  const getGenre = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`,
    );
    if (!res.ok) throw new Error("Failed to fetch genres");
    const data = await res.json();
    return data.genres;
  };
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getGenre();
        setCategories(genres);
        console.log(genres);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []);

  const genreImages: Record<string, string> = {
    Action: "/src/imgs/action.jpg",
    Comedy: "/src/imgs/comedy.jpg",
    Drama: "/src/imgs/drama.jpg",
    Horror: "/src/imgs/horror.jpg",
    Adventure: "/src/imgs/adventure.jpg",
  };

  return (
    <section className="hero_grid">
      <div className="main_featured">
        <img
          src={
            featuredMovie?.backdrop_path
              ? `${IMAGE_URL}${featuredMovie.backdrop_path}`
              : "/src/imgs/gray-background.png"
          }
          alt={featuredMovie?.title || "movie"}
          className="hero_bg"
        />
        <div className="overlay" />

        <div className="card_content">
          <div className="badges_row">
            <Badge
              type="editorial"
              text={featuredMovie?.title ?? "Loading..."}
              className="featured_badge"
            />
            <Badge
              type="rating"
              text={
                featuredMovie?.vote_average
                  ? featuredMovie.vote_average.toFixed(1)
                  : "N/A"
              }
              icon={<FaStar className="star_icon" />}
              className="rating_badge"
            />
          </div>
          <h2>{featuredMovie?.title}</h2>
          <p className="text_truncate_2">{featuredMovie?.overview}</p>
          <div className="view_btn">
            <a>View Editorial</a>
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="secondary_column">
        <div className="small_cards_wrapper">
          {categories.slice(0, 2).map((cat) => (
            <div
              key={cat.id}
              className="small_card_auteur"
              onClick={() => {
                navigate(``);
              }}
            >
              <img
                src={genreImages[cat.name] || "/src/imgs/bgCard.png"}
                alt={cat.name}
                className="card_bg"
              />
              <div className="card_overlay">
                <h4>{cat.name}</h4>
                <p>Explore films</p>
              </div>
            </div>
          ))}
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
