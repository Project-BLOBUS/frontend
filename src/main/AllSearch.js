import React, { useState, useCallback,useEffect  } from "react";
import Header from "./Header";
import { fetchPolicyTitles, fetchCommunityTitles } from "./AllSearchApi"; // 커뮤니티 API 추가
import { useSearchParams } from "react-router-dom";

const AllSearch = () => {
  const [searchParams, ] = useSearchParams();
  
  const [, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [policyTotalItems, setPolicyTotalItems] = useState(0);
  const [communityTotalItems, setCommunityTotalItems] = useState(0);
  const [, setError] = useState(null);
  const [policies, setPolicies] = useState([]); //청년
  const [communityPolicies, setCommunityPolicies] = useState([]); // 커뮤니티 데이터 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [search, setSearch] = useState(searchParams.get('query') || ''); // 검색어 상태
  const [category, setCategory] = useState('policy'); // 청년관 검색어 상태


  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 페이지 번호 범위 설정
  const pageRange = () => {
    let start = Math.max(currentPage - 1, 1); // 최소 1
    let end = Math.min(start + 4, totalPages); // 최대 3페이지까지
    if (end - start < 2) {
      start = Math.max(end - 2, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (search.trim() !== '') { // 검색어가 비어 있지 않으면
         // 청년관 데이터 fetch
        if (category === "policy") {
          const response = await fetchPolicyTitles(search, currentPage, category);
          if (response.list && response.list.length > 0) {
            setPolicies(response.list);
            setTotalPages(response.policy.totalPage);
            setPolicyTotalItems(response.policy.totalItem);
            setCommunityTotalItems(response.community.totalItem);
          } else {
            setPolicies([]);  // 데이터가 없으면 빈 배열로 설정
            setPolicyTotalItems(0);  // 데이터가 없으면 totalItems를 0으로 설정
            setCommunityTotalItems(response.community.totalItem);
          }
        } 
          // 커뮤니티 데이터 fetch
        else if (category === "community") {
          const response = await fetchCommunityTitles(search, currentPage, category);
          if (response.list && response.list.length > 0) {
            setCommunityPolicies(response.list);
            setTotalPages(response.community.totalPage);
            setPolicyTotalItems(response.policy.totalItem);
            setCommunityTotalItems(response.community.totalItem);
          } else {
            setCommunityPolicies([]);  // 데이터가 없으면 빈 배열로 설정
            setCommunityTotalItems(0); // 커뮤니티 데이터가 없으면 totalItems를 0으로 설정
            setPolicyTotalItems(response.policy.totalItem);
          }
        }
      } else {
         // 검색어가 비어 있을 경우, totalItems와 communityTotalItems를 0으로 설정
         setPolicyTotalItems(0);
         setCommunityTotalItems(0);
         setPolicies([]);
         setCommunityPolicies([]);
      }
    } catch (error) {
      setError("데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [search, currentPage, category]);

  useEffect(() => {
    handleSearchClick();
  }, [category]);

  // 검색 버튼 클릭 시 데이터 fetch
  const handleSearchClick = () => {
    if (search.trim() !== "") {
      fetchData();
    }
  };

  useEffect(() => {
    // 검색어가 변경될 때마다 currentPage를 1로 리셋
    setCurrentPage(1);
  }, [search]);

  const handleKeyDown = (e) => {
    if(e.key ==="Enter") {
      handleSearchClick();
    }
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
            <div className="w-[330px] flex justify-center items-center mt-[-3%] ml-[2.2%]">
              <input
                type="text"
                placeholder="검색"
                className="border-2 text-md sm:mt-2 mt-[3%] sm:w-[100%] w-[100%] h-[40px] p-[5%] sm:p-[4%] focus:outline-none ml-[-9%]"
                value={search}  // 검색어 상태 바인딩
                onChange={(e) => setSearch(e.target.value)}  // 입력 필드에서만 상태 변경
                onKeyDown={handleKeyDown} // 엔터 키 입력 시 검색 실행
                maxLength={16}
              />

              <div
                className="w-[85px] sm:h-[40px] mt-[8px] bg-[#A488F3] text-md sm:text-lg text-white font-bold  flex justify-center items-center cursor-pointer transition duration-500 hover:text-gray-300"
                onClick={handleSearchClick}  // 검색 버튼 클릭 시
              >
                검색
              </div>
            </div>

            <div className="ml-[-36%] text-xl flex justify-center w-[550px] mt-[-6%]">
              <div className={`w-[180px] border-2 border-gray-400 mt-[5%] cursor-pointer ${category === 'policy' ? 'text-gray-400' : ''}`} 
                onClick={() => {
                  setCategory('policy');
                }}>
                청년관({policyTotalItems}) {/* 정책의 총 개수 */}
              </div>

              <div className={`w-[180px] border-2 border-gray-400 mt-[5%] cursor-pointer ${category === 'community' ? 'text-gray-400' : ''}`} 
                onClick={() => {
                  setCategory('community');
                }}>
                커뮤니티({communityTotalItems}) {/* 커뮤니티의 총 개수 */}
              </div>
            </div>
          </div>
        </div>

        {/* 데이터가 없을 때 메시지 표시 */}
        {category === "policy" && policies.length === 0 ? (
          <div className="text-center text-gray-500 text-3xl mt-[-20%] ml-[2%] ">
            검색어에 해당하는 청년관 데이터가 없습니다.
          </div>
         ) : category === "community" && communityPolicies.length === 0 ? (
          <div className="text-center text-gray-500 text-3xl mt-[-20%] ml-[2%] ">
            검색어에 해당하는 커뮤니티 데이터가 없습니다.
          </div>
        ) : (
          <ul className="w-[1100px] p-2 sm:mt-[-35%] mt-[-25%] sm:ml-[60px] ml-[12px] pb-[2%] sm:pb-[1%] flex flex-wrap">

          {category === "policy" &&
            policies.map((item, index) => (
              <li key={item.id} className="flex justify-center items-center bg-white w-[470px] h-[80px] ml-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer border-2 border-gray-400 overflow-y-auto m-2">
                <p className="text-sm font-bold text-gray-800 p-[15px]">
                  {index + (currentPage - 1) * 10 + 1}. {item}
                </p>
              </li>
            ))}

          {category === "community" &&
            communityPolicies.map((item, index) => (
              <li key={item.id} className="flex justify-center items-center bg-white w-[470px] h-[80px] ml-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer border-2 border-gray-400 overflow-y-auto m-2">
                <p className="text-sm font-bold text-gray-800 p-1">
                  {index + (currentPage - 1) * 10 + 1}. {item}
                </p>
              </li>
            ))}
        </ul>
      )}

         {/* 페이징 버튼 */}
      {(category === "policy" && policies.length > 0) || (category === "community" && communityPolicies.length > 0) ? (
        <div className="flex justify-center sm:ml-6 ml-0 mt-[-1px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 mx-1 rounded-md bg-gray-200 text-gray-600 font-bold"
          >
            이전
          </button>

          {pageRange().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
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
      ) : null}
      </div>
    </div>
  );
};

export default AllSearch;
