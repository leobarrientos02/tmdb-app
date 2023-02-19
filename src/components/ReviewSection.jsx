import React, { useEffect, useState } from "react";
import { FormatLocaleDate } from "../shared";
import Author from "./Author";
import "../styles/reviews.scss";

const ReviewSection = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const res = await data.json();
    setReviews(res.results);
  };
  useEffect(() => {
    getReviews(movieId);
  });

  return (
    <div className="reviews">
      <h2 className="section-title">Reviews</h2>
      {reviews?.map((review) => {
        return (
          <div className="review" key={review.id}>
            <div className="review-header">
              <Author
                username={review.author_details?.username}
                avatar={review.author_details?.avatar_path}
              />
              <p className="creation">
                Creation Date: {FormatLocaleDate(review.created_at)}
              </p>
            </div>
            <p className="content">{review.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewSection;
