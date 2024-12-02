import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { getList } from "../api/communityAPI";
import { getCookie } from "../../etc/util/cookieUtil";
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
  const { page, size, moveToList } = useCustomMove("community");
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

    getList({ page, size }, filter)
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

    const hour = dateTime.split("T")[1].split(":")[0];
    const min = dateTime.split("T")[1].split(":")[1];

    const diff = new Date() - new Date(dateTime);

    if (diff > 365 * 24 * 60 * 60 * 1000) {
      return year + "-" + month;
    } else if (diff > 14 * 24 * 60 * 60 * 1000) {
      return month + "/" + date;
    } else if (diff > 24 * 60 * 60 * 1000) {
      return Math.round(diff / 24 / 60 / 60 / 1000, 0) + "일 전";
    } else {
      return hour + ":" + min;
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
                }
                setLoading(false);
              }}
            />
            {makeBtn("검색", "green", () => {
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
          <div className={`${tailwind.dtoList} w-[8%]`}>ID</div>
          <div className={`${tailwind.dtoList} w-[65%]`}>제목</div>
          <div className={`${tailwind.dtoList} w-[10%]`}>작성자</div>
          <div className={`${tailwind.dtoList} w-[10%]`}>작성일</div>
          <div className={`${tailwind.dtoList} w-[10%]`}>수정일</div>
        </div>

        <div className="w-full border-x-[.1px] border-b-[.1px] text-sm text-nowrap flex flex-col justify-center items-center">
          {data.dtoList.length === 0 ? (
            <div className="w-full border-[.1px] py-20 text-2xl">
              작성된 글이 없습니다.
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
                <div className={`${tailwind.dtoList} w-[8%]`}>{dto.id}</div>

                <div className={`${tailwind.dtoList} w-[65%]`}>
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
                  </div>
                </div>

                <div className={`${tailwind.dtoList} w-[10%]`}>
                  {dto.author}
                </div>

                <div className={`${tailwind.dtoList} w-[10%]`}>
                  {printTime(dto.createdAt)}
                </div>

                <div className={`${tailwind.dtoList} w-[10%]`}>
                  {printTime(dto.updatedAt)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="w-full py-2 text-sm flex justify-end items-center space-x-10">
          {makeBtn("등록", "blue", () => navigate("/community/add"))}
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
        moveToList({ page: 1, size: 20 });
      }}
    >
      {name}
    </div>
  );
};

export default List;
