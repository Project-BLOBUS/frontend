import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import usePostData from "../hook/usePostData";
import Pagination from "./Pagination";
import Header from "../../main/Header";
import "../css/communityStyles.css";
import { getPosts } from "../api/communityApi";

const ListComponent = () => {
  const community = [
    { name: "청년", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "커뮤니티", link: "../community" },
    { name: "지역자원", link: "../resource" },
  ];

  const initState = {
    content: [],
  };

  const [page, setPage] = useState(0); // 페이지 상태
  const [size] = useState(10); // 페이지당 항목 개수
  const [tab, setTab] = useState("FREE"); // 게시판 유형 (탭)
  const [category, setCategory] = useState("YOUTH"); // 카테고리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [searchHistory, setSearchHistory] = useState([]); // 검색 기록
  const [isSearchFocused, setIsSearchFocused] = useState(false); // 검색바 포커스 상태
  const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시글 리스트

  const totalPage = 10;

  // 검색 후 페이지 이동
  const movePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      setPage(pageNumber);
    }
  };

  // `usePostData` 훅을 사용하여 게시글 데이터 가져오기
  const { data, loading, error } = usePostData({
    page,
    size,
    tab,
    category,
  });

  useEffect(() => {
    // 데이터 변경시 게시글 리스트 필터링
    if (data.dtoList) {
      const newFilteredPosts = data.dtoList.filter(
        (post) =>
          post.userType === category &&
          post.boardType === tab &&
          (searchTerm === "" ||
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPosts(newFilteredPosts);
    }
  }, [data.dtoList, category, tab, searchTerm]); // 의존성 배열에 변경될 값 포함

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
    getPosts({ page, size, tab, category }).then((data) => {
      // 페이지와 필터 상태 변경시 데이터를 가져와 업데이트
      setFilteredPosts(data.content);
    });
  }, [page, size, tab, category]); // 페이지, 카테고리, 탭 변경시 데이터 로드

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const updatedHistory = [searchTerm, ...searchHistory].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      movePage(1); // 검색 후 페이지 리셋
    }
  };

  const handleSelectHistory = (term) => {
    setSearchTerm(term);
    setIsSearchFocused(true);
  };

  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="header-container">
        <Header
          navs={community}
          isWhite={true}
          pageTitle="커뮤니티"
          titleBg="#A1003C"
          borderB={false}
        />
      </div>

      {/* 컨트롤 패널 */}
      <div className="main-container">
        <div className="control-panel">
          <div className="tabs">
            <button
              className={`tab-button ${tab === "FREE" ? "active" : ""}`}
              onClick={() => setTab("FREE")}
            >
              자유 게시판
            </button>
            <button
              className={`tab-button ${tab === "SUGGESTION" ? "active" : ""}`}
              onClick={() => setTab("SUGGESTION")}
            >
              건의 게시판
            </button>
          </div>
          <div className="categories">
            <button
              className={`category-button ${
                category === "YOUTH" ? "active" : ""
              }`}
              onClick={() => setCategory("YOUTH")}
            >
              청년
            </button>
            <button
              className={`category-button ${
                category === "CORPORATE" ? "active" : ""
              }`}
              onClick={() => setCategory("CORPORATE")}
            >
              기업관
            </button>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button onClick={handleSearch} className="search-button">
              검색
            </button>
          </div>

          {/* 최근 검색어 */}
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

        {/* 게시글 리스트 */}
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
                  <th>작성자 ID</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <tr key={index}>
                      <td>{page * size + index + 1}</td>
                      <td>
                        <Link
                          to={`/community/detail/${post.id}`}
                          dangerouslySetInnerHTML={{
                            __html: highlightText(post.title, searchTerm),
                          }}
                        ></Link>
                      </td>
                      <td>{post.authorId}</td>
                      <td>{post.createdAt}</td>
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

        {/* 페이지네이션 */}
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          movePage={movePage}
        />

        {/* 게시글 작성 버튼 */}
        <div className="write-post">
          <Link to="/community/add">
            <button className="write-post-button">게시글 작성</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
