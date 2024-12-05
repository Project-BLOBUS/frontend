import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchPagedPolicies as welfarePolicies } from "../youth/welfare/WelfareApi";
import { fetchPagedPolicies as educationPolicies } from "../youth/education/EducationApi";

const AllSearch = () => {
  const [, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [, setTotalElements] = useState(0);
  const [, setError] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const getPagedPolicies1 = async (searchParams) => {
    try {
      setLoading(true);
      // 최종 검색어(searchKeyword)를 사용하여 정책 조회
      const data = await welfarePolicies(searchParams);
      setPolicies(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError("Failed to load policies.");
    } finally {
      setLoading(false);
    }
  };

  const getPagedPolicies2 = async (searchParams) => {
    try {
      setLoading(true);
      // 최종 검색어(searchKeyword)를 사용하여 정책 조회
      const data = await educationPolicies(searchParams);
      setPolicies(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError("Failed to load policies.");
    } finally {
      setLoading(false);
    }
  };

  const pageSize = 10;

  useEffect(() => {
    const checkUrlAndFetchPolicies = () => {
      const params = new URLSearchParams(window.location.search);
      const page = currentPage - 1 || 0;
      const keyword = params.get("query") || "";

      const updatedSearchParams = {
        currentPage: page,
        pageSize: pageSize,
        searchKeyword: keyword,
      };
      getPagedPolicies1(updatedSearchParams);
    };
    checkUrlAndFetchPolicies();
  }, [currentPage]);

  useEffect(() => {
    const checkUrlAndFetchPolicies = () => {
      const params = new URLSearchParams(window.location.search);
      const page = currentPage - 1 || 0;
      const keyword = params.get("query") || "";

      const updatedSearchParams = {
        currentPage: page,
        pageSize: pageSize,
        searchKeyword: keyword,
      };
      getPagedPolicies2(updatedSearchParams);
    };
    checkUrlAndFetchPolicies();
  }, [currentPage]);

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

  return (
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
            <div className="flex justify-center items-center mt-[2%] ">
              <input
                type="text"
                placeholder="검색"
                className="border-2 text-md sm:mt-2 mt-[3%] rounded-tl-[25px] rounded-bl-[25px] sm:w-[100%] w-[100%] h-[40px] p-[5%] sm:p-[4%] focus:outline-none"
              />
              <div className="w-[85px] sm:h-[40px] h-[40px] sm:mt-2 mt-[3%] bg-[#A488F3] text-md sm:text-lg text-white font-bold rounded-tr-[25px] rounded-br-[25px] flex justify-center items-center cursor-pointer">
                검색
              </div>
            </div>

            {policies.length > 0 && (
              <div className="ml-[-36%] text-xl flex justify-center w-[550px] ">
                <div className="w-[130px] border-2 border-gray-400 mt-[5%] cursor-pointer">
                  청년관()
                </div>
                <div className="w-[130px] border-2 border-gray-400 mt-[5%] cursor-pointer">
                  기업관()
                </div>
                <div className="w-[130px] border-2 border-gray-400 mt-[5%] cursor-pointer">
                  커뮤니티()
                </div>
                <div className="w-[130px] border-2 border-gray-400 mt-[5%] cursor-pointer">
                  지역자원()
                </div>
              </div>
            )}
          </div>
        </div>

        <ul className="w-[600px] p-2 space-y-[30px] sm:mt-[-30%] mt-[-25%] sm:ml-9 ml-3 pb-[2%] sm:pb-[2%] flex flex-wrap">
          {policies.map((item) => (
            <li
              key={item.id}
              className="bg-white w-[510px] h-[70px] ml-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer border-2 border-gray-400 overflow-y-auto"
            >
              <p className="text-md font-bold text-gray-800 p-1">
                {item.title}
              </p>
              <div className="flex space-x-2 border-t-2">
                <p className="p-1">시작일:{item.applicationPeriodStart}</p>
                <p className="p-1 pl-[42%]">
                  종료일:{item.applicationPeriodEnd}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* 페이징 버튼 */}
        {policies.length > 0 && (
          <div className="flex justify-center sm:ml-6 ml-0 mt-[-1px]">
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
  );
};
export default AllSearch;
