const PageComponent = ({ serverData, movePage }) => {
  const pageCSS = "h-full p-2 rounded";
  const prevComent = "PREV";
  const nextComent = "NEXT";

  return (
    <div className="text-sm text-center font-bold flex justify-center items-center">
      {serverData.prev ? (
        <div
          className={`${pageCSS} w-16 hover:bg-gray-600 hover:text-white`}
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
        <div className={`${pageCSS} w-16 text-gray-400`}>{prevComent}</div>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`${pageCSS} w-10 hover:bg-gray-600 hover:text-white
          ${serverData.currentPage === pageNum ? "bg-sky-400" : ""}`}
          onClick={() =>
            movePage({ page: pageNum, size: serverData.pageRequestDTO.size })
          }
        >
          {pageNum}
        </div>
      ))}

      {serverData.next ? (
        <div
          className={`${pageCSS} w-16 hover:bg-gray-600 hover:text-white`}
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
        <div className={`${pageCSS} w-16 text-gray-400`}>{nextComent}</div>
      )}
    </div>
  );
};

export default PageComponent;
