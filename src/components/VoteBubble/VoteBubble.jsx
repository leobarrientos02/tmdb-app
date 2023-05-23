import VotePercentage, { getBackgroundColor } from "../../shared";
import "./voteBubble.scss";
const VoteBubble = ({ vote }) => {
  const formatVote = VotePercentage(vote);
  getBackgroundColor(formatVote);
  return (
    <div
      className="vote-bubble-outer"
      title={VotePercentage(vote) + "% Rating"}
    >
      <div className="border">
        <div className={`vote-bubble-inner`}>
          <p className="vote">{VotePercentage(vote)}</p>
          <p className="percent-sign">%</p>
        </div>
      </div>
    </div>
  );
};

export default VoteBubble;
