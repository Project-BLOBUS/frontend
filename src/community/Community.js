import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../main/Header";
import "./css/communityStyles.css";

function Community() {
  const community = [
    { name: "청년", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "커뮤니티", link: "../community" },
    { name: "지역자원", link: "../resource" },
  ];

  const [tab, setTab] = useState("free");
  const [category, setCategory] = useState("youth");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]); // 최근 검색어

  const fetchPosts = async () => {
    if (searchTerm.trim()) {
      // 검색어가 비어있지 않을 때만 기록
      setRecentSearches((prev) => {
        const updated = [
          searchTerm,
          ...prev.filter((term) => term !== searchTerm),
        ];
        return updated.slice(0, 5); // 최근 5개만 유지
      });
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/posts", {
        params: {
          tab,
          category,
          searchTerm,
          page: currentPage,
        },
      });
      // 서버 응답 데이터를 확인하여 상태 업데이트
      if (response.data) {
        setPosts(response.data);
      } else {
        setError("No posts found");
      }
    } catch (err) {
      setError("서버 오류: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    // 검색 창 클릭 시 검색어 기록 표시
    document.querySelector(".recent-searches").style.display = "block";
  };

  const handleSearchBlur = () => {
    // 검색 창에서 포커스가 사라지면 기록 숨김
    setTimeout(() => {
      document.querySelector(".recent-searches").style.display = "none";
    }, 200); // 클릭 처리 시간 확보
  };

  useEffect(() => {
    fetchPosts();
  }, [tab, category, currentPage, searchTerm]); // 검색어 변화도 반영

  return (
    <div>
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
              onFocus={handleSearchClick}
              onBlur={handleSearchBlur}
            />
            <button onClick={fetchPosts} className="search-button">
              검색
            </button>
            <div className="recent-searches">
              {recentSearches.length > 0 ? (
                recentSearches.map((term, index) => (
                  <div
                    key={index}
                    className="search-item"
                    onClick={() => setSearchTerm(term)}
                  >
                    {term}
                  </div>
                ))
              ) : (
                <div className="no-search">최근 검색 기록 없음</div>
              )}
            </div>
          </div>
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
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <tr key={post.id}>
                      <td>{index + 1 + (currentPage - 1) * 10}</td>
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
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              이전
            </button>
            <span>{currentPage}</span>
            <button onClick={() => setCurrentPage((prev) => prev + 1)}>
              다음
            </button>
          </div>
        </div>
      </div>
      <div className="write-post">
        <button
          className="write-post-button"
          onClick={() => alert("게시글 작성 페이지로 이동")}
        >
          게시글 작성
        </button>
      </div>
    </div>
  );
}

export default Community;
