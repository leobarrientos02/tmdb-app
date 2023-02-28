import { BsFilePerson } from "react-icons/bs";
import "./ContentNotFound.scss";
const ContentNotFound = ({ content }) => {
  if (content === "Person") {
    return (
      <div className="PersonNotFound">
        <BsFilePerson size="2em" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Movie") {
    return (
      <div className="MovieNotFound">
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Show") {
    return (
      <div className="ShowNotFound">
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "PersonCredit") {
    return (
      <div className="PersonCreditNotFound">
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Season") {
    return (
      <div className="SeasonNotFound">
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Episode") {
    return (
      <div className="Episode">
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else {
    return (
      <div className="ContentNotFound">
        <p className="not-found-text">{content} was not found</p>
      </div>
    );
  }
};
export default ContentNotFound;
