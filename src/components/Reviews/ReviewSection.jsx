import React, { useEffect, useState } from "react";
import { FormatLocaleDate } from "../../shared";
import Author from "./Author";
import "./reviews.scss";

const ReviewSection = ({ api_path, language }) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${api_path}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const res = await data.json();
    setReviews(res.results);
  };
  useEffect(() => {
    getReviews();
  });

  return (
    <div className="review-section">
      <h2 className="section-title">{reviews.length === 0 ? "" : "Reviews"}</h2>
      <div className="reviews">
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
    </div>
  );
};

export default ReviewSection;
