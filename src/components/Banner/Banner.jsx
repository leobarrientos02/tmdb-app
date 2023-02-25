import { motion } from "framer-motion";
import "./banner.scss";
import Search from "../Search/Search";

export function Banner() {
  return (
    <motion.div
      className="banner"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="banner-title">
        <h2 className="text-5xl font-semibold">Welcome.</h2>
        <h3 className="text-3xl font-semibold">
          Explore our large variety of movies.
        </h3>
        <Search location={"banner"} />
      </div>
    </motion.div>
  );
}
