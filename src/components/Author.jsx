const Author = ({ avatar, username }) => {
  return (
    <div>
      <img src={avatar} alt={username} />
      <p>{username}</p>
    </div>
  );
};

export default Author;
