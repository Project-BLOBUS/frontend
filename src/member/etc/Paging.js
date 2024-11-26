const Paging = ({ data, movePage }) => {
  const pageCSS = "h-full p-2 rounded-3xl";
  const prevComent = "이전";
  const nextComent = "다음";

  return (
    <div className="mt-4 text-base text-center font-bold flex justify-center items-center">
      {data.prev ? (
        <div
          className={`${pageCSS} w-16 text-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-500`}
          onClick={() =>
            movePage({
              page: data.prevPage,
              size: data.pageRequestDTO.size,
            })
          }
        >
          {prevComent}
        </div>
      ) : (
        <div className={`${pageCSS} opacity-0 w-16`}>{prevComent}</div>
      )}

      {data.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`${pageCSS} w-10
          ${
            data.currentPage === pageNum
              ? "bg-yellow-300 text-black font-bold"
              : "text-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-500"
          }`}
          onClick={() =>
            movePage({ page: pageNum, size: data.pageRequestDTO.size })
          }
        >
          {pageNum}
        </div>
      ))}

      {data.next ? (
        <div
          className={`${pageCSS} w-16 text-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-500`}
          onClick={() =>
            movePage({
              page: data.nextPage,
              size: data.pageRequestDTO.size,
            })
          }
        >
          {nextComent}
        </div>
      ) : (
        <div className={`${pageCSS} opacity-0 w-16`}>{nextComent}</div>
      )}
    </div>
  );
};

export default Paging;
