import React, { useState, useCallback,useEffect  } from "react";
import Header from "./Header";
import { fetchPolicyTitles, fetchCommunityTitles } from "./AllSearchApi"; // 커뮤니티 API 추가
import { useSearchParams, Link  } from "react-router-dom";
import { FaLock} from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../etc/util/cookieUtil";
import Footer from "./Footer";

const AllSearch = () => {
  const [searchParams,setSearchParams ] = useSearchParams();
  const [, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [policyTotalItems, setPolicyTotalItems] = useState(0);
  const [communityTotalItems, setCommunityTotalItems] = useState(0);
  const [, setError] = useState(null);
  const [policies, setPolicies] = useState([]); //청년
  const [communityPolicies, setCommunityPolicies] = useState([]); // 커뮤니티 데이터 상태
  // const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1); // 페이지 상태
  const [currentPage, setCurrentPage] = useState(1); // 페이지 상태
  const [search, setSearch] = useState(searchParams.get('query') || ''); // 검색어 상태
  // const [category, setCategory] = useState(searchParams.get('category') || 'policy'); // URL에서 카테고리 값 가져오기
  const [category, setCategory] = useState('policy'); // URL에서 카테고리 값 가져오기


  

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // setSearchParams(prevParams => {
      //   const newParams = new URLSearchParams(prevParams);
      //   newParams.set('page', pageNumber); // 페이지 번호를 URL에 업데이트
      //   return newParams;
      // });
    }
  };

  // 페이지 번호 범위 설정
  const pageRange = () => {
    let start = Math.max(currentPage - 1, 1); // 최소 1
    let end = Math.min(start + 4, totalPages); // 최대 3페이지까지
    if (end - start < 2) {
      start = Math.max(end - 1, 1);
    }
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (search.trim() !== '') { // 검색어가 비어 있지 않으면
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


  // useEffect(() => {
  //   setSearchParams((prevParams) => {
  //     const newParams = new URLSearchParams(prevParams);
  //     newParams.set('category', category); // 카테고리 값 업데이트
  //     newParams.set('query', search);
  //     return newParams;
  //   });
  // }, [category, setSearchParams,currentPage]);

  useEffect(() => {
    handleSearchClick();

  }, [currentPage,category]);

  // 검색 버튼 클릭 시 데이터 fetch
  const handleSearchClick = () => {
    if (search.trim() !== "") {
      fetchData();
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set('query', search);
        return newParams;
      });
    }
  };

  useEffect(() => {
    // 검색어가 변경될 때마다 currentPage를 1로 리셋
    setCurrentPage(1);
  }, [search]);

  // useEffect(() => {
  //   setCurrentPage(parseInt(searchParams.get('page')) || 1); // URL에서 페이지 번호를 가져옴
  // }, [searchParams]);

  const handleKeyDown = (e) => {
    if(e.key ==="Enter") {
      handleSearchClick();
    }
  };  


  return (
    <div>
      
      <div>
        <Header
          pageTitle="메인"
          titleBg = "#D9017F"
        />
      </div>
    
      
      <div className="w-[70%] h-[650px] ml-[15%]">
      
        <div className="text-3xl text-[#333333] border-b-2 pb-4 font-bold">통합검색</div>


        <div className="border-2 h-[75px] pl-[25px] mt-[24px] flex justify-start items-center rounded-lg">
            <p className="font-bold text-xl">통합검색</p>
            <div className=" ml-[2.5%] w-[900px]">
              <input
                type="text"
                placeholder="메인에서 입력한 검색어 넣기"
                className="border-b-2 text-lg w-[103%] h-[40px]  focus:outline-none"
                value={search}  // 검색어 상태 바인딩
                onChange={(e) => setSearch(e.target.value)}  // 입력 필드에서만 상태 변경
                onKeyDown={handleKeyDown} // 엔터 키 입력 시 검색 실행
                maxLength={16}
              />
            </div>
              <div className="border-2  w-[110px] h-[43px] font-bold text-lg ml-[40px] flex justify-center items-center cursor-pointer rounded-lg hover:bg-gray-300 transiton duration-500" onClick={handleSearchClick}>검색</div>
              <div className="border-2  w-[110px] h-[43px] font-bold text-lg ml-[16px] flex justify-center items-center cursor-pointer rounded-lg hover:bg-gray-300 transiton duration-500" onClick={() => setSearch('')}>초기화</div>
        </div>

        <div className=" h-[100px] flex">

                <div className={`w-[50%] h-full border-b-2 border-gray-400 text-2xl text-[#666666] font-bold flex justify-center items-center cursor-pointer ${category === 'policy' ? 'text-gray-400 border-b-4' : ''}`} 
                  onClick={() => {
                    setCategory('policy');
                  }}>
                  청년관({policyTotalItems}) 
                  </div>

                  <div className={`w-[50%] h-full border-b-2 border-gray-400 text-2xl text-[#666666] font-bold flex justify-center items-center cursor-pointer ${category === 'community' ? 'text-gray-400 border-b-4' : ''}`} 
                  onClick={() => {
                    setCategory('community');
                    setCurrentPage(1);
                  }}>
                  커뮤니티({communityTotalItems}) 
                </div> 
        </div>


        
        <div className="h-[720px] mt-[1%]">

        {category === "policy" && policies.length === 0 ? (
          <div className="text-center text-gray-500 text-3xl pt-[20%] ml-[2%] ">
            검색어에 해당하는 청년관 데이터가 없습니다.
          </div>
         ) : category === "community" && communityPolicies.length === 0 ? (
          <div className="text-center text-gray-500 text-3xl pt-[20%] ml-[2%] ">
            검색어에 해당하는 커뮤니티 데이터가 없습니다.
          </div>
        ) : (


          <ul className="w-[1332px] h-[560px] grid grid-cols-4 gap-4">

{/* 청년관 */}
          {category === "policy" &&
            policies.map((item, index) => (
              <Link to={
                item.category === 'job' || item.category === 'house' 
                ? `/youth/${item.category}/policyRead/${item.id}` 
                : `/youth/${item.category}/${item.id}`}>
              <li key={item.id} 
                    className="flex justify-center items-center bg-white w-[321px] h-[176px] rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer border-2 border-gray-200 overflow-y-auto ">
                  <p className="text-lg font-bold text-gray-800 p-[20px]">
                    {index + (currentPage - 1) * 12 + 1}. {item.title}
                  </p>
              </li>
              </Link>
            ))}



{/* 커뮤니티 */}
        {category === "community" &&
          communityPolicies.map((item, index) => (
            <Link to={`/community/read/${item.id}`}>
            <li key={item.id} 
              className="flex justify-center items-center bg-white w-[321px] h-[176px] rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer border-2 border-gray-200 overflow-y-auto"
              onClick={(e) => {  
                if (
                  (getCookie("userRole") !== "ADMIN" &&
                  item.visibility &&
                  item.author_id !== getCookie("userId"))
                ) {
                  toast.error("열람 권한이 없습니다.");
                  e.stopPropagation();
                  e.preventDefault();
                }
              }}>
                   {item.visibility ? <FaLock /> : <></>}
                  <p className="text-lg font-bold text-gray-800 p-[20px]">
                    {index + (currentPage - 1) * 12 + 1}. {item.title} {/* item.title로 제목을 출력 */}
                  </p>
              </li>
              </Link>
            ))}
        </ul>
      )}








         {/* 페이징 버튼 */}
      {(category === "policy" && policies.length > 0) || (category === "community" && communityPolicies.length > 0) ? (
        <div className="flex justify-center mt-[2%]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6"
          >
            &lt;
          </button>

          {pageRange().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 font-bold ${
                currentPage === page ? "text-[#6F00FF]" : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-6"
          >
             &gt;
          </button>
        </div>
      ) : null}
      
        </div>
      </div>




      <div className="mt-[300px]"> 
          <Footer/>
      </div>

    </div>
  );
};

export default AllSearch;
