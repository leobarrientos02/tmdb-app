import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { motion } from "framer-motion";
import "../../styles/popularPage.scss";

const PopularPeople = () => {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getPersons = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    const res = await data.json();
    setTotal(res.total_pages > 500 ? 500 : res.total_pages);
    setPersons(res.results);
  };

  const pagination = (num) => {
    // scrollToTop();
    setPage(num);
  };

  useEffect(() => {
    getPersons();
  });
  return (
    <div className="PopularPeoplePage">
      <h2 className="page-title">Popular People</h2>
      <div className="page-grid">
        {persons.map((person) => {
          return (
            <Link to={`/person/${person.id}`} key={person.id} className="link">
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="person"
              >
                <img src={imagePath + person?.profile_path} alt="" />
                <h2>{person?.name}</h2>
                <p>{person?.known_for_department}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <Pagination
        param={""}
        page={page}
        total={total}
        pagination={pagination}
        type={"OneParameter"}
      />
    </div>
  );
};
export default PopularPeople;
