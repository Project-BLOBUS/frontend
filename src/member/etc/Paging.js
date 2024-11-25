const Paging = ({ serverData, movePage }) => {
  const pageCSS = "h-full p-2 rounded-3xl";
  const prevComent = "이전";
  const nextComent = "다음";

  return (
    <div className="mt-4 text-base text-center font-bold flex justify-center items-center">
      {serverData.prev ? (
        <div
          className={`${pageCSS} w-16 text-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-500`}
          onClick={() =>
            movePage({
              page: serverData.prevPage,
              size: serverData.pageRequestDTO.size,
            })
          }
        >
          {prevComent}
        </div>
      ) : (
        <div className={`${pageCSS} opacity-0 w-16`}>{prevComent}</div>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`${pageCSS} w-10
          ${
            serverData.currentPage === pageNum
              ? "bg-yellow-300 text-black font-bold"
              : "text-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-500"
          }`}
          onClick={() =>
            movePage({ page: pageNum, size: serverData.pageRequestDTO.size })
          }
        >
          {pageNum}
        </div>
      ))}

      {serverData.next ? (
        <div
          className={`${pageCSS} w-16 text-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-500`}
          onClick={() =>
            movePage({
              page: serverData.nextPage,
              size: serverData.pageRequestDTO.size,
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
