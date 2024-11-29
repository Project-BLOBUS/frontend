import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const useCustomMove = (index) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") || 1;
  const size = queryParams.get("size") || 10;
  const queryStrDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr;
    if (pageParam) {
      const pageNum = pageParam.page ? parseInt(pageParam.page) : 1;
      const sizeNum = pageParam.size ? parseInt(pageParam.size) : 10;
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryStrDefault;
    }
    navigate({ pathname: `/${index}/list`, search: queryStr });
  };

  const moveToRead = (no) => {
    navigate({ pathname: `/${index}/read/${no}`, search: queryStrDefault });
  };

  const moveToAdd = () => {
    navigate({ pathname: `/${index}/add`, search: queryStrDefault });
  };

  const moveToModify = (no) => {
    navigate({ pathname: `/${index}/modify/${no}`, search: queryStrDefault });
  };

  return {
    page,
    size,
    moveToList,
    moveToRead,
    moveToAdd,
    moveToModify,
  };
};

export default useCustomMove;
