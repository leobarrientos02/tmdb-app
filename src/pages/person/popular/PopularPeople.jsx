import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { motion } from "framer-motion";
import "./popularPage.scss";
import { NullEmptyUndefinedChecker } from "../../../shared";
import ContentNotFound from "../../../components/NotFound/ContentNotFound";

const PopularPeople = ({ language }) => {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getPersons = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&language=${language}`
    );
    const res = await data.json();
    setTotal(res.total_pages > 500 ? 500 : res.total_pages);
    setPersons(res.results);
  };

  const pagination = (num) => {
    setPage(num);
  };

  useEffect(() => {
    getPersons();
  });
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="PopularPeoplePage"
    >
      <h2 className="page-title">Popular People</h2>
      <div className="page-grid">
        {persons.map((person) => {
          return (
            <Link to={`/person/${person.id}`} key={person.id} className="link">
              <motion.div whileHover={{ scale: 1.03 }} className="person">
                {NullEmptyUndefinedChecker(person?.profile_path) === false ? (
                  <ContentNotFound content="Person" />
                ) : (
                  <img
                    src={imagePath + person?.profile_path}
                    alt={person?.name}
                  />
                )}
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
      />
    </motion.div>
  );
};
export default PopularPeople;
