import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBookmark } from "../../api/mypageAPI";
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

const Bookmark = () => {
  const [loading, setLoading] = useState(false);
  const { page, size, moveToList } = useCustomMove("mypage/bookmark/list");
  const { makeBookTab, makeList } = useMypageTag();

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

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full my-2 py-4 text-3xl text-left border-b-2 border-gray-200">
          즐겨찾기
        </div>

        <div className="w-full my-2 text-base flex justify-start items-center space-x-4">
          {makeBookTab("전체", "", category, setCategory, moveToList)}
          {makeBookTab("청년", "청년", category, setCategory, moveToList)}
          {/* {makeBookTab("기업", "기업", category, setCategory, moveToList)} */}
          {makeBookTab("지역", "지역", category, setCategory, moveToList)}
        </div>

        {makeList(data)}

        <div>
          <Paging data={data} movePage={moveToList} />
        </div>
      </div>
    </>
  );
};

export default Bookmark;
