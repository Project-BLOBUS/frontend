import React from "react";

const PolicySearchBar = ({
  policyStsType,
  searchTerm,
  filterType,
  onSearch,
  onSearchTermChange,
  onFilterChange,
}) => {
  // 검색어 입력 핸들러
  const handleSearchInputChange = (e) => {
    onSearchTermChange(e.target.value); // 부모 컴포넌트로 검색어 전달
  };

  // 필터 변경 핸들러
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value); // 부모 컴포넌트로 필터 타입 전달
  };

  // 초기화 버튼 핸들러
  const onClear = () => {
    onSearchTermChange(""); // 검색어 초기화
  };

  return (
    <>
      <div className="border-2 border-gray-200 rounded-md p-4 bg-white mb-5">
        <div className="flex items-center space-x-4">
          <label className="font-bold text-gray-800">진행상태</label>
          <select
            className="w-24 h-10 border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none"
            value={policyStsType}
            onChange={handleFilterChange}
          >
            <option value="stsAll">전체</option>
            <option value="stsOngoing">진행중</option>
            <option value="stsClosed">마감</option>
          </select>
          <label className="font-bold text-gray-800">검색범위</label>
          <select
            className="w-24 h-10 border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="both">전체</option>
            <option value="polyBizSjnm">제목</option>
            <option value="polyItcnCn">내용</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
                e.preventDefault(); // 기본 Enter 동작(폼 제출 등) 방지
              }
            }}
            className="h-10 flex-grow border-b-2 border-b-gray-300 p-2 text-sm bg-inherit focus:outline-none"
          />
          <button
            onClick={onSearch}
            className="w-24 bg-[#6F00FF] hover:bg-[#420099] text-white font-bold py-2 rounded-md transition-colors duration-500"
          >
            검색
          </button>
          <button
            onClick={onClear}
            className="w-24 bg-[#6F00FF] hover:bg-[#420099] text-white font-bold py-2 rounded-md transition-colors duration-500"
          >
            초기화
          </button>
        </div>
      </div>
    </>
  );
};

export default PolicySearchBar;
