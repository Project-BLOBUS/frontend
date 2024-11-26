import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchPagedPolicies } from "./FinanceApi";

// import Header from "../main/Header"; // Header를 대문자로 수정

const FinancePage = () => {
  const [policies, setPolicies] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 파라미터 관리
  const navigate = useNavigate(); // URL 변경을 위한 훅

  const pageSize = 5; // 한 페이지당 데이터 개수
  const pagesPerGroup = 10; // 한 그룹에 표시할 페이지 수

  // URL에서 현재 페이지 읽기 (초기값: 0)
  const currentPage = parseInt(searchParams.get("page")) || 0;
  const currentPageGroup = Math.floor(currentPage / pagesPerGroup);

  useEffect(() => {
    const getPagedPolicies = async () => {
      try {
        setLoading(true);
        const data = await fetchPagedPolicies(currentPage, pageSize);
        setPolicies(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Failed to load policies.");
      } finally {
        setLoading(false);
      }
    };

    getPagedPolicies();
  }, [currentPage]);

  const handlePageChange = (page) => {
    // URL에 상태 저장
    setSearchParams({ page });
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < totalPages) {
      handlePageChange(nextPage);
    }
  };

  const handlePreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= 0) {
      handlePageChange(previousPage);
    }
  };

  const handleNextGroup = () => {
    const nextGroup = currentPageGroup + 1;
    const firstPageOfNextGroup = nextGroup * pagesPerGroup;
    if (firstPageOfNextGroup < totalPages) {
      handlePageChange(firstPageOfNextGroup);
    }
  };

  const handlePreviousGroup = () => {
    const prevGroup = Math.max(currentPageGroup - 1, 0);
    const firstPageOfPrevGroup = prevGroup * pagesPerGroup;
    handlePageChange(firstPageOfPrevGroup);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const startPage = currentPageGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  return (
    <div>
        <div className="border-2 border-blue-400">
        {/* 들어가야하는 첫번째 div */}
          {/* 내용 필터 버튼 */}
          <div className="flex gap-2">
              <button className="bg-blue-300 text-white px-4 py-2 rounded">전체</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">제목</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">내용</button>
          </div>
          {/* 지역 필터 버튼 */}
          <div className="flex gap-2">
              <button className="bg-blue-300 text-white px-4 py-2 rounded">부산진구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">해운대구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">서구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">동구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">중구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">북구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">etc..</button>
          </div>
        </div>

        {/* 들어가야하는 두번째 div */}
        <div className="border-2 border-blue-400 h-[100px] flex items-center justify-center px-4">
            {/* 검색창과 검색 버튼 */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="검색어 입력창"
                className="border border-gray-300 px-4 py-2 rounded w-[800px]"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">검색 버튼</button>
            </div>
          </div>

        <div className="border-2 border-blue-400 h-[68%] mt-[2%]">
          {/* TODO : DB에 더미 데이터 만들어서 꺼내올 수 있게 만들어보기.
          TODO 순서
          1. 백엔드 구축하고 더미 데이터 만들어보기
          2. API 만들기
          3. 백엔드랑 연결해서 데이터 들고 오기
          들어가야하는 세번째 div */}
          <ul>
            {policies.map((policy) => (
              <li key={policy.policyId} className="mb-4">
                <h2 className="font-bold text-lg">{policy.title}</h2>
                <p>{policy.overview}</p>
                <p>
                  Application Period: {policy.applicationPeriodStart} to{" "}
                  {policy.applicationPeriodEnd}
                </p>
              </li>
            ))}
          </ul>
        </div>

      <div className="w-[200px] h-[20px] ml-[40%] mt-[5px]">
        {/* 페이징 버튼 */}
        <div className="w-full flex justify-center mt-4">
          {/* 이전 그룹 버튼 */}
          {currentPageGroup > 0 && (
            <button
              onClick={handlePreviousGroup}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              {'<'}{'<'}
            </button>
          )}

          {/* 이전 페이지 버튼 */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            {'<'}
          </button>

          {/* 현재 그룹에 해당하는 페이지 버튼 */}
          {Array.from(
            { length: endPage - startPage },
            (_, index) => startPage + index
          ).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page + 1}
            </button>
          ))}

          {/* 다음 페이지 버튼 */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
          >
            {'>'}
          </button>

          {/* 다음 그룹 버튼 */}
          {endPage < totalPages && (
            <button
              onClick={handleNextGroup}
              className="px-4 py-2 mx-1 bg-gray-200 rounded"
            >
              {'>'}{'>'}
            </button>
          )}
        </div>
      </div>

      {/* 사이드바 숨김 */}
      <div className="invisible w-[170px] h-[200px] bg-gray-400 rounded-lg ml-[2%] mt-[-31%]">
        내꺼는 사이드바 없음
        들어가야하는 네번째 div
      </div>
    </div>

  );
};

export default FinancePage;