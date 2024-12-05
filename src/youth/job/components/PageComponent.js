const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="m-6 flex justify-center">
      {serverData.prev ? (
        <div
          className="m-2 p-2 text-center font-bold cursor-pointer"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev{" "}
        </div>
      ) : (
        <></>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 p-2 text-center cursor-pointer ${
            serverData.current === pageNum
              ? "text-[#6F00FF] font-bold"
              : "text-gray-600"
          }`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {serverData.next ? (
        <div
          className="m-2 p-2 text-center font-bold cursor-pointer"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PageComponent;
