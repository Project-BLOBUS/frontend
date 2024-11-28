// usePostData.js

import { useState, useEffect } from "react";
import { getPosts } from "../api/communityApi";

const usePostData = ({ page, size, tab, category }) => {
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
          tab, // boardType
          category, // userType
        });

        // API 응답 결과를 state에 반영
        setData({
          dtoList: result.dtoList || [], // 응답에서 게시글 리스트
          totalPage: result.totalPage || 0, // 전체 페이지 수
          current: result.current || page || 1, // 현재 페이지
        });
      } catch (err) {
        setError("데이터 로드 실패: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, size, tab, category]); // 의존성 배열

  return { data, loading, error }; // 데이터 반환
};

export default usePostData;
