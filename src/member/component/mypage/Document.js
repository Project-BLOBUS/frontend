import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { getBoardList } from "../../api/mypageAPI";
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

const Document = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { page, size, moveToList, moveToRead } = useCustomMove("mypage/doc");

  const [serverData, setServerData] = useState(initState);

  const [board, setBoard] = useState({
    type: "",
    category: "",
  });

  useEffect(() => {
    setLoading(true);

    getBoardList({ page, size }, board)
      .then((data) => {
        if (data.error) {
          setServerData(initState);
        } else {
          setServerData(data);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
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

    if (new Date() - new Date(dateTime) > 365 * 24 * 60 * 60 * 1000) {
      return year + "-" + month + "-" + date;
    } else if (new Date() - new Date(dateTime) > 24 * 60 * 60 * 1000) {
      return month + "-" + date;
    } else {
      return hour + ":" + min;
    }
  };

  const css = "h-full px-4 border-r-2 border-gray-400";
  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full py-4 text-3xl text-left flex justify-between items-center">
          작성글
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="w-1/2 border-b-4 border-gray-500 text-sm flex justify-start items-center">
            {makeTab("전체", "", board, setBoard, true)}
            {makeTab("자유", "FREE", board, setBoard, true)}
            {makeTab("건의", "SUGGEST", board, setBoard, true)}
          </div>
          <div className="w-1/2 border-b-4 border-gray-500 text-sm flex justify-end items-center">
            {makeTab("기업", "ENTERPRISE", board, setBoard, false)}
            {makeTab("청년", "YOUTH", board, setBoard, false)}
            {makeTab("전체", "", board, setBoard, false)}
          </div>
        </div>

        <div className="bg-gray-200 w-full h-[50px] py-2 border-b-4 border-gray-500 text-base flex justify-center items-center">
          <div className={`${css} w-[8%]`}>번호</div>
          <div className={`${css} w-[72%]`}>제목</div>
          <div className={`${css} w-[10%]`}>작성일</div>
          <div className={`${css} w-[10%] border-r-0`}>수정일</div>
        </div>

        <div className="w-full h-[420px] text-base text-nowrap flex flex-col justify-start items-center">
          {serverData.dtoList.length === 0 ? (
            <div className="w-full py-20 text-2xl">작성글 이력이 없습니다.</div>
          ) : (
            serverData.dtoList.map((doc, index) => (
              <div
                key={index}
                className={`w-full h-[10%] py-2 border-b-2 border-gray-400 flex justify-center items-center cursor-pointer hover:bg-gray-300 transition duration-500`}
                onClick={() =>
                  navigate(
                    `/community/${doc.boardType.toLowerCase()}/detail/${doc.id}`
                  )
                }
              >
                <div className={`${css} w-[8%]`}>{doc.id}</div>
                <div
                  className={`${css} w-[72%] flex justify-start items-center space-x-2`}
                >
                  {doc.boardCategory === "YOUTH" ? (
                    <div className="text-blue-500">[청년]</div>
                  ) : (
                    <div className="text-red-500">[기업]</div>
                  )}
                  <div className="">{doc.title}</div>
                  {doc.visibility === "PRIVATE" ? <FaLock /> : <></>}
                </div>
                <div className={`${css} w-[10%]`}>
                  {printDateTime(doc.createdAt)}
                </div>
                <div className={`${css} w-[10%] border-r-0`}>
                  {printDateTime(doc.updatedAt)}
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <Paging serverData={serverData} movePage={moveToList} />
        </div>
      </div>
    </>
  );
};

const makeTab = (name, value, board, setBoard, isType) => {
  return (
    <div
      className={`w-[10%] py-2 rounded-t-xl ${
        (isType ? value === board.type : value === board.category)
          ? "bg-gray-500 text-white"
          : "text-gray-300 cursor-pointer hover:bg-gray-300 hover:text-black transition duration-500"
      }`}
      onClick={() =>
        isType
          ? setBoard({ ...board, type: value })
          : setBoard({ ...board, category: value })
      }
    >
      {name}
    </div>
  );
};

export default Document;
