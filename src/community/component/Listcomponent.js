import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // useNavigate 대신 Link 사용
import usePostData from "../hook/usePostData";
import Pagination from "./Pagination";
import Header from "../../main/Header";
// import { getPosts } from "../../api/postApi"; // 게시글 API 호출 함수 import
import "../css/communityStyles.css"; // CSS 연결

const ListComponent = () => {
  const community = [
    { name: "청년", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "커뮤니티", link: "../community" },
    { name: "지역자원", link: "../resource" },
  ];

  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [tab, setTab] = useState("free");
  const [category, setCategory] = useState("youth");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false); // 입력칸이 포커스 되었는지 여부

  const { data, loading, error } = usePostData({
    page,
    size,
    tab,
    category,
    searchTerm,
  });

  // 로컬 스토리지에서 검색 이력 불러오기
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  // 검색어를 저장하고, 최근 5개의 검색어만 보관
  const handleSearch = () => {
    if (searchTerm.trim()) {
      const updatedHistory = [searchTerm, ...searchHistory].slice(0, 5); // 최신 검색어를 앞에 추가하고, 최대 5개까지만 저장
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setPage(1); // 검색 후 페이지 1로 리셋
    }
  };

  // 최근 검색어 클릭 시 검색어 입력란에 해당 검색어 삽입
  const handleSelectHistory = (term) => {
    setSearchTerm(term); // 클릭된 검색어를 입력칸에 삽입
    setIsSearchFocused(true); // 입력칸 포커스 유지
  };

  return (
    <div>
      {/* 헤더 추가 */}
      <div className="header-container">
        <Header
          navs={community}
          isWhite={true}
          pageTitle="커뮤니티"
          titleBg="#A1003C"
          borderB={false}
        />
      </div>

      <div className="main-container">
        <div className="control-panel">
          <div className="tabs">
            <button
              className={`tab-button ${tab === "free" ? "active" : ""}`}
              onClick={() => setTab("free")}
            >
              자유 게시판
            </button>
            <button
              className={`tab-button ${tab === "suggestion" ? "active" : ""}`}
              onClick={() => setTab("suggestion")}
            >
              건의 게시판
            </button>
          </div>
          <div className="categories">
            <button
              className={`category-button ${
                category === "youth" ? "active" : ""
              }`}
              onClick={() => setCategory("youth")}
            >
              청년
            </button>
            <button
              className={`category-button ${
                category === "company" ? "active" : ""
              }`}
              onClick={() => setCategory("company")}
            >
              기업
            </button>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)} // 입력칸 클릭 시 목록 표시
              onBlur={() => setIsSearchFocused(false)} // 입력칸 클릭 해제 시 목록 숨기기
            />
            <button onClick={handleSearch} className="search-button">
              검색
            </button>
          </div>

          {/* 검색어 입력칸이 포커스 되었을 때만 최근 검색어 목록 보이기 */}
          {isSearchFocused && (
            <div className="search-history">
              <h4>최근 검색어</h4>
              <ul>
                {searchHistory.map((term, index) => (
                  <li key={index} onClick={() => handleSelectHistory(term)}>
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="post-list">
          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <table className="post-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {data?.dtoList?.length > 0 ? (
                  data.dtoList.map((post, index) => (
                    <tr key={post.id}>
                      <td>{index + 1 + (page - 1) * size}</td>
                      <td>{post.title}</td>
                      <td>{post.author}</td>
                      <td>{post.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">게시글이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={data.current}
          totalPage={data.totalPage}
          movePage={setPage}
        />

        <div className="write-post">
          {/* Link 컴포넌트를 사용하여 AddComponent로 이동 */}
          <Link to="/add">
            <button className="write-post-button">게시글 작성</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
