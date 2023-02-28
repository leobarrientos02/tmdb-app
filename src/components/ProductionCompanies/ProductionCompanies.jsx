import { Link } from "react-router-dom";
import { NullEmptyUndefinedChecker } from "../../shared";
import ContentNotFound from "../NotFound/ContentNotFound";
import "./productionCompanies.scss";
const ProductionCompanies = ({ data }) => {
  let imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="productionCompanies">
      <h2>
        {data.production_companies === undefined ||
        data.production_companies.length === 0
          ? ""
          : "Production Companies"}
      </h2>
      <div className="companies">
        {data?.production_companies?.map((company) => {
          return (
            <Link
              to={`/company/${company.id}`}
              className="company"
              key={company.id}
            >
              {NullEmptyUndefinedChecker(company.logo_path) === false ? (
                <ContentNotFound content="Company" />
              ) : (
                <img src={imagePath + company.logo_path} alt={company.name} />
              )}
              <h2>{company.name}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ProductionCompanies;
