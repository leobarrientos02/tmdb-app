import { BsFillCameraReelsFill } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { IoIosPerson } from "react-icons/io";
import "./ContentNotFound.scss";
const ContentNotFound = ({ content }) => {
  if (content === "Movie") {
    return (
      <div className="MovieNotFound">
        <BiMoviePlay size="1.5em" className="not-found-icon" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Show") {
    return (
      <div className="ShowNotFound">
        <BiMoviePlay size="1.5em" className="not-found-icon" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Season") {
    return (
      <div className="SeasonNotFound">
        <BiMoviePlay size="1.5em" className="not-found-icon" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "SeasonPreview") {
    return (
      <div className="SeasonPreviewNotFound">
        <BiMoviePlay size="1.5em" className="not-found-icon" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "EpisodePreview") {
    return (
      <div className="EpisodePreviewNotFound">
        <BiMoviePlay size="1.5em" className="not-found-icon" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Episode") {
    return (
      <div className="EpisodeNotFound">
        <BiMoviePlay size="1.5em" className="not-found-icon" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else if (content === "Company") {
    return (
      <div className="CompanyNotFound">
        <BsFillCameraReelsFill size="1.2em" />
      </div>
    );
  } else if (content === "CompanySearch") {
    return (
      <div className="CompanySearchNotFound">
        <BsFillCameraReelsFill size="1.2em" />
      </div>
    );
  } else if (content === "CompanyPage") {
    return (
      <div className="CompanyLogoNotFound">
        <BsFillCameraReelsFill className="not-found-icon" size="1.2em" />
        <p className="not-found-text">Company Logo Not Found</p>
      </div>
    );
  } else if (content === "Person") {
    return (
      <div className="PersonNotFound">
        <IoIosPerson size="1.5em" className="not-found-icon" />
      </div>
    );
  } else if (content === "PersonPage") {
    return (
      <div className="PersonPageNotFound">
        <IoIosPerson size="1.5em" className="not-found-icon" />
      </div>
    );
  } else if (content === "Creator") {
    return (
      <div className="CreatorNotFound">
        <IoIosPerson className="not-found-icon" />
      </div>
    );
  } else if (content === "MediaCredit") {
    return (
      <div className="MediaCreditNotFound">
        <BiMoviePlay size="1.5em" className="not-found-icon" />
        <p className="not-found-text">Image not found</p>
      </div>
    );
  } else {
    return (
      <div className="ContentNotFound">
        <p className="not-found-text">Image not found</p>
      </div>
    );
  }
};
export default ContentNotFound;
