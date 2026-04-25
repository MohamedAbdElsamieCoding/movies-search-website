import { useState, type ReactNode } from "react";
import type { FavoriteID } from "../types/favorite.type";
import { FavoriteContext } from "./FavoriteContext";

interface Props {
  children: ReactNode;
}

export const FavoriteProvider = ({ children }: Props) => {
  const getStoredFavorites = (): number[] => {
    try {
      const data = localStorage.getItem("favorites");

      if (!data) return [];

      return JSON.parse(data);
    } catch (error) {
      console.warn(error);
      return [];
    }
  };
  const [favorites, setFavorites] = useState<FavoriteID[]>(() => {
    return getStoredFavorites();
  });

  const toggleFavorite = (id: FavoriteID) => {
    setFavorites((prev) => {
      let updated: FavoriteID[];

      if (prev.includes(id)) {
        updated = prev.filter((favId) => favId !== id);
      } else {
        updated = [...prev, id];
      }

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: FavoriteID): boolean => {
    return favorites.includes(id);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
