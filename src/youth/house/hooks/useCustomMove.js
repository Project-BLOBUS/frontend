import { useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }

  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 12);

  const queryDefault = createSearchParams({ page, size }).toString(); //새로 추가

  const moveToPolicyList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 12);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../policyList`,
      search: queryStr,
    });

    setRefresh(!refresh); //추가
  };

  const moveToModify = (policyId) => {
    console.log(queryDefault);

    navigate({
      pathname: `../modify/${policyId}`,
      search: queryDefault, //수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };

  const moveToPolicyRead = (policyId) => {
    navigate({
      pathname: `../policyRead/${policyId}`,
      search: queryDefault,
    });
  };

  return {
    moveToPolicyList,
    moveToModify,
    moveToPolicyRead,
    page,
    size,
    refresh,
  }; //refresh 추가
};

export default useCustomMove;
