import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import VotePercentage, {
  FormatDate,
  getBackgroundColor,
  getBackgroundImage,
} from "../../shared";
import "./Carousel.scss";
import { motion } from "framer-motion";
import NotFound from "../../images/imageNotFound.png";

const Carousel = ({ data, type }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <Splide
      options={{
        perPage: 5,
        drag: "free",
        gap: "2rem",
        arrows: true,
        pagination: false,
      }}
    >
      {data.map((content) => {
        return (
          <SplideSlide key={content?.id} className="carousel-splide-wrapper">
            <motion.div
              className="mediaCard"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <div className="vote-bubble">
                <div
                  className="vote-bubble-outer"
                  title={VotePercentage(content?.vote_average) + "% Rating"}
                >
                  <div
                    className="border"
                    style={{
                      backgroundColor: `${getBackgroundColor(
                        VotePercentage(content?.vote_average)
                      )}`,
                      backgroundImage: `${getBackgroundImage(
                        VotePercentage(content?.vote_average)
                      )}`,
                    }}
                  >
                    <div className={`vote-bubble-inner`}>
                      <p className="vote">
                        {VotePercentage(content?.vote_average)}
                      </p>
                      <p className="percent-sign">%</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={`/${type}/${content?.id}`}>
                <img
                  src={imagePath + content?.poster_path}
                  alt=""
                  onError={(e) => (e.currentTarget.src = NotFound)}
                />
              </Link>
              <h2 className="title">
                {type === "movie" ? content?.title : content?.name}
              </h2>
              <p className="release">
                Release date:{" "}
                {FormatDate(
                  type === "movie"
                    ? content?.release_date
                    : content?.first_air_date
                )}
              </p>
            </motion.div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default Carousel;
