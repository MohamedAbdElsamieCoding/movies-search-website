export type FavoriteID = number;
export interface FavoriteContextType {
  favorites: FavoriteID[];
  toggleFavorite: (id: FavoriteID) => void;
  isFavorite: (id: FavoriteID) => boolean;
}
