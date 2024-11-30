import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Header from "../../main/Header";
import "../css/communityStyles.css";
import { getPosts } from "../api/communityApi"; // API 호출 함수 가져오기

const ListComponent = () => {
  const community = [
    { name: "청년", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "커뮤니티", link: "../community" },
    { name: "지역자원", link: "../resource" },
  ];

  const initState = {
    content: [],
    totalElements: 0,
  };

  const [page, setPage] = useState(1); // 현재 페이지
  const [size] = useState(10); // 페이지당 항목 수
  const [tab, setTab] = useState("FREE"); // 게시판 유형
  const [category, setCategory] = useState("YOUTH"); // 카테고리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [searchHistory, setSearchHistory] = useState([]); // 검색 기록
  const [isSearchFocused, setIsSearchFocused] = useState(false); // 검색바 포커스 상태
  const [postData, setPostData] = useState(initState); // 데이터 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [filteredPosts, setFilteredPosts] = useState([]); // 검색어에 맞는 필터링된 게시글
  const [totalPage, setTotalPage] = useState(1); // 전체 페이지 수

  // 데이터 로드 함수 (검색어와 페이지 번호 포함)
  const fetchPostData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPosts({
        page: page - 1, // API 페이지는 0부터 시작
        size,
        tab,
        category,
        search: searchTerm, // 검색어 포함
      });

      if (response) {
        setPostData(response);
        const totalElements = response.totalElements || 0;
        const calculatedTotalPage = Math.ceil(totalElements / size);
        setTotalPage(calculatedTotalPage > 0 ? calculatedTotalPage : 1); // 최소 1페이지 지정
      }
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 검색 기록 관리
  const handleSearch = () => {
    if (searchTerm.trim()) {
      const updatedHistory = [searchTerm, ...searchHistory].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setPage(1); // 검색 후 페이지 리셋
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

  // 데이터 로드 트리거 (페이지, 탭, 카테고리, 검색어가 변경될 때마다 호출)
  useEffect(() => {
    fetchPostData();
  }, [page, tab, category, searchTerm]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    // 데이터가 로드된 후, 검색어로 필터링 처리
    if (searchTerm) {
      const filtered = postData.content.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(postData.content);
    }
  }, [postData, searchTerm]);

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
                      <td>{(page - 1) * size + index + 1}</td>
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
                    <td colSpan="4">검색된 게시글이 없습니다.</td>
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
          movePage={setPage}
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
