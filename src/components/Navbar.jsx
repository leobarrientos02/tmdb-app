import { Link } from "react-router-dom";
import Logo from "../images/logo.svg";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h1>
          <Link to="/">
            <img src={Logo} alt="TMDB" />
          </Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/category/popular" className="nav-link">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/category/now_playing" className="nav-link">
            Now Playing
          </Link>
        </li>
        <li>
          <Link to="/category/top_rated" className="nav-link">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/category/upcoming" className="nav-link">
            Upcoming
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
