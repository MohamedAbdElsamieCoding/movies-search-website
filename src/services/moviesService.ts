import type { Video } from "../types/video.type";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getTrendingMovie = async (timeWindow: string) => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/${timeWindow}?language=en-US&api_key=${API_KEY}`,
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");

  return res.json();
};

export const getMovieCredits = async (movieId: number) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
};

export const getMovieTrailer = async (movieId: number) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  );
  const data = await res.json();
  const trailer = data.results.find(
    (vid: Video) => vid.type === "Trailer" && vid.site === "YouTube",
  );
  return trailer?.key;
};

