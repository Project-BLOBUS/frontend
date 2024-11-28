import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../main/Header";
import { getdetail } from "../api/communityApi";
import "../css/detailStyles.css";

const DetailComponent = () => {
  const { id } = useParams(); // URL 파라미터로부터 게시글 ID 가져오기
  const navigate = useNavigate();

  const [post, setPost] = useState(null); // 게시글 상세 정보
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(""); // 새 댓글

  // 게시글 상세 정보 불러오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const detail = await getdetail(id); // useParams에서 가져온 id 전달
        setPost(detail); // 가져온 데이터를 상태로 설정
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
    fetchPostDetail();
  }, [id]);

  // 새 댓글 추가
  const addComment = () => {
    if (newComment.trim() === "") return;
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        authorId: "작성자명", // 이 부분은 실제 API에서 가져오는 값으로 대체 가능
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
    alert("게시글이 삭제되었습니다.");
    navigate("/community");
  };

  if (!post) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div>
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

      <div className="post-detail">
        <button className="back-button" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
        <p>
          게시글: {post.tab}-{post.category}
        </p>
        <p className="info">작성자명: {post.authorId}</p>{" "}
        {/* 작성자명, 실제 데이터로 변경 */}
        <p className="info">작성일자: {post.createdAt}</p>
        <h3 className="title">{post.title}</h3>
        <p className="content">{post.content}</p>
        <div className="delete-button">
          <button onClick={deletePost}>삭제</button>
        </div>
      </div>

      <div className="comments-section">
        <div className="comment-input">
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
            <div key={comment.id} className="comment">
              <span>{comment.author}</span>
              <p>{comment.content}</p>
              <span>{comment.createdAt}</span>
              <button onClick={() => deleteComment(comment.id)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
