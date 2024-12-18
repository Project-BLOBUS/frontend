const Paging = ({ data, movePage }) => {
  const pageCSS = "h-full p-2 rounded-3xl";
  const prevComent = "<";
  const nextComent = ">";

  return (
    <div className="mt-2 text-base text-center font-bold flex justify-center items-center">
      {data.prev ? (
        <div
          className={`${pageCSS} w-16 text-gray-300 cursor-pointer hover:text-black transition duration-500`}
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
              ? "text-black font-bold"
              : "text-gray-300 cursor-pointer hover:text-black transition duration-500"
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
          className={`${pageCSS} w-16 text-gray-300 cursor-pointer hover:text-black transition duration-500`}
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
