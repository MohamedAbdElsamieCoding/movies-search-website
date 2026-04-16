import { useState } from "react";
import "./navbar.css";
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";

const Navbar = () => {
  const [activeTap, setActiveTap] = useState("Discover");
  const navLinks = [
    { title: "Discover", link: "/" },
    { title: "Trending", link: "/Trending" },
    { title: "Favorites", link: "/Favorites" },
  ];
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="navbar_right">
            <h1>CINEEDITORIAL</h1>
            <ul className="nav_list">
              {navLinks.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    className={activeTap === item.title ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTap(item.title);
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar_left">
            <div className="search">
              <form action="search">
                <CiSearch className="search_icon" />
                <input type="text" placeholder="Search films, directors..." />
              </form>
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
