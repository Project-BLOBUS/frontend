import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { loadSetting, saveSetting, getCustom } from "../../api/mypageAPI";
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

const Custom = () => {
  const [loading, setLoading] = useState(false);
  const { page, size, moveToList } = useCustomMove("mypage/custom/list");
  const { makeList, makeSelect } = useMypageTag();

  const [data, setData] = useState(initState);

  const [open, setOpen] = useState({
    청년: false,
    기업: false,
    지역: false,
    키워드: false,
  });

  const [yList, setYList] = useState({
    전체: false,
    일자리: false,
    주거: false,
    복지: false,
    교육: false,
  });

  const [eList, setEList] = useState({
    전체: false,
    기업: false,
  });

  const [rList, setRList] = useState({
    전체: false,
    문화: false,
  });

  const [kList, setKList] = useState([]);

  useEffect(() => {
    setLoading(true);

    loadSetting()
      .then((data) => {
        if (data.error) {
          toast.error("설정 불러오기에 실패했습니다.", { toastId: "e" });
        } else if (Object.keys(data).length === 0) {
          const set = (list, setList) =>
            setList(
              Object.keys(list).reduce((acc, key) => {
                acc[key] = true;
                return acc;
              }, {})
            );

          set(yList, setYList);
          set(eList, setEList);
          set(rList, setRList);
        } else {
          const set = (list, setList, data) =>
            data &&
            setList(
              Object.keys(list).reduce((acc, key) => {
                acc[key] = data.includes(key);
                return acc;
              }, {})
            );

          set(yList, setYList, data.청년);
          set(eList, setEList, data.기업);
          set(rList, setRList, data.지역);

          data.키워드 &&
            data.키워드.split("/").forEach((key) => {
              setKList((prev) => ({ ...prev, [key]: true }));
            });
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.", { toastId: "e" });
        } else {
          toast.error("설정 불러오기에 실패했습니다.", { toastId: "e" });
        }
      });

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    const yListStr = listToStr(yList);
    const eListStr = listToStr(eList);
    const rListStr = listToStr(rList);
    const kListStr = listToStr(kList);

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

  const listToStr = (list) => {
    return Object.entries(list)
      .filter(([key, value]) => value === true)
      .map(([key]) => key)
      .join("/");
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
          {/* {makeSelect("기업", open, setOpen, eList, setEList, moveToList)} */}
          {makeSelect("지역", open, setOpen, rList, setRList, moveToList)}
          {makeSelect("키워드", open, setOpen, kList, setKList, moveToList)}

          <FaSave
            className="text-3xl flex justify-center items-center cursor-pointer hover:text-gray-300 transition duration-500"
            onClick={() => {
              setLoading(true);

              saveSetting(
                listToStr(yList),
                listToStr(eList),
                listToStr(rList),
                listToStr(kList)
              )
                .then((data) => {
                  if (data.error) {
                    toast.error("설정 저장에 실패했습니다.", { toastId: "e" });
                  } else {
                    toast.success("설정 저장 성공");
                  }
                })
                .catch((error) => {
                  if (error.code === "ERR_NETWORK") {
                    toast.error("서버연결에 실패했습니다.", { toastId: "e" });
                  } else {
                    toast.error("설정 저장에 실패했습니다.", { toastId: "e" });
                  }
                });

              setOpen(
                Object.fromEntries(Object.keys(open).map((key) => [key, false]))
              );

              setLoading(false);
            }}
          />
        </div>

        {makeList(data)}

        <div>
          <Paging data={data} movePage={moveToList} />
        </div>
      </div>
    </>
  );
};

export default Custom;
