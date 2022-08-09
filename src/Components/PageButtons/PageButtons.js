import "./PageButtons.css";

const PageButtons = ({
  deleteRows,
  currentPage,
  pages,
  handleFirstPage,
  handlePrevBtn,
  minLimit,
  maxLimit,
  handleClick,
  handleNextBtn,
  handleLastPage,
}) => {
  return (
    <div className="del-page-btn">
      <button className="del-btn" onClick={deleteRows}>
        Delete Selected
      </button>
      <div className="page-btn">
        <button
          disabled={currentPage === pages[0] ? true : false}
          className={currentPage === pages[0] ? "disable" : "notactive"}
          onClick={handleFirstPage}
        >
          {"<<"}
        </button>
        <button
          disabled={currentPage === pages[0] ? true : false}
          className={currentPage === pages[0] ? "disable" : "notactive"}
          onClick={handlePrevBtn}
        >
          {"<"}
        </button>
        {pages.map((item) => {
          if (item > minLimit && item < maxLimit + 1) {
            return (
              <button
                key={item}
                id={item}
                className={currentPage === item ? "active" : "notactive"}
                onClick={(event) => handleClick(event)}
              >
                {item}
              </button>
            );
          } else {
            return null;
          }
        })}
        <button
          disabled={currentPage === pages[pages.length - 1] ? true : false}
          className={
            currentPage === pages[pages.length - 1] ? "disable" : "notactive"
          }
          onClick={handleNextBtn}
        >
          {">"}
        </button>
        <button
          disabled={currentPage === pages[pages.length - 1] ? true : false}
          className={
            currentPage === pages[pages.length - 1] ? "disable" : "notactive"
          }
          onClick={handleLastPage}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default PageButtons;
