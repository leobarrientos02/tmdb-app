import Author from "./Author";

const Review = ({ username, avatar, date, content }) => {
  return (
    <div>
      <div>
        <Author username={username} avatar={avatar} />
        <p>Creation Date: {date}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Review;
