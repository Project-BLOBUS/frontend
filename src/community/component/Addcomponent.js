import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../main/Header";
import "../css/communityStyles.css";
import "../css/addStyles.css";

const FreeBoard = ({ addPost }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // try {
  //   // 게시글 데이터 백엔드로 전송
  //   await createPost({ title, content });
  //   alert("게시글이 성공적으로 등록되었습니다!");
  //   navigate("/list"); // 목록 페이지로 이동
  // } catch (error) {
  //   console.error("게시글 등록 실패", error);
  //   alert("게시글 등록 중 오류가 발생했습니다.");
  // }

  const handleCancel = () => {
    if (window.confirm("작성된 내용이 사라집니다. 계속하시겠습니까?")) {
      navigate("/list");
    }
  };

  const handleRegister = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    addPost({ title, content, createdAt: new Date().toLocaleString() });
    setTitle("");
    setContent("");
    alert("게시글이 등록되었습니다.");
  };

  return (
    <div>
      <h2>자유 게시판</h2>
      <div>
        <label>
          제목 입력 칸:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          내용 입력 칸:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleRegister}>등록</button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

const SuggestionBoard = ({ addPost }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("비활성화");
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    setIsEmailEnabled(value === "활성화");
  };

  const handleCancel = () => {
    if (window.confirm("작성된 내용이 사라집니다. 계속하시겠습니까?")) {
      navigate("/list");
    }
  };

  const handleRegister = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    const post = {
      title,
      content,
      email: isEmailEnabled ? email : null,
      status,
      createdAt: new Date().toLocaleString(),
    };
    addPost(post);
    setTitle("");
    setContent("");
    setEmail("");
    alert("게시글이 등록되었습니다.");
  };

  return (
    <div>
      <h2>건의 게시판</h2>
      <div>
        <label>
          제목 입력 칸:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          내용 입력 칸:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          이메일 입력 칸:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", margin: "10px 0" }}
            disabled={!isEmailEnabled}
          />
        </label>
      </div>
      <div>
        <label>
          상태:
          <select
            value={status}
            onChange={handleStatusChange}
            style={{ marginLeft: "10px" }}
          >
            <option value="활성화">활성화</option>
            <option value="비활성화">비활성화</option>
          </select>
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleRegister} style={{ marginRight: "10px" }}>
          등록
        </button>
        <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};

const AddComponent = () => {
  const [boardType, setBoardType] = useState("free");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const community = [
    { name: "청년", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "커뮤니티", link: "../community" },
    { name: "지역자원", link: "../resource" },
  ];

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

      <div style={{ padding: "20px" }}>
        <h1>게시판 선택</h1>
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setBoardType("free")}
            style={{ marginRight: "10px" }}
          >
            자유 게시판
          </button>
          <button onClick={() => setBoardType("suggestion")}>
            건의 게시판
          </button>
        </div>
        {boardType === "free" ? (
          <FreeBoard addPost={addPost} />
        ) : (
          <SuggestionBoard addPost={addPost} />
        )}
      </div>

      <div>
        <h2>게시물 리스트</h2>
        {posts.length === 0 ? (
          <p>등록된 게시물이 없습니다.</p>
        ) : (
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{post.createdAt}</small>
                {post.email && <p>이메일: {post.email}</p>}
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddComponent;
