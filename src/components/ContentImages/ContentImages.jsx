import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import NotFound from "../../images/imageNotFound.png";
import "./contentImages.scss";
import { motion } from "framer-motion";

const ContentImages = ({ api_path }) => {
  const [images, setImages] = useState([]);
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getImages = async () => {
    const data = await fetch(
      `${process.env.REACT_APP_API_URL}${api_path}/images?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setImages(res.backdrops);
  };
  useEffect(() => {
    getImages();
  });
  if (images !== undefined) {
    return (
      <div className="ContentImages">
        <h2>Images</h2>
        <Splide
          options={{
            perPage: 3,
            drag: "free",
            gap: "2rem",
            arrows: false,
            pagination: true,
          }}
        >
          {images?.map((image) => {
            return (
              <SplideSlide
                key={image?.file_path}
                className="content-card-wrapper"
              >
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
  } else {
    return <div></div>;
  }
};
export default ContentImages;
