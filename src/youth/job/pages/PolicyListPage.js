import React, { useState, useEffect } from "react";
import PolicySearchBar from "../components/PolicySearchBar";
import PolicyListComponent from "../components/PolicyListComponent";
import { fetchPolicyList } from "../api/jobApi";

const PolicyListPage = ({ title }) => {
  const [policies, setPolicies] = useState([]); // 전체 정책 목록
  const [filteredPolicies, setFilteredPolicies] = useState([]); // 필터된 정책 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [filterType, setFilterType] = useState("title"); // 필터 타입 상태

  // 정책 목록 가져오기
  useEffect(() => {
    fetchPolicyList()
      .then((data) => {
        setPolicies(data);
        setFilteredPolicies(data); // 초기 필터 목록은 전체 데이터
      })
      .catch((error) => console.error("데이터 가져오기 실패:", error));
  }, []);

  // 필터 타입 업데이트 함수
  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  // 필터링 및 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    const filtered = policies.filter((policy) => {
      const titleMatch = policy.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const contentMatch = policy.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (filterType === "title") return titleMatch;
      if (filterType === "content") return contentMatch;
      if (filterType === "both") return titleMatch || contentMatch;

      return true; // 필터 타입 선택 안 됐을 경우 전체 데이터 반환
    });

    setFilteredPolicies(filtered);
  };

  return (
    <>
      {/* 정책 검색 영역 */}
      <PolicySearchBar
        title={"일자리 정책"}
        searchTerm={searchTerm}
        filterType={filterType}
        onSearch={handleSearch}
        onSearchTermChange={setSearchTerm}
        onFilterChange={handleFilterChange}
      />

      {/* 정책 리스트 영역 */}
      <div className="grid grid-cols-4 gap-4">
        {console.log("filteredPolicies", { filteredPolicies })}
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy) => (
            <PolicyListComponent key={policy.id} policy={policy} />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default PolicyListPage;
