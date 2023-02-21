import "./banner.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export function Banner() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setInput("");
  };
  return (
    <motion.div
      className="banner"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="banner-title">
        <h2 className="text-5xl font-semibold">Welcome.</h2>
        <h3 className="text-3xl font-semibold">
          Explore our large variety of movies.
        </h3>
      </div>
      <form onSubmit={submitHandler} className="search">
        <input
          className="search-input"
          type="text"
          required
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Search Movies, TV Shows, or People"
        />
        <input className="search-btn" type="submit" value="Search" />
      </form>
    </motion.div>
  );
}
