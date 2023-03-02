import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./Media.scss";
const Media = ({ id, mediaType }) => {
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [media, setMedia] = useState("backdrops");
  let imagePath = "https://image.tmdb.org/t/p/original";

  const getImages = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setBackdrops(res.backdrops);
    setPosters(res.posters);
  };

  const getVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setVideos(res.results);
  };

  useEffect(() => {
    getImages();
    getVideos();
  });
  return (
    <div className="media">
      <div className="media-nav">
        <h2>Media</h2>
        <h3
          onClick={() => setMedia("backdrops")}
          className={media === "backdrops" ? "media-active" : ""}
        >
          Backdrops
        </h3>
        <h3
          onClick={() => setMedia("posters")}
          className={media === "posters" ? "media-active" : ""}
        >
          Posters
        </h3>
        <h3
          onClick={() => setMedia("videos")}
          className={media === "videos" ? "media-active" : ""}
        >
          Videos
        </h3>
      </div>
      <div className={media === "backdrops" ? "backdrops" : "hide"}>
        <Splide
          options={{
            perPage: 3,
            drag: "free",
            gap: "1rem",
            arrows: false,
            pagination: true,
          }}
        >
          {backdrops?.map((backdrop) => {
            return (
              <SplideSlide key={backdrop?.file_path} className="backdrop">
                <a
                  href={imagePath + backdrop?.file_path}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={imagePath + backdrop.file_path} alt="" />
                </a>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      <div className={media === "posters" ? "posters" : "hide"}>
        <Splide
          options={{
            perPage: 5,
            drag: "free",
            gap: "1rem",
            arrows: false,
            pagination: true,
          }}
        >
          {posters?.map((poster) => {
            return (
              <SplideSlide key={poster?.file_path} className="poster">
                <a
                  href={imagePath + poster?.file_path}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={imagePath + poster.file_path} alt="" />
                </a>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      <div className={media === "videos" ? "videos" : "hide"}>
        <Splide
          options={{
            perPage: 4,
            drag: "free",
            gap: "1rem",
            arrows: false,
            pagination: true,
          }}
        >
          {videos?.map((video) => {
            return (
              <SplideSlide key={video.key}>
                <h2>{video.name}</h2>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};
export default Media;
