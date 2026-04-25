import { createContext } from "react";
import type { FavoriteContextType } from "../types/favorite.type";

export const FavoriteContext = createContext<FavoriteContextType | null>(null);
