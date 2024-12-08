import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../../etc/util/cookieUtil";
import {
  deleteComment,
  getCommentList,
  modifyComment,
  registerComment,
} from "../api/commentAPI";
import useCustomMove from "../../etc/hook/useCustomMove";
import useCommunityTag from "../hook/useCommunityTag";
import Loading from "../../etc/component/Loading";
import Paging from "../../etc/component/Paging";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  pageSize: 0,
  prevPage: 0,
  nextPage: 0,
  currentPage: 0,
};

const initComment = {
  id: 0,
  authorId: "",
  authorName: "",
  content: "",
  visibility: false,
  postId: 0,
  postAuthor: 0,
};

const Comment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { page, size, moveToList } = useCustomMove(`community/read/${id}`);
  const { makeBtn } = useCommunityTag();

  const [data, setData] = useState(initState);
  const [dtoA, setDtoA] = useState(initComment);
  const [dtoM, setDtoM] = useState(initComment);

  const [reload, setReload] = useState(false);
  const [hover, setHover] = useState(false);
  const refAdd = useRef(null);
  const refModify = useRef(null);

  useEffect(() => {
    setLoading(true);

    setDtoA({
      ...dtoA,
      authorId: getCookie("userId"),
      authorName: getCookie("userName"),
      authorEmail: getCookie("userEmail"),
      postId: id,
    });

    getCommentList({ page, size }, id)
      .then((data) => {
        if (data.error) {
          setData(initState);
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.", { toastId: "e" });
        } else {
          toast.error("데이터를 불러오는데 실패했습니다.", { toastId: "e" });
        }
      });

    setLoading(false);
  }, [page, size, id, reload]);

  const onClickAdd = async (comment) => {
    setLoading(true);

    if (comment.content === "") {
      refAdd.current.focus();
      toast.warn("댓글을 입력해주세요.");
      return setLoading(false);
    }

    await registerComment(comment)
      .then((data) => {
        if (data.error) {
          toast.error("댓글 등록에 실패했습니다.");
        } else {
          setTimeout(() => {
            setReload(!reload);
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

    setDtoA({ ...dtoA, content: "", visibility: false });
    setLoading(false);
  };

  const onClickModify = async (comment) => {
    setLoading(true);

    if (comment.content === "") {
      refModify.current.focus();
      toast.warn("댓글을 입력해주세요.");
      return setLoading(false);
    }

    await modifyComment(comment)
      .then((data) => {
        if (data.error) {
          toast.error("댓글 수정에 실패했습니다.");
        } else {
          setTimeout(() => {
            setReload(!reload);
            toast.success("댓글 수정 완료");
          }, 100);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          toast.error("댓글 수정에 실패했습니다.");
        }
      });

    setDtoA({ ...dtoA, content: "", visibility: false });
    setLoading(false);
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
    } else {
      return "1초 전";
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="bg-white w-full p-4 border rounded-t-xl shadow-lg text-left">
          댓글 수 {data.dtoList.length}개
        </div>
        <div className="bg-white w-full mb-4 p-4 border rounded-b-xl shadow-lg flex justify-center items-center space-x-2">
          {getCookie("jwt") ? (
            <>
              {makeInput(
                dtoA,
                setDtoA,
                hover,
                setHover,
                setLoading,
                onClickAdd,
                refAdd
              )}
              {makeBtn("등록", "blue", () => onClickAdd(dtoA))}
              {makeBtn("취소", "orange", () =>
                setDtoA({ ...dtoA, content: "", visibility: false })
              )}
            </>
          ) : (
            <>
              <div className="mr-2">댓글 작성을 원하시면 로그인 하세요.</div>
              {makeBtn("로그인", "blue", () => navigate("/member/login"))}
            </>
          )}
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          {data.dtoList.map((comment, index) =>
            comment.edit ? (
              <div
                key={comment.id}
                className="bg-white px-4 text-sm w-full border rounded flex justify-center items-center space-x-2"
              >
                <div className="w-full py-2 flex justify-center items-center space-x-2">
                  {makeInput(
                    dtoM,
                    setDtoM,
                    hover,
                    setHover,
                    setLoading,
                    () => {
                      onClickModify(dtoM);
                      setData({
                        ...data,
                        dtoList: data.dtoList.map((item, idx) =>
                          idx === index ? { ...item, edit: false } : item
                        ),
                      });
                    },
                    refModify
                  )}

                  {makeBtn("완료", "blue", () => {
                    onClickModify(dtoM);
                    setData({
                      ...data,
                      dtoList: data.dtoList.map((item, idx) =>
                        idx === index ? { ...item, edit: false } : item
                      ),
                    });
                  })}

                  {makeBtn("취소", "orange", () =>
                    setData({
                      ...data,
                      dtoList: data.dtoList.map((item, idx) =>
                        idx === index ? { ...item, edit: false } : item
                      ),
                    })
                  )}
                </div>
              </div>
            ) : (
              <div
                key={comment.id}
                className="bg-white px-4 py-2 text-base w-full border rounded flex justify-center items-center space-x-2"
              >
                {getCookie("userRole") !== "ADMIN" &&
                comment.visibility &&
                comment.postAuthor !== getCookie("userId") &&
                comment.authorId !== getCookie("userId") ? (
                  <div className="py-2 flex justify-center items-center space-x-2">
                    <FaLock className="text-red-500" />
                    <div>비밀 댓글입니다.</div>
                  </div>
                ) : (
                  <>
                    <div
                      className={`${
                        comment.authorId === getCookie("userId") &&
                        !data.dtoList.some((item) => item.edit ?? false)
                          ? "w-[calc(100%-136px)]"
                          : comment.postAuthor === getCookie("userId") ||
                            getCookie("userRole") === "ADMIN"
                          ? "w-[calc(100%-68px)]"
                          : "w-full"
                      } py-2 flex justify-ceneter items-center`}
                    >
                      <div className="w-1/2 flex justify-start items-center space-x-2">
                        {comment.visibility && (
                          <FaLock className="text-red-500" />
                        )}
                        <div className="text-left font-light select-text">
                          {comment.content}
                        </div>
                      </div>

                      <div className="w-1/2 flex justify-end items-center space-x-2">
                        <div className="text-xs text-gray-400">
                          {new Date(comment.updatedAt) -
                            new Date(comment.createdAt) <
                          60 * 1000
                            ? ` ${printTime(comment.createdAt)} 등록`
                            : ` ${printTime(comment.updatedAt)} 수정`}
                        </div>

                        <div className="flex justify-center items-center space-x-1">
                          <div>{comment.authorName}</div>
                          <div
                            className="px-1 text-[.7rem] font-normal rounded cursor-pointer hover:bg-gray-300 hover:text-white transition duration-500"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                comment.authorEmail
                              );
                              toast.success("메일 복사 완료");
                            }}
                          >
                            {comment.authorEmail}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {comment.authorId === getCookie("userId") &&
                  !data.dtoList.some((item) => item.edit ?? false) &&
                  makeBtn("수정", "green", () => {
                    setLoading(true);

                    setData({
                      ...data,
                      dtoList: data.dtoList.map((item, idx) =>
                        idx === index ? { ...item, edit: true } : item
                      ),
                    });

                    setDtoM({
                      id: comment.id,
                      authorId: getCookie("userId"),
                      authorName: getCookie("userName"),
                      content: comment.content,
                      visibility: comment.visibility,
                      postId: id,
                    });

                    setLoading(false);
                  })}

                {(comment.postAuthor === getCookie("userId") ||
                  comment.authorId === getCookie("userId") ||
                  getCookie("userRole") === "ADMIN") &&
                  makeBtn("삭제", "red", () => {
                    setLoading(true);

                    deleteComment(comment.id);

                    setTimeout(() => {
                      setReload(!reload);
                      toast.success("댓글 삭제 완료");
                    }, 100);

                    setLoading(false);
                  })}
              </div>
            )
          )}
        </div>
      </div>

      {data.dtoList.length > 0 && (
        <div className="w-full flex justify-center items-center">
          <Paging data={data} movePage={moveToList} />
        </div>
      )}
    </>
  );
};

const makeInput = (dto, setDto, hover, setHover, setLoading, onClick, ref) => {
  return (
    <>
      <div
        className={`p-3 rounded cursor-pointer transition duration-500 ${
          dto.visibility
            ? "text-red-500 hover:bg-gray-500 hover:text-gray-300"
            : "text-gray-300 hover:bg-gray-500 hover:text-red-500"
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          setDto({ ...dto, visibility: !dto.visibility });
          ref.current.focus();
        }}
      >
        {dto.visibility === hover ? <FaLockOpen /> : <FaLock />}
      </div>

      <input
        className="w-[calc(100%-184px)] p-2 border border-black rounded text-sm font-normal"
        type="text"
        value={dto.content}
        placeholder="댓글을 입력하세요."
        autoComplete="off"
        onChange={(e) => setDto({ ...dto, content: e.target.value })}
        onKeyUp={(e) => {
          setLoading(true);
          if (e.key === "Enter") {
            onClick(dto);
          } else if (e.key === "Escape") {
            e.target.value = "";
          }
          setLoading(false);
        }}
        ref={ref}
        disabled={!getCookie("jwt")}
      />
    </>
  );
};

export default Comment;
