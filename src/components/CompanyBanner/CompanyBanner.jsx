import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./companyBanner.scss";
import NotFound from "../../images/imageNotFound.png";

const CompanyBanner = ({ company_id, language }) => {
  const [company, setCompany] = useState({});
  let imagePath = "https://image.tmdb.org/t/p/original";
  const getCompany = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/company/${company_id}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setCompany(res);
  };
  useEffect(() => {
    getCompany();
  });
  return (
    <motion.div
      className="company-banner"
      animate={{ x: 0 }}
      initial={{ x: "-100%" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="image">
        <img
          src={imagePath + company?.logo_path}
          alt={company?.name}
          onError={(e) => (e.currentTarget.src = NotFound)}
        />
      </div>
      <div className="details">
        <h2>{company?.name}</h2>
        <p>{company?.headquarters}</p>
        <a href={company?.homepage} target="_blank" rel="noreferrer">
          {company?.homepage}
        </a>
      </div>
    </motion.div>
  );
};

export default CompanyBanner;
