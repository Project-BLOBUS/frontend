import React from "react";

const PolicySearchBar = ({
  title,
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

  return (
    <div className="border-2 border-gray-200 rounded-md p-4 bg-white mb-5">
      <div className="flex items-center space-x-4">
        <p className="w-28 text-center text-xl font-semibold text-gray-700">
          {title}
        </p>
        <select
          className="h-10 border-2 border-gray-300 rounded-md p-2 text-sm focus:outline-none"
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="both">제목+내용</option>
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
          className="bg-[#6F00FF] text-white px-8 py-2 rounded-md hover:bg-[#420099] transition-colors duration-500"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default PolicySearchBar;
