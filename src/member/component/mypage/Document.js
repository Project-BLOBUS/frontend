import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { getBoard } from "../../api/mypageAPI";
import useCustomMove from "../../../etc/hook/useCustomMove";
import Loading from "../../../etc/component/Loading";
import Paging from "../../../etc/component/Paging";

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

const Document = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { page, size, moveToList } = useCustomMove("mypage/doc");

  const [data, setData] = useState(initState);

  const [board, setBoard] = useState({
    type: "",
    category: "",
  });

  useEffect(() => {
    setLoading(true);

    getBoard({ page, size }, board)
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
  }, [page, size, board]);

  const printDateTime = (dateTime) => {
    const year = dateTime.split("T")[0].split("-")[0];
    const month = dateTime.split("T")[0].split("-")[1];
    const date = dateTime.split("T")[0].split("-")[2];

    const hour = dateTime.split("T")[1].split(":")[0];
    const min = dateTime.split("T")[1].split(":")[1];
    const sec = Math.floor(dateTime.split("T")[1].split(":")[2], 0);

    const diff = new Date() - new Date(dateTime);

    if (diff > 365 * 24 * 60 * 60 * 1000) {
      return year + "-" + month + "-" + date;
    } else if (diff > 14 * 24 * 60 * 60 * 1000) {
      return month + " / " + date;
    } else if (diff > 24 * 60 * 60 * 1000) {
      return Math.round(diff / 24 / 60 / 60 / 1000, 0) + "일 전";
    } else {
      return hour + ":" + min + ":" + sec;
    }
  };

  const css = "h-full px-4 border-gray-400";
  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full py-4 text-3xl text-left flex justify-between items-center">
          작성글
        </div>

        <div className="w-full text-base flex justify-center items-center">
          <div className="w-1/2 border-b-4 border-gray-500 flex justify-start items-center">
            {makeTab("전체", "", board, setBoard, true, moveToList)}
            {makeTab("자유", "자유", board, setBoard, true, moveToList)}
            {makeTab("건의", "건의", board, setBoard, true, moveToList)}
          </div>
          <div className="w-1/2 border-b-4 border-gray-500 flex justify-end items-center">
            {makeTab("지역", "지역", board, setBoard, false, moveToList)}
            {makeTab("기업", "기업", board, setBoard, false, moveToList)}
            {makeTab("청년", "청년", board, setBoard, false, moveToList)}
            {makeTab("전체", "", board, setBoard, false, moveToList)}
          </div>
        </div>

        <div className="bg-gray-200 w-full h-[50px] py-2 border-b-4 border-gray-500 text-base flex justify-center items-center">
          <div className={`${css} w-[10%] border-r-2`}>번호</div>
          <div className={`${css} w-[60%] border-r-2`}>제목</div>
          <div className={`${css} w-[15%] border-r-2`}>작성일</div>
          <div className={`${css} w-[15%] border-r-0`}>수정일</div>
        </div>

        <div className="w-full h-[420px] text-base text-nowrap flex flex-col justify-start items-center">
          {data.dtoList.length === 0 ? (
            <div className="w-full py-20 text-2xl">작성글 이력이 없습니다.</div>
          ) : (
            data.dtoList.map((doc, index) => (
              <div
                key={index}
                className={`w-full h-[10%] py-2 border-b-2 border-gray-400 flex justify-center items-center cursor-pointer hover:bg-gray-300 transition duration-500`}
                onClick={() => navigate(`/community/read/${doc.id}`)}
              >
                <div className={`${css} w-[10%] border-r-2`}>{doc.id}</div>
                <div
                  className={`${css} w-[60%] border-r-2 flex justify-start items-center space-x-2`}
                >
                  {doc.category === "청년" ? (
                    <div className="text-blue-500">[청년]</div>
                  ) : doc.category === "기업" ? (
                    <div className="text-red-500">[기업]</div>
                  ) : (
                    <div className="text-green-500">[지역]</div>
                  )}
                  <div className="">{doc.title}</div>
                  {doc.visibility ? <FaLock /> : <></>}
                </div>
                <div className={`${css} w-[15%] border-r-2`}>
                  {printDateTime(doc.createdAt)}
                </div>
                <div className={`${css} w-[15%] border-r-0`}>
                  {new Date(doc.updatedAt) - new Date(doc.createdAt) < 1000
                    ? "-"
                    : printDateTime(doc.updatedAt)}
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

const makeTab = (name, value, board, setBoard, isType, moveToList) => {
  return (
    <div
      className={`w-16 p-2 rounded-t-xl ${
        (isType ? value === board.type : value === board.category)
          ? "bg-gray-500 text-white"
          : "text-gray-300 cursor-pointer hover:bg-gray-300 hover:text-black transition duration-500"
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

export default Document;
