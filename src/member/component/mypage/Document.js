import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { getBoard } from "../../api/mypageAPI";
import useCustomMove from "../../../etc/hook/useCustomMove";
import useMypageTag from "../../hook/useMypageTag";
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
  const { page, size, moveToList } = useCustomMove("mypage/doc/list");
  const { makeBtn, makeDocTab } = useMypageTag();

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

  const printTime = (dateTime) => {
    const year = dateTime.split("T")[0].split("-")[0];
    const month = dateTime.split("T")[0].split("-")[1];
    const date = dateTime.split("T")[0].split("-")[2];

    const diff = new Date() - new Date(dateTime);

    if (diff > 365 * 24 * 60 * 60 * 1000) {
      return year + "-" + month;
    } else if (diff > 14 * 24 * 60 * 60 * 1000) {
      return month + "/" + date;
    } else if (diff > 24 * 60 * 60 * 1000) {
      return Math.round(diff / 24 / 60 / 60 / 1000, 0) + "일 전";
    } else if (diff > 60 * 60 * 1000) {
      return Math.round(diff / 60 / 60 / 1000, 0) + "시간 전";
    } else if (diff > 60 * 1000) {
      return Math.round(diff / 60 / 1000, 0) + "분 전";
    } else if (diff > 1000) {
      return Math.round(diff / 1000, 0) + "초 전";
    } else {
      return "1초 전";
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full mb-2 pb-4 text-3xl text-left border-b-2 border-gray-200">
          작성글
        </div>

        <div className="w-full my-2 text-base flex justify-center items-center">
          <div className="w-1/2 text-base flex justify-start items-center space-x-4">
            {makeDocTab("전체", "", board, setBoard, true, moveToList)}
            {makeDocTab("자유", "자유", board, setBoard, true, moveToList)}
            {makeDocTab("건의", "건의", board, setBoard, true, moveToList)}
            {makeDocTab("댓글", "댓글", board, setBoard, true, moveToList)}
          </div>
          <div className="w-1/2 text-base flex justify-end items-center space-x-4">
            {makeDocTab("지역", "지역", board, setBoard, false, moveToList)}
            {/* {makeDocTab("기업", "기업", board, setBoard, false, moveToList)} */}
            {makeDocTab("청년", "청년", board, setBoard, false, moveToList)}
            {makeDocTab("전체", "", board, setBoard, false, moveToList)}
          </div>
        </div>

        <div className="w-full mt-2 py-2 border-t-2 border-b border-t-yellow-500 border-b-gray-500 text-sm flex justify-center items-center">
          <div className="w-[5%]">번호</div>
          <div className="w-[8%]">구분</div>
          <div className="w-[67%]">제목</div>
          <div className="w-[10%]">작성</div>
          <div className="w-[10%]">수정</div>
        </div>

        <div className="w-full text-sm text-nowrap font-normal flex flex-col justify-start items-center">
          {data.dtoList.length === 0 ? (
            <>
              <div className="w-full py-20 text-2xl font-bold">
                작성글 이력이 없습니다.
              </div>

              <div className="w-full py-2 flex justify-end items-center">
                {makeBtn("글쓰기", () => navigate("/community/add"))}
              </div>
            </>
          ) : (
            data.dtoList.map((dto, index) => (
              <div
                key={index}
                className="w-full py-2 border-b-2 border-gray-300 flex justify-center items-center cursor-pointer"
                onClick={() => navigate(`/community/read/${dto.id}`)}
              >
                <div className="w-[5%]">{dto.id}</div>
                <div className="w-[8%]">{dto.boardType}</div>
                <div className="w-[67%] flex justify-start items-center space-x-2">
                  <div
                    className={
                      dto.category === "청년"
                        ? "text-blue-500"
                        : dto.category === "기업"
                        ? "text-red-500"
                        : dto.category === "지역"
                        ? "text-green-500"
                        : "text-gray-500"
                    }
                  >
                    [{dto.category}]
                  </div>
                  {dto.visibility ? <FaLock /> : <></>}
                  <div className="truncate">{dto.title}</div>
                  <div className="text-xs text-red-500 font-bold">
                    {dto.commentCount > 0 && dto.commentCount}
                  </div>
                </div>
                <div className="w-[10%]">{printTime(dto.createdAt)}</div>
                <div className="w-[10%]">
                  {new Date(dto.updatedAt) - new Date(dto.createdAt) < 60 * 1000
                    ? "-"
                    : printTime(dto.updatedAt)}
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

export default Document;
