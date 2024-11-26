import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../main/Header";
// import "../css/detailStyles.css";

const DetailComponent = ({ posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === parseInt(id));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const community = [
    { name: "청년", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "커뮤니티", link: "../community" },
    { name: "지역자원", link: "../resource" },
  ];

  // 댓글 추가
  const addComment = () => {
    if (newComment.trim() === "") return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        author: "작성자명", // 수정 필요
        content: newComment,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setNewComment("");
  };

  // 댓글 삭제
  const deleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  // 게시글 삭제
  const deletePost = () => {
    alert("게시글이 삭제되었습니다."); // 실제 삭제 로직 추가 필요
    navigate("/community");
  };

  return (
    <div className="page-container">
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

      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <div className="post-container">
        <p>작성자명: {post?.email}</p>
        <p>작성일자: {post?.createdAt}</p>
        <div className="post-header">
          <h3>{post?.title}</h3>
          <p>{post?.content}</p>
          <button onClick={deletePost}>삭제</button>
        </div>
      </div>

      <div className="comment-section">
        <textarea
          placeholder="댓글 입력 칸"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button onClick={addComment}>등록</button>
        <button onClick={() => setNewComment("")}>취소</button>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div>
              <p>{comment.author}</p>
              <p>{comment.content}</p>
            </div>
            <div>
              <p>{comment.createdAt}</p>
              <button onClick={() => deleteComment(comment.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailComponent;
