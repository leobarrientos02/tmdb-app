import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import NotFound from "../../images/imageNotFound.png";
import "./contentImages.scss";
import { motion } from "framer-motion";

const ContentImages = ({ url }) => {
  const [images, setImages] = useState([]);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getImages = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${url}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setImages(res.backdrops);
  };
  useEffect(() => {
    getImages();
  });
  return (
    <div className="ContentImages">
      <h2>Images</h2>
      <Splide
        options={{
          perPage: 4,
          drag: "free",
          gap: "2rem",
          arrows: true,
          pagination: false,
        }}
      >
        {images?.map((image) => {
          return (
            <SplideSlide key={image?.file_path}>
              <motion.img
                src={imagePath + image?.file_path}
                alt=""
                onError={(e) => (e.currentTarget.src = NotFound)}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
export default ContentImages;