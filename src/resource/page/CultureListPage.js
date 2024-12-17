import React, { useState, useEffect } from "react";
import CultureListComponent from "../component/CultureListComponent";
import CultureSearchBar from "../component/ResourceSearchBar";
import Data_mu from "../json/response.json";
import Data_dan from "../json/response-dan.json";
import Data_op from "../json/response-op.json";
import Data_tht from "../json/response-tht.json";
import Data_trd from "../json/response-trd.json";

const CulturePage = () => {
  const allData = [
    ...(Data_mu?.response?.body?.items?.item || []).map((item) => ({
      ...item,
      category: "뮤지컬",
    })),
    ...(Data_dan?.response?.body?.items?.item || []).map((item) => ({
      ...item,
      category: "무용",
    })),
    ...(Data_op?.response?.body?.items?.item || []).map((item) => ({
      ...item,
      category: "오페라",
    })),
    ...(Data_tht?.response?.body?.items?.item || []).map((item) => ({
      ...item,
      category: "연극",
    })),
    ...(Data_trd?.response?.body?.items?.item || []).map((item) => ({
      ...item,
      category: "전통",
    })),
  ];

  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filterType, setFilterType] = useState("title"); // 검색 필터
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 카테고리
  const [filteredData, setFilteredData] = useState(allData); // 필터링된 데이터

  const categories = ["전체", "뮤지컬", "무용", "오페라", "연극", "전통"];

  // 카테고리 판별 함수
  const categorize = (item) => {
    return item.category || "기타";
  };

  // 검색 및 카테고리 필터링
  const handleFilter = () => {
    const filtered = allData.filter((item) => {
      const titleMatch = item.title?._text
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const placeMatch = item.place_nm?._text
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      // 선택된 카테고리와 일치하는 항목만 필터링
      const categoryMatch =
        selectedCategory === "전체" || categorize(item) === selectedCategory;

      if (filterType === "title") return titleMatch && categoryMatch;
      if (filterType === "place_nm") return placeMatch && categoryMatch;
      if (filterType === "both")
        return (titleMatch || placeMatch) && categoryMatch;

      return categoryMatch;
    });

    setFilteredData(filtered);
  };

  // 카테고리 선택 핸들러
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // 검색어 업데이트 핸들러
  const handleSearch = () => {
    handleFilter();
  };

  // selectedCategory가 변경될 때마다 필터링을 수행
  useEffect(() => {
    handleFilter();
    console.log(allData);
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 필터링 실행

  // 최상단으로 스크롤하는 함수
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤 이동
    });
  };

  return (
    <div className="container mx-auto grid">
      <div className="h-2/3">
        <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-b-gray-200">
          문화
        </h1>
      </div>
      {/* 검색 영역 */}
      <CultureSearchBar
        searchTitle="문화 검색"
        searchTerm={searchTerm}
        filterType={filterType}
        onSearch={handleSearch}
        onSearchTermChange={setSearchTerm}
        onFilterChange={setFilterType}
      />

      {/* 상단 카테고리 버튼 */}
      <div className="flex justify-center space-x-4 my-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 리스트 영역 */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {filteredData.length > 0 ? (
          filteredData.map((culture, index) => (
            <CultureListComponent key={index} culture={culture} />
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-600">
            검색 결과가 없습니다.
          </p>
        )}
      </div>

      {/* 최상단으로 스크롤 버튼 */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-4 right-4 bg-[#6F00FF] text-white p-3 rounded-full shadow-lg"
      >
        ▲
      </button>
    </div>
  );
};

export default CulturePage;
