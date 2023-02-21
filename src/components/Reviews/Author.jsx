import { CheckAvatar } from "../../shared";
const Author = ({ avatar, username }) => {
  return (
    <div className="author">
      <img src={CheckAvatar(avatar)} alt={username} />
      <p>{username}</p>
    </div>
  );
};

export default Author;
