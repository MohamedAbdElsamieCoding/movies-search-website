import "./index.css";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import TrendingPage from "./pages/TrendingPage";
import FavoritesPage from "./pages/FavoritesPage";
import AuthLayout from "./layouts/AuthLayout";
import MovieDetails from "./pages/movieDetails/MovieDetails";
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
