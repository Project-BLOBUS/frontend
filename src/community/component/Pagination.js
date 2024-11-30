import React from "react";

const Pagination = ({ currentPage, totalPage, movePage }) => {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => movePage(currentPage - 1)}
      >
        이전
      </button>
      <span>
        {currentPage} / {totalPage}
      </span>
      <button
        disabled={currentPage === totalPage}
        onClick={() => movePage(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
