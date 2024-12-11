import React, { useState, useEffect } from "react";
import PolicySearchBar from "../components/PolicySearchBar";
import PolicyListComponent from "../components/PolicyListComponent";
import { policyList } from "../api/houseApi";
import useCustomMove from "../hooks/useCustomMove";
import PageComponent from "../components/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const PolicyListPage = ({ title }) => {
  const [serverData, setServerData] = useState(initState); // 전체 정책 리스트
  const [filteredServerData, setFilteredServerData] = useState([]); // 필터된 정책 리스트
  const [searchTerm, setSearchTerm] = useState(""); // 검색 키워드
  const [filterType, setFilterType] = useState("polyBizSjnm"); // 검색 필터타입
  const [policyStsType, setPolicyStsType] = useState("stsAll"); // 상태필터 타입
  const [searchTrigger, setSearchTrigger] = useState(false); // 검색 트리거 상태

  const { page, size, refresh, moveToPolicyList } = useCustomMove(); //refresh

  useEffect(() => {
    policyList({ page, size, policyStsType, searchTerm, filterType })
      .then((data) => {
        setServerData(data);
        setFilteredServerData(data.dtoList); // 초기 필터목록은 전체 데이터
      })
      .catch((error) => console.error("데이터 가져오기 실패:", error))
      .finally(() => setSearchTrigger(false)); // 데이터 요청 완료 후 트리거 상태 초기화
  }, [page, size, refresh, searchTrigger]);

  // 필터 타입 업데이트 함수
  const handleFilterChange = (filter) => {
    if (filter.includes("sts")) {
      // 상태필터(전체/진행중/마감)
      setPolicyStsType(filter);
    } else {
      // 유형필터(제목/내용/제목+내용)
      setFilterType(filter);
    }
  };

  // 필터링 및 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    const filtered = serverData.dtoList.filter((policy) => {
      const titleMatch = policy.polyBizSjnm
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const contentMatch = policy.polyItcnCn
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (filterType === "polyBizSjnm") return titleMatch;
      if (filterType === "polyItcnCn") return contentMatch;
      if (filterType === "both") return titleMatch || contentMatch;

      return true; // 필터 타입 선택 안 됐을 경우 전체 데이터 반환
    });

    setFilteredServerData(filtered);
    setSearchTrigger(true); // 검색 트리거를 true로 설정하여 useEffect 실행
    moveToPolicyList(1); // 검색버튼 누를때마다 1 페이지로 이동
  };

  return (
    <>
      {/* 정책 검색 영역 */}
      <PolicySearchBar
        searchTitle={"주거 정책"}
        policyStsType={policyStsType}
        searchTerm={searchTerm}
        filterType={filterType}
        onSearch={handleSearch}
        onSearchTermChange={setSearchTerm}
        onFilterChange={handleFilterChange}
      />

      {/* 정책 리스트 영역 */}
      <div className="grid grid-cols-4 gap-4">
        {filteredServerData.length > 0 ? (
          filteredServerData.map((policy) => (
            <PolicyListComponent key={policy.policyId} policy={policy} />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToPolicyList}
      ></PageComponent>
    </>
  );
};

export default PolicyListPage;
