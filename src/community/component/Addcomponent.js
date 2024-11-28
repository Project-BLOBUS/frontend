import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../main/Header";
import "../css/communityStyles.css";
import "../css/addStyles.css";

const FreeBoard = ({ addPost, category }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCancel = () => {
    if (window.confirm("작성된 내용이 사라집니다. 계속하시겠습니까?")) {
      navigate("/community");
    }
  };

  const handleRegister = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    addPost({
      title,
      content,
      category,
      boardType: "free",
      createdAt: new Date().toLocaleString(),
    });
    setTitle("");
    setContent("");
    alert("게시글이 등록되었습니다.");
    navigate("/community"); // 게시글 리스트로 이동
  };

  return (
    <div>
      <h2>자유 게시판 - {category}</h2>
      <div>
        <label>
          제목 입력:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          내용 입력:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleRegister} style={{ marginRight: "10px" }}>
          등록
        </button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

const SuggestionBoard = ({ addPost, category }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [visibility, setVisibility] = useState("비공개");

  const handleCancel = () => {
    if (window.confirm("작성된 내용이 사라집니다. 계속하시겠습니까?")) {
      navigate("/community");
    }
  };

  const handleRegister = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    addPost({
      title,
      content,
      email,
      visibility,
      category,
      boardType: "suggestion",
      createdAt: new Date().toLocaleString(),
    });
    setTitle("");
    setContent("");
    setEmail("");
    alert("게시글이 등록되었습니다.");
    navigate("/community"); // 게시글 리스트로 이동
  };

  return (
    <div>
      <h2>건의 게시판 - {category}</h2>
      <div>
        <label>
          제목 입력:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          내용 입력:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          이메일 입력:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", margin: "10px 0" }}
          />
        </label>
      </div>
      <div>
        <label>
          공개 여부:
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="공개">공개</option>
            <option value="비공개">비공개</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleRegister} style={{ marginRight: "10px" }}>
          등록
        </button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

const AddComponent = ({ addPost }) => {
  const [boardType, setBoardType] = useState("free");
  const [category, setCategory] = useState("청년");

  const community = [
    { name: "청년", value: "청년" },
    { name: "기업관", value: "기업관" },
  ];

  return (
    <div>
      {/* 헤더 섹션 */}
      <div className="header-container">
        <Header
          navs={[
            { name: "청년", link: "../youth" },
            { name: "기업관", link: "../enterprise" },
            { name: "커뮤니티", link: "../community" },
            { name: "지역자원", link: "../resource" },
          ]}
          isWhite={true}
          pageTitle="커뮤니티"
          titleBg="#A1003C"
          borderB={false}
        />
      </div>

      {/* 게시판 및 카테고리 선택 */}
      <div style={{ padding: "20px" }}>
        <h1>게시판 및 카테고리 선택</h1>
        <div style={{ marginBottom: "20px" }}>
          <h3>카테고리 선택</h3>
          {community.map((item) => (
            <button
              key={item.value}
              onClick={() => setCategory(item.value)}
              style={{
                marginRight: "10px",
                backgroundColor: category === item.value ? "#ddd" : "#fff",
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h3>게시판 선택</h3>
          <button
            onClick={() => setBoardType("free")}
            style={{
              marginRight: "10px",
              backgroundColor: boardType === "free" ? "#ddd" : "#fff",
            }}
          >
            자유 게시판
          </button>
          <button
            onClick={() => setBoardType("suggestion")}
            style={{
              backgroundColor: boardType === "suggestion" ? "#ddd" : "#fff",
            }}
          >
            건의 게시판
          </button>
        </div>

        {/* 게시판 렌더링 */}
        {boardType === "free" ? (
          <FreeBoard addPost={addPost} category="자유게시판" />
        ) : (
          <SuggestionBoard addPost={addPost} category="건의게시판" />
        )}
      </div>
    </div>
  );
};

export default AddComponent;
