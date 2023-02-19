import { CheckAvatar } from "../shared";
import "../styles/reviews.scss";
const Author = ({ avatar, username }) => {
  return (
    <div className="author">
      <img src={CheckAvatar(avatar)} alt={username} />
      <p>{username}</p>
    </div>
  );
};

export default Author;
