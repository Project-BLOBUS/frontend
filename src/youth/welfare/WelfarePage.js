import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchPagedPolicies } from "./WelfareApi";
import { calculateDDay, formatMngtMson } from "../job/utils/formatUtil";

const WelfarePage = () => {
  const [policies, setPolicies] = useState([]);
  const [totalPages, setTotalPages] = useState(0); 
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const [searchParams, setSearchParams] = useSearchParams(); 
  const navigate = useNavigate(); 

  // 입력 중인 검색어와 최종 검색어를 분리
  const [inputKeyword, setInputKeyword] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("상태전체"); // 선택된 진행 상태 상태
  const [selectedCategory, setSelectedCategory] = useState("유형전체"); // 선택된 카테고리 상태
  
  // 페이징을 위한 값들
  const pageSize = 12; 
  const pagesPerGroup = 5; 
  const currentPage = (parseInt(searchParams.get("page")) || 1) - 1; 
  const currentPageGroup = Math.floor(currentPage / pagesPerGroup);
  const startPage = currentPageGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  const [searchs, setSearchs] = useState(
    {
      currentPage: 0,
      pageSize: pageSize,
      searchKeyword: "",
      selectedProgress: "상태전체",
      selectedCategory: "유형전체"
    }
  );

  const location = useLocation();

  const getPagedPolicies = async (searchParams) => {
    try {
      setLoading(true);
      // 최종 검색어(searchKeyword)를 사용하여 정책 조회
      const data = await fetchPagedPolicies(searchParams);
      setPolicies(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load policies.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const checkUrlAndFetchPolicies = () => {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get("page")) - 1 || 0;
      const keyword = params.get("keyword") || "";
      const category = params.get("category") || "유형전체";
      const progress = params.get("progress") || "상태전체";
  
      const updatedSearchParams = {
        currentPage: page,
        pageSize: pageSize,
        searchKeyword: keyword,
        selectedProgress: progress,
        selectedCategory: category
      };
  
      setSearchs(updatedSearchParams);
      setSelectedProgress(progress);
      setSelectedCategory(category);
      setInputKeyword(keyword);
      getPagedPolicies(updatedSearchParams);
    };
  
    checkUrlAndFetchPolicies();
  
    // URL 변경을 감지하기 위해 이벤트 리스너 추가
    window.addEventListener('popstate', checkUrlAndFetchPolicies);
  
    return () => {
      window.removeEventListener('popstate', checkUrlAndFetchPolicies);
    };
  }, [location]);

    // 페이지 로드 시 스크롤을 맨 위로 이동
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // 페이지 변경 함수 수정
  const handlePageChange = (page) => {
    // 페이지의 제일 위쪽으로 이동
    window.scrollTo(0, 0);

    const updatedSearchs = {
      ...searchs,
      currentPage: page,
    };

    setSearchs(updatedSearchs);
    setSearchParams({
      page: page + 1,
      ...(searchs.searchKeyword && { keyword: searchs.searchKeyword }),
      progress: searchs.selectedProgress,
      category: searchs.selectedCategory
    });

    getPagedPolicies(updatedSearchs);
  };

  
  // 카테고리 변경 핸들러
  // const handleCategoryChange = (category) => {
  //   const updatedSearchs = {
  //     ...searchs,
  //     selectedCategory: category, // 카테고리 업데이트
  //   };
  
  //   setSelectedCategory(category);
  //   setSearchs(updatedSearchs);
  // };

  // 상태 카테고리 변경 핸들러 통합
  const handleProgressChange = (progress) => {
    setSelectedProgress(progress);
    setSearchs((prevSearchs) => ({
      ...prevSearchs,
      selectedProgress: progress
    }));
  };

  // 유형 카테고리 변경 핸들러 통합
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchs((prevSearchs) => ({
      ...prevSearchs,
      selectedCategory: category
    }));
  };

  // 검색 핸들러 추가 - 입력 중인 검색어를 최종 검색어로 설정
  const handleSearch = () => {
    const updatedSearchs = {
      ...searchs,
      searchKeyword: inputKeyword, // 검색어 업데이트
      currentPage: 0 // 페이지 초기화
    };
  
    setSearchs(updatedSearchs);
    setSearchParams({ 
      page: 1, 
      ...(inputKeyword && { keyword: inputKeyword }),
      progress: selectedProgress,
      category: selectedCategory 
    });
  
    getPagedPolicies(updatedSearchs); // 업데이트된 검색 조건으로 데이터 불러오기
  };

  // 정책 클릭 시 상세 페이지로 이동
  const handlePolicyClick = (policyId) => {
    navigate(`/youth/welfare/${policyId}`, { state: { searchs } });
  };

  // 초기화 핸들러 - 검색어 초기화
  const handleReset = () => {
    navigate('/youth/welfare');
  };

  // 즐겨찾기 클릭 핸들러
  const handleFavoriteClick = (policyId) => {
    // 즐겨찾기 기능 구현
    console.log(`Policy ${policyId} added to favorites`);
  };

  //  페이지 이동 함수
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

  // 페이지 버튼 렌더링 함수
  const renderPageButton = (page, label, onClick, disabled = false) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 mx-1 rounded ${
        currentPage === page ? "text-[#6F00FF] font-bold" : "bg-white"
      } ${disabled ? "disabled:opacity-50" : ""}`}
    >
      {label}
    </button>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="guide-line">
      <div className="text-3xl font-bold mb-6 pb-4 border-b-2 border-b-gray-200">
        <div className="flex items-center space-x-4">
          <p className="text-3xl font-bold">
            청년 복지 정책
          </p>
        </div>
      </div>

      {/* 검색 입력창 및 버튼 */}
      <div className="border-2 border-gray-200 rounded-md p-4 bg-white mb-5">
        <div className="flex items-center space-x-4">
          <p className="w-28 text-center text-xl font-semibold text-gray-700">
            복지 정책
          </p>
          상태
          <select
            className="h-10 border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none"
            value={selectedProgress}
            onChange={(e) => handleProgressChange(e.target.value)}
          >
            <option value="상태전체">전체</option>
            <option value="진행중">진행중</option>
            <option value="마감">마감</option>
          </select>
          유형
          <select
            className="h-10 border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="유형전체">전체</option>
            <option value="제목">제목</option>
            <option value="내용">내용</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={inputKeyword}
            onChange={(e) => {
              setInputKeyword(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                e.preventDefault(); // 기본 Enter 동작(폼 제출 등) 방지
              }
            }}
            className="h-10 flex-grow border-b-2 border-b-gray-300 p-2 text-sm bg-inherit focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#6F00FF] text-white px-8 py-2 rounded-md hover:bg-[#420099] transition-colors duration-500"
          >
            검색
          </button>
          <button
            onClick={handleReset}
            className="bg-[#6F00FF] text-white px-8 py-2 rounded-md hover:bg-[#420099] transition-colors duration-500"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 기존 정책 리스트 렌더링 */}
      <div className="grid grid-cols-4 gap-4">
          {policies.map((policy) => (
            <div
              key={policy.policyId}
              className="relative h-44 border border-gray-200 rounded-md px-3 pb-3 shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-500"
              onClick={() => {
                handlePolicyClick(policy.policyId);
              }}
            >
              {/* D-day 영역 */}
              <div className="absolute top-0 left-3 bg-[#6F00FF] text-white font-bold text-sm px-2 py-1 rounded-b-md inline-block">
                {calculateDDay(policy.policyApplicationPeriod)}
              </div>

              {/* 제목 영역 */}
              <div className="absolute top-[40px] left-3 right-3">
                <h2 className="font-semibold text-xl overflow-hidden text-ellipsis line-clamp-1">
                  {policy.policyName || "제목 없음"}
                  </h2>
              </div>

              {/* 서브제목 영역 */}
              <div className="absolute top-[70px] left-3 right-3">
                <p className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-2">
                  {policy.policyOverview || "서브제목 없음"}
                </p>
              </div>

              {/* 대상 영역 */}
              <div className="absolute top-[115px] left-3 right-3">
                <p className="text-xs text-gray-500 overflow-hidden text-ellipsis line-clamp-1">
                  {policy.ageRequirement ? `신청연령: ${policy.ageRequirement}` : "연령 정보 없음"}
                </p>
              </div>

              {/* 하단의 출처 영역 */}
              <div className="absolute bottom-4 left-3 text-xs text-gray-500">
                {formatMngtMson(policy.hostOrganization)}
              </div>
              
            {/* <button 
              className="border-2 border-red-600 m-2"
              onClick={(e) => {
                e.stopPropagation();
                // 즐겨찾기 기능을 여기에 추가
                handleFavoriteClick(policy.policyId);
              }}
            >
              즐겨찾기
            </button> */}
            </div>
          ))}
      </div>

      {/* 기존 페이징 버튼 */}
      <div className="w-[200px] h-[20px] ml-[40%] mt-[5px]">
        <div className="w-full flex justify-center mt-4">
          {/* 이전 그룹 버튼 */}
          {currentPageGroup > 0 && renderPageButton(null, '<<', handlePreviousGroup)}

          {/* 이전 페이지 버튼 */}
          {renderPageButton(null, '<', handlePreviousPage, currentPage === 0)}

          {/* 현재 그룹에 해당하는 페이지 버튼 */}
          {Array.from({ length: endPage - startPage }, (_, index) => startPage + index).map((page) =>
            renderPageButton(page, page + 1, () => handlePageChange(page))
          )}

          {/* 다음 페이지 버튼 */}
          {renderPageButton(null, '>', handleNextPage, currentPage === totalPages - 1)}

          {/* 다음 그룹 버튼 */}
          {endPage < totalPages && renderPageButton(null, '>>', handleNextGroup)}
        </div>
      </div>

      {/* 사이드바 */}
      <div className="invisible w-[170px] h-[200px] bg-gray-400 rounded-lg ml-[2%] mt-[-31%]">
        내꺼는 사이드바 없음
      </div>
    </div>
  );
};

export default WelfarePage;