import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../../etc/util/cookieUtil";
import { getPost, deletePost } from "../api/postAPI";
import { deleteComment, registerComment } from "../api/commentAPI";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../../etc/component/Loading";
import { div } from "framer-motion/client";

const initPost = {
  id: 0,
  authorId: "",
  authorName: "",
  authorEmail: "",
  boadrType: "",
  category: "",
  title: "",
  content: "",
  toEmail: false,
  visibility: false,
  createdAt: "--T::",
  updatedAt: "--T::",
  commentList: [],
};

const initComment = {
  id: 0,
  authorId: "",
  authorName: "",
  content: "",
  visibility: false,
  postId: 0,
  reload: false,
};

const Read = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { makeBtn } = useCustomTag();

  const [post, setPost] = useState(initPost);
  const [comment, setComment] = useState(initComment);
  const [hover, setHover] = useState(false);
  const refContent = useRef(null);

  useEffect(() => {
    setLoading(true);

    setComment({
      ...comment,
      authorId: getCookie("userId"),
      authorName: getCookie("name"),
      postId: id,
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    getPost(id)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("데이터를 불러오지 못했습니다. : ", error);
      });

    setLoading(false);
  }, [id, comment]);

  const printDate = (dateTime) => {
    const year = dateTime.split("T")[0].split("-")[0];
    const month = dateTime.split("T")[0].split("-")[1];
    const date = dateTime.split("T")[0].split("-")[2];

    const hour = dateTime.split("T")[1].split(":")[0];
    const min = dateTime.split("T")[1].split(":")[1];
    const sec = Math.floor(dateTime.split("T")[1].split(":")[2], 0);

    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
  };

  const printTime = (dateTime) => {
    const year = dateTime.split("T")[0].split("-")[0];
    const month = dateTime.split("T")[0].split("-")[1];
    const date = dateTime.split("T")[0].split("-")[2];

    const diff = new Date() - new Date(dateTime);

    if (diff > 365 * 24 * 60 * 60 * 1000) {
      return year + "-" + month;
    } else if (diff > 14 * 24 * 60 * 60 * 1000) {
      return month + "/" + date;
    } else if (diff > 24 * 60 * 60 * 1000) {
      return Math.round(diff / 24 / 60 / 60 / 1000, 0) + "일 전";
    } else if (diff > 60 * 60 * 1000) {
      return Math.round(diff / 60 / 60 / 1000, 0) + "시간 전";
    } else if (diff > 60 * 1000) {
      return Math.round(diff / 60 / 1000, 0) + "분 전";
    } else if (diff > 1000) {
      return Math.round(diff / 1000, 0) + "초 전";
    }
  };

  const onClickAddComment = async (comment) => {
    setLoading(true);

    if (!getCookie("jwt")) {
      navigate("/member/login");
      setTimeout(() => {
        toast.warn("로그인이 필요합니다.");
      }, 100);
      return setLoading(false);
    } else if (comment.content === "") {
      refContent.current.focus();
      toast.warn("댓글을 입력해주세요.");
      return setLoading(false);
    }

    await registerComment(comment)
      .then((data) => {
        if (data.error) {
          toast.error("댓글 등록에 실패했습니다.");
        } else {
          setTimeout(() => {
            toast.success("댓글 등록 완료");
          }, 100);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          toast.error("댓글 등록에 실패했습니다.");
        }
      });

    setComment({ ...comment, content: "", visibility: false });
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="bg-gray-100 w-full m-4 p-4 text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <div className="w-full px-4 text-sm flex justify-between items-center space-x-2">
            <div>
              <div className="text-left">
                작성자 : {post.authorName} / 메일 : {post.authorEmail}
              </div>
              <div className="text-left">
                작성일 : {printDate(post.createdAt)}
                {new Date(post.updatedAt) - new Date(post.createdAt) < 1000
                  ? ""
                  : ` (수정일 : ${printDate(post.updatedAt)})`}
              </div>
            </div>

            {makeBtn("뒤로", "orange", () => navigate(-1))}
          </div>

          <div className="bg-white w-full p-4 border rounded text-2xl text-left flex justify-between items-center">
            <div className="flex justify-center items-center space-x-2">
              <div className="text-base text-gray-500">
                {post.boardType}글/{post.category}관
              </div>
              <div>{post.title}</div>
              <div>{post.visibility && <FaLock />}</div>
            </div>

            <div className="flex justify-center items-center space-x-4">
              {post.authorId === getCookie("userId") &&
                makeBtn("수정", "green", () =>
                  navigate(`/community/modify/${id}`)
                )}
              {(post.authorId === getCookie("userId") ||
                getCookie("userRole") === "ADMIN") &&
                makeBtn("삭제", "red", () => {
                  setLoading(true);

                  deletePost(id);

                  navigate(-1, { replace: true });
                  setTimeout(() => {
                    toast.success("게시글 삭제 완료");
                  }, 100);

                  setLoading(false);
                })}
            </div>
          </div>

          <div
            className="bg-white w-full p-4 border rounded text-left font-normal"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br/>"),
            }}
          />

          <div className="bg-white w-full p-4 border rounded text-left">
            댓글 수 {post.commentList.length}개
          </div>

          <div className="bg-white w-full p-4 border rounded flex justify-center items-center space-x-2">
            <input
              className="w-[calc(100%-100px)] p-2 border border-black rounded"
              type="text"
              value={comment.content}
              placeholder="댓글을 입력하세요."
              autoComplete="off"
              onChange={(e) =>
                setComment({ ...comment, content: e.target.value })
              }
              onKeyUp={(e) => {
                setLoading(true);
                if (e.key === "Enter") {
                  onClickAddComment(comment);
                } else if (e.key === "Escape") {
                  e.target.value = "";
                }
                setLoading(false);
              }}
              ref={refContent}
              disabled={!getCookie("jwt")}
            />
            <div
              className={`p-3 rounded cursor-pointer transition duration-500 ${
                comment.visibility
                  ? "text-red-500 hover:bg-gray-500 hover:text-gray-300"
                  : "text-gray-300 hover:bg-gray-500 hover:text-red-500"
              }`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() =>
                setComment({ ...comment, visibility: !comment.visibility })
              }
            >
              {comment.visibility === hover ? <FaLockOpen /> : <FaLock />}
            </div>
            {makeBtn("등록", "blue", () => onClickAddComment(comment))}
          </div>

          {post.commentList.map((comment) => (
            <div
              key={comment.id}
              className="bg-white w-full p-4 border rounded flex justify-center items-center"
            >
              <div className="w-full flex flex-col justify-center items-start space-y-2">
                {comment.visibility &&
                comment.authorId !== getCookie("userId") ? (
                  <div className="flex justify-center items-center space-x-2">
                    <FaLock className="text-red-500" />
                    <div>비밀 댓글입니다.</div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center items-center space-x-2">
                      {comment.visibility && (
                        <FaLock className="text-red-500" />
                      )}
                      <div>
                        {comment.authorName} ({comment.authorId})
                      </div>
                      <div className="text-gray-400">
                        {printTime(comment.createdAt)}
                        {new Date(comment.updatedAt) -
                          new Date(comment.createdAt) >
                          1000 && ` ${printTime(comment.updatedAt)} 수정됨`}
                      </div>
                    </div>
                    <div className="font-light">{comment.content}</div>
                  </>
                )}
              </div>
              {(comment.authorId === getCookie("userId") ||
                getCookie("userRole") === "ADMIN") &&
                makeBtn("삭제", "red", () => {
                  setLoading(true);

                  deleteComment(comment.id);

                  setComment({ ...comment, reload: comment.reload });

                  setTimeout(() => {
                    toast.success("댓글 삭제 완료");
                  }, 100);

                  setLoading(false);
                })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Read;
