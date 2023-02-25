import "./pagination.scss";
const Pagination = ({ param, page, total, pagination }) => {
  let pages = Array.from(Array(total), (_, i) => i + 1);
  return (
    <div>
      <div className="pagination-container">
        <div className="pagination">
          <button
            className={page === 1 ? "block-link" : "pagination-btn"}
            onClick={() => pagination(page - 1)}
          >
            {"<"} Previous
          </button>
          <div className={total > 20 ? "numbers-large" : "numbers-small"}>
            {pages.map((i) => {
              return (
                <button
                  className={page === i ? "current-link" : "pagination-btn"}
                  onClick={() => pagination(i)}
                  key={i}
                >
                  {i}
                </button>
              );
            })}
          </div>
          <button
            className={page === total ? "block-link" : "pagination-btn"}
            onClick={() => pagination(page + 1)}
          >
            Next {">"}
          </button>
        </div>
      </div>
      <p className="current-pagenum">Current Page: {page}</p>
    </div>
  );
};

export default Pagination;
