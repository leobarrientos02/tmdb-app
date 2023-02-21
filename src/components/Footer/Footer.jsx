import Logo from "../../images/logo.svg";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <img src={Logo} alt="TMDB" />
      </a>
    </div>
  );
};
export default Footer;
