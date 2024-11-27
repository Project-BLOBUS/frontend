import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getBookmark } from "../../api/mypageAPI";
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

const Bookmark = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { page, size, moveToList } = useCustomMove("mypage/bookmark");

  const [data, setData] = useState(initState);

  const [category, setCategory] = useState("");

  useEffect(() => {
    setLoading(true);

    getBookmark({ page, size }, category)
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
  }, [page, size, category]);

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
          즐겨찾기
        </div>

        <div className="w-full border-b-4 border-gray-500 text-base flex justify-start items-center">
          {makeTab("전체", "", category, setCategory, moveToList)}
          {makeTab("청년", "청년", category, setCategory, moveToList)}
          {makeTab("기업", "기업", category, setCategory, moveToList)}
          {makeTab("지역", "지역", category, setCategory, moveToList)}
        </div>

        <div className="bg-gray-200 w-full h-[50px] py-2 border-b-4 border-gray-500 text-base flex justify-center items-center">
          목록
        </div>

        <div className="w-full h-[420px] text-base text-nowrap flex flex-wrap justify-start items-start">
          {data.dtoList.length === 0 ? (
            <div className="w-full py-20 text-2xl">
              즐겨찾기한 게시물이 없습니다.
            </div>
          ) : (
            data.dtoList.map((dto) => (
              <div
                key={dto.id}
                className={`w-[calc(100%/3-1rem)] h-[calc(100%/2-1rem)] mx-2 mt-2 p-4 border-2 border-gray-400 rounded-xl flex flex-col justify-center items-center space-y-4 cursor-pointer hover:bg-gray-300 transition duration-500`}
                onClick={() => navigate()}
              >
                <div className="w-full flex justify-between items-center">
                  <div className="w-full text-2xl text-left">{dto.title}</div>
                  <div>{printDateTime(dto.atTime)}</div>
                </div>

                <div className="w-full text-sm text-left flex justify-between items-center">
                  <div>{dto.content}</div>
                  <div>{dto.address.replace("-", " ")}</div>
                </div>

                <div className="w-full flex justify-center items-center space-x-2">
                  <div className="w-1/3 ">{dto.startDate}</div>
                  <div>~</div>
                  <div className="w-1/3 ">{dto.endDate}</div>
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

const makeTab = (name, value, category, setCategory, moveToList) => {
  return (
    <div
      className={`w-16 p-2 rounded-t-xl ${
        value === category
          ? "bg-gray-500 text-white"
          : "text-gray-300 cursor-pointer hover:bg-gray-300 hover:text-black transition duration-500"
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

export default Bookmark;
