import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

const useMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  const queryDefault = createSearchParams().toString(); //새로 추가

  const movetoCultureList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const searchTerm = pageParam.searchTerm;
      const filterType = pageParam.filterType;

      queryStr = createSearchParams({
        searchTerm: searchTerm,
        filterType: filterType,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../cultureList`,
      search: queryStr,
    });

    setRefresh(!refresh); //추가
  };
  return {
    movetoCultureList,
    refresh,
  };
};

export default useMove;
