import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useCustomMove from "../../hook/useCustomMove";
import Loading from "../../etc/Loading";
import Paging from "../../etc/Paging";

const initState = {
  dtoList: [1, 2, 3, 4, 5, 6],
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

    // TODO 즐겨찾기 불러오기

    setLoading(false);
  }, [page, size, category]);

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full py-4 text-3xl text-left flex justify-between items-center">
          즐겨찾기
        </div>

        <div className="w-full border-b-4 border-gray-500 text-sm flex justify-start items-center">
          {makeTab("전체", "", category, setCategory, moveToList)}
          {makeTab("청년", "YOUTH", category, setCategory, moveToList)}
          {makeTab("기업", "ENTERPRISE", category, setCategory, moveToList)}
          {makeTab("지역", "RESOURCE", category, setCategory, moveToList)}
        </div>

        <div className="bg-gray-200 w-full h-[50px] py-2 border-b-4 border-gray-500 text-base flex justify-center items-center">
          목록
        </div>

        <div className="w-full h-[400px] text-base text-nowrap flex flex-wrap justify-center items-center">
          {data.dtoList.length === 0 ? (
            <div className="w-full py-20 text-2xl">작성글 이력이 없습니다.</div>
          ) : (
            data.dtoList.map((doc, index) => (
              <div
                key={index}
                className={`w-[30%] h-[45%] mx-4 my-2 py-2 border-2 border-gray-400 rounded-xl flex justify-center items-center cursor-pointer hover:bg-gray-300 transition duration-500`}
                onClick={() => navigate()}
              >
                카드형태 {doc}
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
      className={`w-20 p-2 rounded-t-xl ${
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
