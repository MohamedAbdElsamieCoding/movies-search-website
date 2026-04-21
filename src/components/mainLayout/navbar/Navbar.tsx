import { useEffect, useState } from "react";
import "./navbar.css";
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";
import type { MovieCard } from "../../../types/movieCard.type";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    { title: "Discover", link: "/" },
    { title: "Trending", link: "/trending" },
    { title: "Favorites", link: "/favorites" },
  ];
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      const fetchMovies = async () => {
        try {
          setLoading(true);

          const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`,
          );
          const data = await res.json();
          const results = data.results;

          setResults(results || []);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      };
      fetchMovies();
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="navbar_left">
            <h1>AUTEUR CINEMA</h1>
            <ul className="nav_list">
              {navLinks.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.link}
                    className={location.pathname === item.link ? "active" : ""}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar_right">
            <div className="search">
              <form action="search" onSubmit={(e) => e.preventDefault()}>
                <CiSearch className="search_icon" />
                <input
                  type="text"
                  placeholder="Search films, directors..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
              {query && (
                <div className="search_dropdown">
                  {loading && <p>Loading...</p>}

                  {!loading && results.length === 0 && <p>No results</p>}

                  {results.slice(0, 6).map((item) => (
                    <div key={item.id} className="dropdown_item">
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                            : "/no-image.png"
                        }
                        alt=""
                      />
                      <span>{item.title || item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="icons">
              <CiSettings className="setting_icon" />
              <MdOutlineAccountCircle className="profile_icon" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
