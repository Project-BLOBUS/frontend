import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import usePostData from "../hook/usePostData";
import Pagination from "./Pagination";
import Header from "../../main/Header";
import "../css/communityStyles.css";

const ListComponent = ({ posts = [] }) => {
  const community = [
    { name: "청년", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "커뮤니티", link: "../community" },
    { name: "지역자원", link: "../resource" },
  ];

  const [page, setPage] = useState(1);
  const [size] = useState(10); // 페이지당 항목 개수
  const [tab, setTab] = useState("FREE"); // `BoardType` Enum에 맞춰 초기값 설정
  const [category, setCategory] = useState("YOUTH"); // `UserType` Enum에 맞춰 초기값 설정
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false); // 검색 입력 포커스 여부

  const { data, loading, error } = usePostData({
    page,
    size,
    tab,
    category,
    searchTerm,
  });

  // 필터링된 게시글 리스트
  const filteredPosts = posts.filter(
    (post) =>
      post.userType === category && // `UserType` 기반 필터링
      post.boardType === tab && // `BoardType` 기반 필터링
      (searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 로컬 스토리지에서 검색 이력 불러오기
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);
  }, []);

  // 검색어를 저장하고, 최근 5개의 검색어만 보관
  const handleSearch = () => {
    if (searchTerm.trim()) {
      const updatedHistory = [searchTerm, ...searchHistory].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setPage(1); // 검색 후 페이지를 1로 리셋
    }
  };

  // 최근 검색어 클릭 시 검색어 입력란에 반영
  const handleSelectHistory = (term) => {
    setSearchTerm(term);
    setIsSearchFocused(true); // 입력란 포커스 유지
  };

  // 검색된 단어 강조 표시
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
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          to={`/detail/${post.id}`}
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
          currentPage={data?.current || 1}
          totalPage={data?.totalPage || 1}
          movePage={setPage}
        />

        {/* 게시글 작성 버튼 */}
        <div className="write-post">
          <Link to="/add">
            <button className="write-post-button">게시글 작성</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
