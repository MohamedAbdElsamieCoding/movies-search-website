import "./favoritePage.css";
import { useEffect, useState } from "react";
import { useFavorite } from "../../context/useFavorite";
import type { MovieCardType } from "../../types/movieCard.type";
import MovieCard from "../../components/MovieCard";
import FullScreenLoader from "../../components/FullScreenLoader";

const FavoritesPage = () => {
  const { favorites } = useFavorite();
  const [movies, setMovies] = useState<MovieCardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await Promise.all(
          favorites.map(async (id) => {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
            );
            if (!res.ok) throw Error("Failed to fetch movie");
            return res.json();
          }),
        );
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [favorites]);

  return (
    <>
      {loading && <FullScreenLoader />}
      {!loading && (
        <div className="favorite_page">
          <div className="movies_grid favorites_grid">
            {movies.length === 0 ? (
              <p>No favorites yet</p>
            ) : (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
