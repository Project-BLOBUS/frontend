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
        <div className="w-full py-2 border-gray-300 text-left">
          댓글 <span className="text-red-500">{data.totalCount}</span>
        </div>

        <div className="w-full py-2 border-b-2 border-gray-300 flex flex-col justify-center items-center space-y-2 relative">
          {makeText(dtoA, setDtoA, setLoading, refAdd)}
          <div className="w-full px-2 flex justify-end items-center space-x-4 absolute bottom-4 right-2 z-10">
            {makeBtnLock(dtoA, setDtoA, refAdd)}
            {makeBtn("등록", () => onClickAdd(dtoA))}
          </div>
        </div>

        <div className="w-full text-sm font-normal flex flex-col justify-center items-center">
          {data.dtoList.map((comment, index) =>
            !comment.edit ? (
              <div
                key={comment.id}
                className="w-full px-4 py-2 border-b-2 border-gray-300 flex justify-center items-end space-x-4"
              >
                {getCookie("userRole") !== "ADMIN" &&
                comment.visibility &&
                comment.postAuthor !== getCookie("userId") &&
                comment.authorId !== getCookie("userId") ? (
                  <div className="py-2 text-base flex justify-center items-center space-x-2">
                    <FaLock className="text-red-500" />
                    <div>비밀 댓글입니다.</div>
                  </div>
                ) : (
                  <>
                    <div className="w-full py-2 flex flex-col justify-ceneter items-center space-y-2">
                      <div className="w-full select-text flex justify-start items-center space-x-2">
                        <div>{comment.authorName}</div>
                        {comment.visibility && (
                          <FaLock className="text-red-500" />
                        )}
                        <div className="text-xs text-gray-400">
                          {printTime(comment.createdAt)} 등록
                          {new Date(comment.updatedAt) -
                            new Date(comment.createdAt) <
                            60 * 1000 ||
                            ` / ${printTime(comment.updatedAt)} 수정`}
                        </div>
                      </div>

                      <div
                        className="w-full text-left select-text"
                        dangerouslySetInnerHTML={{
                          __html: comment.content.replace(/\n/g, "<br/>"),
                        }}
                      />
                    </div>
                  </>
                )}

                {comment.authorId === getCookie("userId") &&
                  !data.dtoList.some((item) => item.edit ?? false) &&
                  makeBtn("수정", () => {
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
                  makeBtn("삭제", () => {
                    setLoading(true);

                    deleteComment(comment.id);

                    setTimeout(() => {
                      setReload(!reload);
                      toast.success("댓글 삭제 완료");
                    }, 100);

                    setLoading(false);
                  })}
              </div>
            ) : (
              <div key={comment.id} className="w-full">
                <div className="w-full py-2 border-b-2 border-gray-300 flex flex-col justify-center items-center space-y-2 relative">
                  {makeText(dtoM, setDtoM, setLoading, refModify)}
                  <div className="w-full px-2 flex justify-end items-center space-x-4 absolute bottom-4 right-2">
                    {makeBtnLock(dtoM, setDtoM, refModify)}

                    {makeBtn("완료", () => {
                      onClickModify(dtoM);
                      setData({
                        ...data,
                        dtoList: data.dtoList.map((item, idx) =>
                          idx === index ? { ...item, edit: false } : item
                        ),
                      });
                    })}

                    {makeBtn("취소", () =>
                      setData({
                        ...data,
                        dtoList: data.dtoList.map((item, idx) =>
                          idx === index ? { ...item, edit: false } : item
                        ),
                      })
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {data.totalCount > 100 && (
        <div className="w-full flex justify-center items-center">
          <Paging data={data} movePage={moveToList} />
        </div>
      )}
    </>
  );
};

const makeText = (dto, setDto, setLoading, ref) => {
  return (
    <>
      <textarea
        className="w-full h-[100px] p-2 border-2 border-gray-300 rounded text-sm font-normal resize-none"
        type="text"
        value={dto.content}
        placeholder={
          getCookie("jwt") ? "댓글을 입력하세요." : "로그인이 필요합니다."
        }
        autoComplete="off"
        ref={ref}
        onChange={(e) => setDto({ ...dto, content: e.target.value })}
        onKeyUp={(e) => {
          setLoading(true);
          if (e.key === "Escape") {
            e.target.value = "";
          }
          setLoading(false);
        }}
        disabled={!getCookie("jwt")}
      />
    </>
  );
};

const makeBtnLock = (dto, setDto, ref) => {
  return (
    <button
      className={`bg-white p-3 border-2 border-white rounded cursor-pointer transition duration-500 ${
        dto.visibility ? "text-red-500" : "text-gray-500"
      }`}
      onClick={() => {
        setDto({ ...dto, visibility: !dto.visibility });
        ref.current.focus();
      }}
    >
      {!dto.visibility ? <FaLockOpen /> : <FaLock />}
    </button>
  );
};

export default Comment;
