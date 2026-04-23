import "./moviesSection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import type { MovieCardType } from "../../../types/movieCard.type";
import MovieCard from "../../MovieCard";

const MoviesSection = () => {
  const URL = `${import.meta.env.VITE_BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`;

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scroll = (direction: string) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollAmount = 300;
    if (direction === "left") {
      slider.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      slider.scrollLeft += scrollAmount;
    }
  };
  const [movieList, setMovieList] = useState<MovieCardType[]>([]);
  const getMovies = async () => {
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error("Failed to fetch movies");
      const json = await res.json();
      setMovieList(json.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    getMovies();
  });
  return (
    <div className="movies_section">
      <h2>Recent Discovery</h2>

      <div className="slider_wrapper">
        <button className="arrow_btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>
        <div className="movies_grid" ref={sliderRef}>
          {movieList.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        <button className="arrow_btn right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MoviesSection;
