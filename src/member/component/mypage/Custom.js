import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getCustom } from "../../api/mypageAPI";
import useCustomMove from "../../hook/useCustomMove";
import Loading from "../../etc/Loading";
import Paging from "../../etc/Paging";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  pageSize: 0,
  prevPage: 0,
  nextPage: 0,
  currentPage: 0,
};

const Custom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { page, size, moveToList } = useCustomMove("mypage/custom");

  const [data, setData] = useState(initState);

  const [open, setOpen] = useState({
    청년: false,
    기업: false,
    지역: false,
    키워드: false,
  });

  const [yList, setYList] = useState({
    전체: true,
    일자리: true,
    구인: true,
    주거: true,
    금융: true,
    교육: true,
    창업: true,
  });

  const [eList, setEList] = useState({
    전체: true,
    기업1: true,
    기업2: true,
    기업3: true,
  });

  const [rList, setRList] = useState({
    전체: true,
    문화: true,
    지원: true,
  });

  const [kList, setKList] = useState([]);

  useEffect(() => {
    setLoading(true);

    const yListStr = Object.entries(yList)
      .filter(([key, value]) => value === true && key !== "전체")
      .map(([key]) => key)
      .join("/");

    const eListStr = Object.entries(eList)
      .filter(([key, value]) => value === true && key !== "전체")
      .map(([key]) => key)
      .join("/");

    const rListStr = Object.entries(rList)
      .filter(([key, value]) => value === true && key !== "전체")
      .map(([key]) => key)
      .join("/");

    const kListStr = Object.entries(kList)
      .filter(([key, value]) => value === true && key !== "전체")
      .map(([key]) => key)
      .join("/");

    getCustom({ page, size }, yListStr, eListStr, rListStr, kListStr)
      .then((data) => {
        if (data.error) {
          setData(initState);
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.", { toastId: "e" });
        } else {
          toast.error("데이터를 불러오는데 실패했습니다.", { toastId: "e" });
        }
      });

    setLoading(false);
  }, [page, size, yList, eList, rList, kList]);

  const printDateTime = (dateTime) => {
    const year = dateTime.split("T")[0].split("-")[0];
    const month = dateTime.split("T")[0].split("-")[1];
    const date = dateTime.split("T")[0].split("-")[2];

    const hour = dateTime.split("T")[1].split(":")[0];
    const min = dateTime.split("T")[1].split(":")[1];

    const diff = new Date() - new Date(dateTime);

    if (diff > 365 * 24 * 60 * 60 * 1000) {
      return year + "-" + month + "-" + date;
    } else if (diff > 14 * 24 * 60 * 60 * 1000) {
      return month + "-" + date;
    } else if (diff > 24 * 60 * 60 * 1000) {
      return Math.round(diff / 24 / 60 / 60 / 1000, 0) + "일 전";
    } else {
      return hour + ":" + min;
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full py-4 text-3xl text-left flex justify-between items-center">
          커스텀
        </div>

        <div className="w-full border-b-4 border-gray-500 text-base flex justify-start items-center space-x-4">
          {makeSelect("청년", open, setOpen, yList, setYList, moveToList)}
          {makeSelect("기업", open, setOpen, eList, setEList, moveToList)}
          {makeSelect("지역", open, setOpen, rList, setRList, moveToList)}
          {makeSelect("키워드", open, setOpen, kList, setKList, moveToList)}
        </div>

        <div className="bg-gray-200 w-full h-[50px] py-2 border-b-4 border-gray-500 text-base flex justify-center items-center">
          목록
        </div>

        <div className="w-full h-[420px] text-base text-nowrap flex flex-wrap justify-start items-start">
          {data.dtoList.length === 0 ? (
            <div className="w-full py-20 text-2xl">해당 게시물이 없습니다.</div>
          ) : (
            data.dtoList.map((dto) => (
              <div
                key={dto.id}
                className={`w-[calc(100%/3-1rem)] h-[calc(100%/2-1rem)] mx-2 mt-2 p-4 border-2 border-gray-400 rounded-xl flex flex-col justify-center items-center space-y-4 cursor-pointer hover:bg-gray-300 transition duration-500`}
                onClick={() => navigate()}
              >
                <div className="w-full flex justify-between items-center">
                  <div className="w-full text-2xl text-left">{dto.title}</div>
                  <div>{printDateTime(dto.createdAt)}</div>
                </div>

                <div className="w-full text-sm text-left">{dto.content}</div>

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

        <div>
          <Paging data={data} movePage={moveToList} />
        </div>
      </div>
    </>
  );
};

const makeSelect = (name, open, setOpen, list, setList, moveToList) => {
  const bgColor = {
    청년: [
      "bg-blue-500 hover:bg-blue-300",
      "bg-blue-500 ",
      "hover:bg-blue-500",
    ],
    기업: ["bg-red-500 hover:bg-red-300", "bg-red-500 ", "hover:bg-red-500"],
    지역: [
      "bg-green-500 hover:bg-green-300",
      "bg-green-500 ",
      "hover:bg-green-500",
    ],
    키워드: [
      "bg-orange-500 hover:bg-orange-300",
      "bg-orange-500 ",
      "hover:bg-orange-500",
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div
        className={`${bgColor[name][0]} w-28 p-2 border-gray-500 rounded-t-xl text-white cursor-pointer hover:text-black transition duration-500`}
        onClick={() => setOpen({ ...open, [name]: !open[name] })}
      >
        {name}
      </div>
      {open[name] && (
        <div className="bg-white w-full p-2 border-2 rounded-b text-xs flex flex-col justify-center items-center space-y-1 absolute top-10 left-0 z-10">
          {name === "키워드" && (
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
          )}
          {Object.keys(list).map((y) => (
            <div className="w-full flex justify-center items-center">
              <div
                key={y}
                className={`w-full p-2 rounded-xl cursor-pointer transition duration-500 ${
                  list[y]
                    ? `${bgColor[name][1]} text-white hover:bg-black hover:text-red-500`
                    : `${bgColor[name][2]} bg-gray-500 text-gray-300 hover:text-white`
                }`}
                onClick={() => {
                  if (y === "전체") {
                    setList(
                      Object.fromEntries(
                        Object.keys(list).map((key) => [key, !list["전체"]])
                      )
                    );
                  } else {
                    const updatedList = { ...list, [y]: !list[y] };

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
                {y}
              </div>
              {name === "키워드" && (
                <div
                  className="w-4 ml-1 rounded-full text-base text-red-500 cursor-pointer"
                  onClick={() => {
                    const updatedList = { ...list };
                    delete updatedList[y];
                    setList(updatedList);
                  }}
                >
                  x
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Custom;
