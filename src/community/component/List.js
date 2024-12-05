import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FaLock, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../../etc/util/cookieUtil";
import { getPostList } from "../api/postAPI";
import useCustomMove from "../../etc/hook/useCustomMove";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../../etc/component/Loading";
import Paging from "../../etc/component/Paging";

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

const List = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { page, size, moveToList } = useCustomMove("community/list");
  const { makeBtn } = useCustomTag();

  const [data, setData] = useState(initState);

  const [filter, setFilter] = useState({
    type: "",
    category: "",
    keyward: "",
  });

  const inputRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    getPostList({ page, size }, filter)
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
  }, [page, size, filter]);

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

  const tailwind = {
    btnList: "w-1/3 flex justify-start items-center space-x-2",
    btn: "w-[60px] p-2 rounded text-white hover:text-black transition duration-500",
    dtoList:
      "p-2 border-[.1px] border-gray-300 flex justify-center items-center",
  };
  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full py-4 text-sm border-b-4 border-[#DB0153] flex justify-center items-center space-x-10">
          <div className="w-1/3 flex justify-start items-center space-x-2">
            {makeTab("전체", "", filter, setFilter, true, moveToList)}
            {makeTab("자유글", "자유", filter, setFilter, true, moveToList)}
            {makeTab("건의글", "건의", filter, setFilter, true, moveToList)}
          </div>

          <div className="w-1/3 flex justify-start items-center space-x-2">
            {makeTab("전체", "", filter, setFilter, false, moveToList)}
            {makeTab("청년관", "청년", filter, setFilter, false, moveToList)}
            {makeTab("기업관", "기업", filter, setFilter, false, moveToList)}
            {makeTab("지역관", "지역", filter, setFilter, false, moveToList)}
          </div>

          <div className="w-1/3 flex justify-start items-center space-x-2">
            <input
              className="w-[calc(100%-50px)] p-2 border-2 border-gray-300 rounded"
              type="text"
              placeholder="검색어를 입력하세요"
              ref={inputRef}
              onKeyUp={(e) => {
                setLoading(true);
                if (e.key === "Enter") {
                  setFilter({ ...filter, keyward: e.target.value.trim() });
                } else if (e.key === "Escape") {
                  e.target.value = "";
                  setFilter({ ...filter, keyward: e.target.value.trim() });
                }
                setLoading(false);
              }}
            />
            {makeBtn(<FaSearch className="text-xl" />, "green", () => {
              setLoading(true);
              const value = inputRef.current?.value.trim();
              if (value) {
                setFilter({ ...filter, keyward: value });
              }
              setLoading(false);
            })}
          </div>
        </div>

        <div className="w-full mt-4 border-x-[.1px] border-t-[.1px] text-base flex justify-center items-center">
          <div className={`${tailwind.dtoList} w-[7%]`}>ID</div>
          <div className={`${tailwind.dtoList} w-[8%]`}>구분</div>
          <div className={`${tailwind.dtoList} w-[50%]`}>제목</div>
          <div className={`${tailwind.dtoList} w-[15%]`}>작성자</div>
          <div className={`${tailwind.dtoList} w-[10%]`}>작성</div>
          <div className={`${tailwind.dtoList} w-[10%]`}>수정</div>
        </div>

        <div className="w-full border-x-[.1px] border-b-[.1px] text-sm text-nowrap flex flex-col justify-center items-center">
          {data.dtoList.length === 0 ? (
            <div className="w-full border-[.1px] py-20 text-2xl">
              {filter.keyward !== "" ? (
                <>
                  <span className="text-red-500">
                    '
                    {filter.keyward.length > 20
                      ? filter.keyward.slice(0, 20) + "..."
                      : filter.keyward}
                    '
                  </span>
                  에 대한 검색결과가 존재하지 않습니다.
                </>
              ) : (
                "작성된 글이 없습니다."
              )}
            </div>
          ) : (
            data.dtoList.map((dto, index) => (
              <div
                key={index}
                className={`w-full font-normal flex justify-center items-center cursor-pointer hover:bg-gray-200 hover:font-bold transition duration-500`}
                onClick={() => {
                  if (
                    getCookie("userRole") !== "ADMIN" &&
                    dto.visibility &&
                    dto.authorId !== getCookie("userId")
                  ) {
                    toast.error("열람 권한이 없습니다.");
                  } else navigate(`/community/read/${dto.id}`);
                }}
              >
                <div className={`${tailwind.dtoList} w-[7%]`}>{dto.id}</div>

                <div className={`${tailwind.dtoList} w-[8%]`}>
                  {dto.boardType}
                </div>

                <div className={`${tailwind.dtoList} w-[50%]`}>
                  <div className="w-full flex justify-start items-center space-x-2">
                    {dto.category === "청년" ? (
                      <div className="text-blue-500 font-bold">[청년]</div>
                    ) : dto.category === "기업" ? (
                      <div className="text-red-500 font-bold">[기업]</div>
                    ) : (
                      <div className="text-green-500 font-bold">[지역]</div>
                    )}
                    {dto.visibility ? <FaLock /> : <></>}
                    <div>{dto.title}</div>
                    <div className="text-xs text-red-500 font-bold">
                      {dto.commentList.length > 0 && dto.commentList.length}
                    </div>
                  </div>
                </div>

                <div className={`${tailwind.dtoList} w-[15%]`}>
                  {dto.authorName}
                </div>

                <div className={`${tailwind.dtoList} w-[10%]`}>
                  {printTime(dto.createdAt)}
                </div>

                <div className={`${tailwind.dtoList} w-[10%]`}>
                  {new Date(dto.updatedAt) - new Date(dto.createdAt) < 60 * 1000
                    ? "-"
                    : printTime(dto.updatedAt)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full py-2 flex justify-end items-center">
          {getCookie("jwt") &&
            makeBtn("글쓰기", "blue", () => navigate("/community/add"))}
        </div>

        <div className="w-full flex justify-center items-center">
          <Paging data={data} movePage={moveToList} />
        </div>
      </div>
    </>
  );
};

const makeTab = (name, value, filter, setFilter, isType, moveToList) => {
  return (
    <div
      className={`w-full p-2 rounded cursor-pointer transition duration-500 ${
        (isType ? value === filter.type : value === filter.category)
          ? "bg-[#DB0153] text-white hover:bg-gray-500 hover:text-gray-100"
          : "bg-gray-300 text-gray-100 hover:bg-[#DB0153] hover:text-white"
      }`}
      onClick={() => {
        isType
          ? value === filter.type
            ? setFilter({ ...filter, type: "" })
            : setFilter({ ...filter, type: value })
          : value === filter.category
          ? setFilter({ ...filter, category: "" })
          : setFilter({ ...filter, category: value });
        moveToList({ page: 1, size: 10 });
      }}
    >
      {name}
    </div>
  );
};

export default List;
