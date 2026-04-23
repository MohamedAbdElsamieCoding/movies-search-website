import { useEffect, useState } from "react";
import { getMovieCredits, getTrendingMovie } from "../services/moviesService";
import type { CrewMember } from "../types/credits.type";
import type { MovieResult } from "../types/trendingMovie.type";
import type { MovieCardType } from "../types/movieCard.type";

export const useMovies = () => {
  const [loading, setLoading] = useState({
    movie: false,
    crew: false,
    weekly: false,
  });
  const [movie, setMovie] = useState<MovieResult[]>([]);
  const [movieCard, setMovieCard] = useState<MovieCardType[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieResult | null>(null);
  const [crew, setCrew] = useState<CrewMember[]>([]);

  useEffect(() => {
    const trendingMovie = async () => {
      try {
        setLoading((prev) => ({ ...prev, movie: true }));
        const data = await getTrendingMovie("day");
        setMovie(data.results);
        setSelectedMovie(data.results[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((prev) => ({ ...prev, movie: false }));
      }
    };
    trendingMovie();
  }, []);

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        if (!selectedMovie) return;
        setLoading((prev) => ({ ...prev, crew: true }));
        const data = await getMovieCredits(selectedMovie.id);
        setCrew(data.crew);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((prev) => ({ ...prev, crew: false }));
      }
    };

    fetchCrew();
  }, [selectedMovie]);
  useEffect(() => {
    const fetchWeeklyTrend = async () => {
      try {
        setLoading((prev) => ({ ...prev, weekly: true }));
        const data = await getTrendingMovie("week");
        setMovieCard(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading((prev) => ({ ...prev, weekly: false }));
      }
    };
    fetchWeeklyTrend();
  }, []);

  return {
    movie,
    selectedMovie,
    movieCard,
    loading,
    crew,
    setSelectedMovie,
  };
};
