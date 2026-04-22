import { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";
import type { MovieCard } from "../../../types/movieCard.type";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
  const searchRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav>
        <div className="navbar">
          <div className="navbar_left">
            <h1 onClick={() => navigate("/")}>AUTEUR CINEMA</h1>
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
            <div className="search" ref={searchRef}>
              <form action="search" onSubmit={(e) => e.preventDefault()}>
                <CiSearch className="search_icon" />
                <input
                  type="text"
                  value={query}
                  placeholder="Search films, directors..."
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <IoClose
                    className="clear_icon"
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                    }}
                  />
                )}
              </form>
              {query && (
                <div className="search_dropdown">
                  {loading && <p>Loading...</p>}

                  {!loading && results.length === 0 && <p>No results</p>}

                  {results.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="dropdown_item"
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                        navigate(`/movie/${item.id}`);
                      }}
                    >
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
