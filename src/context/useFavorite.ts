import { useContext } from "react";
import { FavoriteContext } from "./FavoriteContext";

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoriteProvider");
  return context;
};
