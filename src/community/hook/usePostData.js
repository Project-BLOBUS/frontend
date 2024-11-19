import { useState, useEffect } from "react";
import { getPosts } from "../api/todoApi";

const usePostData = ({ page, size, tab, category, searchTerm }) => {
  const [data, setData] = useState({
    dtoList: [], // dtoList 초기값을 빈 배열로 설정
    totalPage: 0,
    current: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getPosts({
          page,
          size,
          tab,
          category,
          searchTerm,
        });
        setData(result);
      } catch (err) {
        setError("데이터 로드 실패: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, size, tab, category, searchTerm]);

  return { data, loading, error };
};

export default usePostData;
