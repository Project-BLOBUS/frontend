import { useState, useEffect } from "react";
import { getPosts } from "../api/communityApi";

const usePostData = ({ page, size, tab, category, searchTerm }) => {
  const [data, setData] = useState({
    dtoList: [], // 게시글 리스트
    totalPage: 0, // 전체 페이지 수
    current: 1, // 현재 페이지
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
          tab, // tab을 boardType으로 사용
          category, // category를 userType으로 사용
          searchTerm, // 검색어
        });

        // API 응답 결과를 state에 반영
        setData({
          dtoList: result.dtoList || [], // 응답에서 dtoList
          totalPage: result.totalPage || 0, // 응답에서 totalPage
          current: result.current || 1, // 응답에서 current
        });
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
