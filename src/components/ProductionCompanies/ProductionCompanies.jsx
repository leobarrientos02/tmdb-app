import { Link } from "react-router-dom";
import NotFound from "../../images/imageNotFound.png";
import "./productionCompanies.scss";
const ProductionCompanies = ({ res, type }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="productionCompanies">
      <h2>
        {res.production_companies === undefined ||
        res.production_companies.length === 0
          ? ""
          : "Production Companies"}
      </h2>
      <div className="companies">
        {res?.production_companies?.map((company) => {
          return (
            <Link
              to={`/${type}/company/${company.id}`}
              className="company"
              key={company.id}
            >
              <img
                src={imagePath + company.logo_path}
                alt=""
                onError={(e) => (e.currentTarget.src = NotFound)}
              />
              <h2>{company.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ProductionCompanies;
