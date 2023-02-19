import "../styles/banner.scss";
import { motion } from "framer-motion";
export function Banner() {
  return (
    <motion.div
      className="banner"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="banner-title">
        <h2 className="text-5xl font-semibold">Welcome.</h2>
        <h3 className="text-3xl font-semibold">
          Explore our large variety of movies.
        </h3>
      </div>
      {/* <form className="banner-search">
        <input
          className="banner-input"
          type="text"
          name="movie"
          id="search-text"
          placeholder="Search Movies"
        />
        <input className="banner-button" type="submit" value="Search" />
      </form> */}
    </motion.div>
  );
}
