import { useNavigate } from "react-router";

const useMypageTag = () => {
  const navigate = useNavigate();

  const makeList = (data) => {
    return (
      <>
        <div className="w-full text-base text-nowrap flex flex-wrap justify-start items-start">
          {data.dtoList.length === 0 ? (
            <div className="w-full py-20 text-2xl">
              해당하는 게시물이 없습니다.
            </div>
          ) : (
            data.dtoList.map((dto, index) => (
              <div
                key={index}
                className={`w-[calc(100%/3-0rem)] h-[calc(100%/2-0rem)] p-4 border-2 border-gray-300 rounded-xl flex flex-col justify-center items-center space-y-4 ${
                  dto.link &&
                  "cursor-pointer hover:bg-gray-200 transition duration-500"
                }`}
                onClick={() =>
                  dto.mainCategory === "지역" && dto.link
                    ? window.open(dto.link)
                    : dto.link && navigate(dto.link)
                }
              >
                <div className="w-full flex justify-between items-center">
                  <div className="w-full text-xl">
                    {dto.title.length > 12
                      ? dto.title.slice(0, 12) + "..."
                      : dto.title}
                  </div>
                </div>

                <div className="w-full flex justify-center items-center space-x-2">
                  <div className="w-1/3">{dto.startDate}</div>
                  <div>~</div>
                  <div className="w-1/3">{dto.endDate}</div>
                </div>

                <div className="w-full text-sm flex justify-between items-center">
                  <div
                    className={`${
                      dto.mainCategory === "청년"
                        ? "bg-blue-500"
                        : dto.mainCategory === "기업"
                        ? "bg-red-500"
                        : dto.mainCategory === "지역"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } p-2 text-white`}
                  >
                    {dto.mainCategory} / {dto.subCategory}
                  </div>

                  {new Date() - new Date(dto.endDate) < 0 ? (
                    new Date() - new Date(dto.startDate) < 0 ? (
                      <div className="bg-blue-300 p-2 rounded-xl">진행 전</div>
                    ) : (
                      <div className="bg-green-300 p-2 rounded-xl">진행 중</div>
                    )
                  ) : !(dto.startDate && dto.endDate) ? (
                    <div className="bg-gray-300 p-2 rounded-xl">기간없음</div>
                  ) : (
                    <div className="bg-red-300 p-2 rounded-xl">종료</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  const makeSelect = (name, open, setOpen, list, setList, moveToList) => {
    return (
      <div className="flex flex-col justify-center items-center relative">
        <div
          className={`w-20 p-2 border-2 border-gray-300 rounded cursor-pointer hover:text-black transition duration-500`}
          onClick={() => setOpen({ ...open, [name]: !open[name] })}
        >
          {name}
        </div>
        {open[name] && (
          <div className="bg-white w-full mt-[.1rem] border text-sm flex flex-col justify-center items-center absolute top-10 left-0 z-10">
            {/* {name === "키워드" && (
              <input
                className="w-full p-2 border border-gray-500 rounded text-center"
                type="text"
                placeholder="입력 후 엔터"
                onKeyUp={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    setList({ ...list, [e.target.value.trim()]: true });
                    e.target.value = "";
                  }
                }}
              />
            )} */}
            {Object.keys(list).map((key) => (
              <div
                key={key}
                className="w-full border flex justify-center items-center"
              >
                <div
                  className={`w-full p-2 cursor-pointer transition duration-500 ${
                    list[key] ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => {
                    if (key === "전체") {
                      setList(
                        Object.fromEntries(
                          Object.keys(list).map((key) => [key, !list["전체"]])
                        )
                      );
                    } else {
                      const updatedList = { ...list, [key]: !list[key] };

                      if (name !== "키워드") {
                        updatedList["전체"] = Object.keys(updatedList)
                          .filter((key) => key !== "전체")
                          .every((key) => updatedList[key]);
                      }

                      setList(updatedList);
                    }
                    moveToList(1);
                  }}
                >
                  {key}
                </div>
                {/* {name === "키워드" && (
                  <div
                    className="w-4 ml-1 rounded-full text-base text-red-500 cursor-pointer"
                    onClick={() => {
                      const updatedList = { ...list };
                      delete updatedList[key];
                      setList(updatedList);
                    }}
                  >
                    x
                  </div>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const makeBookTab = (name, value, category, setCategory, moveToList) => {
    return (
      <div
        className={`w-20 p-2 border-2 rounded-full ${
          value === category
            ? "border-yellow-500"
            : "border-gray-300 cursor-pointer hover:border-yellow-500 transition duration-500"
        }`}
        onClick={() => {
          setCategory(value);
          moveToList(1);
        }}
      >
        {name}
      </div>
    );
  };

  const makeDocTab = (name, value, board, setBoard, isType, moveToList) => {
    return (
      <div
        className={`w-20 p-2 border-2 rounded-full ${
          (isType ? value === board.type : value === board.category)
            ? "border-yellow-500"
            : "border-gray-300 cursor-pointer hover:border-yellow-500 transition duration-500"
        }`}
        onClick={() => {
          isType
            ? setBoard({ ...board, type: value })
            : setBoard({ ...board, category: value });
          moveToList(1);
        }}
      >
        {name}
      </div>
    );
  };

  return { makeList, makeSelect, makeBookTab, makeDocTab };
};

export default useMypageTag;
