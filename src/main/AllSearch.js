import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // useLocation 훅을 사용
import Header from "./Header";


const AllSearch = () => {
    const location = useLocation(); // 현재 URL 정보를 가져옴
    const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터를 쉽게 다룰 수 있도록 해줌
    const searchQuery = queryParams.get("query"); // 'query' 파라미터 값 가져오기

     // 예시 데이터 (검색 결과를 필터링할 데이터)
  const data = [
    { id: 1, name: "1.청년 거주" },
    { id: 2, name: "2.청년 지원" },
    { id: 3, name: "3.청년 기업" },
    { id: 4, name: "4.정책 청년" },
    { id: 5, name: "5.청년 정보" },
    { id: 6, name: "6.청년 사업" },
    { id: 7, name: "7.청년 교육" },
    { id: 8, name: "8.청년 일자리" },
    { id: 9, name: "9.청년 정책" },
    { id: 10, name: "10.행사 청년" },
    { id: 11, name: "1.청년 거주" },
    { id: 12, name: "2.청년 지원" },
    { id: 13, name: "3.청년 기업" },
    { id: 14, name: "4.정책 청년" },
    { id: 15, name: "5.청년 정보" },
    { id: 16, name: "6.청년 사업" },
    { id: 17, name: "7.청년 교육" },
    { id: 18, name: "8.청년 일자리" },
    { id: 19, name: "9.청년 정책" },
    { id: 20, name: "20.행사 청년" },
    { id: 21, name: "1.청년 거주" },
    // { id: 22, name: "2.청년 지원" },
    // { id: 23, name: "3.청년 기업" },
    // { id: 24, name: "4.정책 청년" },
    // { id: 25, name: "5.청년 정보" },
    // { id: 26, name: "6.청년 사업" },
    // { id: 27, name: "7.청년 교육" },
    // { id: 28, name: "8.청년 일자리" },
    // { id: 29, name: "9.청년 정책" },
    // { id: 30, name: "30.행사 청년" },
    // { id: 31, name: "31.행사 청년" }, 
  ];

  // 검색어에 맞는 데이터 필터링 함수
  const getFilteredResults = (query) => {
    if (!query) return data; // 검색어가 없으면 모든 데이터를 반환
    return data.filter((item) => item.name.includes(query)); // 검색어 포함된 항목만 반환
  };

  // 필터링된 결과
  const filteredResults = getFilteredResults(searchQuery);

  // 페이징 관련 상태
  const itemsPerPage = 10; // 한 페이지에 보여줄 항목 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  // 현재 페이지에 해당하는 항목들
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 번호 범위 설정 (예: 1, 2, 3 페이지는 1에서 시작)
  const pageRange = () => {
    let start = Math.max(currentPage - 1, 1); // 최소 1
    let end = Math.min(start + 2, totalPages); // 최대 3페이지까지

    if (end - start < 2) {
      start = Math.max(end - 2, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

    return(
        <div>
          <div className="bg-[linear-gradient(45deg,_#DB0153,_#6E00FF)]">
            <Header  
            pageTitle="통합검색"
            titleBg="#D5006D"  
            isWhite={true} 
            borderB={false} 
            />
          </div>
        <div className="min-h-full w-[70.7%] ml-[15%] mt-[4px] flex flex-col items-center justify-center ">
          <div className="sm:w-[30%] w-[50%] text-center sm:mb-[15%] mb-[15%] sm:mr-[0%] mr-[38%] ">
            <div className="flex flex-col sm:w-[100%] w-[160%] sm:h-[100px] h-[70px] ml-[5%] mt-[3%] sm:text-md text-md font-bold text-gray-700 sm:mb-[60%] mb-[60%] ">
              검색어 "{searchQuery ? searchQuery : "없음"}"에 대한 검색 결과 총 {filteredResults.length}건
  
              <div className="flex justify-center items-center mt-[2%] ">
                <input
                  type="text"
                  placeholder="검색"
                  className="border-2 text-md sm:mt-2 mt-[3%] rounded-tl-[25px] rounded-bl-[25px] sm:w-[100%] w-[100%] h-[40px] p-[5%] sm:p-[2%] focus:outline-none"
                />
                <div className="w-[85px] sm:h-[40px] h-[40px] sm:mt-2 mt-[3%] bg-[#A488F3] text-md sm:text-lg text-white font-bold rounded-tr-[25px] rounded-br-[25px] flex justify-center items-center cursor-pointer">
                  검색
                </div>
              </div>
            </div>
          </div>
  
          <ul className="w-[400px] h-[500px] p-4 sm:mt-[-35%] mt-[-25%] sm:ml-9 ml-3 pb-[2%] sm:pb-[2%] flex flex-wrap">
            {currentItems.map((item) => (
              <li
                key={item.id}
                className="bg-white w-[130px] h-[70px] ml-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer border-2 border-gray-400 flex justify-center items-center"
              >
                <p className="text-md font-bold text-gray-800">{item.name}</p>
                
              </li>
            ))}
          </ul>
  
          {/* 페이징 버튼 */}
          {filteredResults.length > 0 && (
            <div className="flex justify-center sm:ml-7 ml-0 mt-[-1px]">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 mx-1 rounded-md bg-gray-200 text-gray-600 font-bold"
              >
                이전
              </button>
  
              {/* 페이지 번호 */}
              {pageRange().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {page}
                </button>
              ))}
  
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 mx-1 rounded-md bg-gray-200 text-gray-600 font-bold"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    )
}
export default AllSearch;