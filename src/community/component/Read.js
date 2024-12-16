import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../../etc/util/cookieUtil";
import { getPost, deletePost } from "../api/postAPI";
import useCommunityTag from "../hook/useCommunityTag";
import Loading from "../../etc/component/Loading";
import Comment from "./Comment";

const initPost = {
  id: 0,
  prev: 0,
  next: 0,
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

const Read = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { makeBtn } = useCommunityTag();

  const [dto, setDto] = useState(initPost);

  useEffect(() => {
    setLoading(true);

    getPost(id)
      .then((data) => {
        if (
          getCookie("userRole") !== "ADMIN" &&
          data.visibility &&
          data.authorId !== getCookie("userId")
        ) {
          const back = location.state?.back.split("/")[5];
          if (id * 1 < back * 1) {
            navigate(`/community/read/${data.next}`, {
              state: { back: window.location.href },
            });
          } else if (id * 1 > back * 1) {
            navigate(`/community/read/${data.prev}`, {
              state: { back: window.location.href },
            });
          }
        } else {
          setDto(data);
        }
      })
      .catch(() => {
        navigate("/community/list", { replace: true });
        setTimeout(() => {
          toast.error("존재하지 않는 페이지입니다.", { toastId: "e" });
        }, 100);
      });

    setLoading(false);
  }, [id]);

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
      <div className="w-full text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full my-2 py-4 text-3xl text-left border-b-2 border-gray-300 flex justify-between items-center">
          커뮤니티
        </div>

        <div className="w-full flex flex-col justify-center items-center space-y-4">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full py-2 border-b-2 border-red-500 text-xl text-left flex justify-between items-center">
              <div className="flex justify-center items-center space-x-2">
                <div>{dto.visibility && <FaLock />}</div>
                <div className="select-text">
                  {dto.title.length > 40
                    ? dto.title.slice(dto.title.length - 40) + ". . ."
                    : dto.title}
                </div>
              </div>

              <div className="flex justify-center items-center space-x-0">
                {dto.authorId === getCookie("userId") &&
                  makeBtn("수정", () => navigate(`/community/modify/${id}`))}
                {(dto.authorId === getCookie("userId") ||
                  getCookie("userRole") === "ADMIN") &&
                  makeBtn("삭제", () => {
                    setLoading(true);

                    deletePost(id);

                    navigate("/community/list", { replace: true });
                    setTimeout(() => {
                      toast.success("게시글 삭제 완료");
                    }, 100);

                    setLoading(false);
                  })}
              </div>
            </div>

            <div className="w-full p-2 text-xs flex justify-between items-center">
              <div className="w-1/2 flex justify-start items-center space-x-4">
                <div className="flex justify-center items-center space-x-2">
                  <div>구분</div>
                  <div className="text-gray-400">{dto.boardType}</div>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <div>카테고리</div>
                  <div className="text-gray-400">{dto.category}</div>
                </div>
              </div>

              <div className="w-1/2 flex justify-end items-center space-x-4">
                <div className="flex justify-center items-center space-x-2">
                  <div>작성자</div>
                  <div className="text-gray-400">{dto.authorName}</div>
                  {/* <div
                    className="text-gray-500 cursor-pointer"
                    onDoubleClick={() => {
                      navigator.clipboard.writeText(dto.authorEmail);
                      toast.success("메일 복사 완료");
                    }}
                  >
                    {dto.authorEmail}
                  </div> */}
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <div>작성일자</div>
                  <div className="text-gray-400">
                    {new Date(dto.updatedAt) - new Date(dto.createdAt) <
                    60 * 1000
                      ? printTime(dto.createdAt)
                      : ` (${printTime(dto.updatedAt)}에 수정됨)`}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-full h-[300px] p-2 border-y-2 border-gray-300 text-sm text-left font-normal select-text overflow-y-scroll"
              dangerouslySetInnerHTML={{
                __html: dto.content.replace(/\n/g, "<br/>"),
              }}
            />
          </div>

          <Comment />
          <div className="flex justify-center items-center">
            {/* {dto.prev &&
              makeBtn("이전", () =>
                navigate(`/community/read/${dto.prev}`, {
                  state: { back: window.location.href },
                })
              )} */}
            <button
              className="px-10 py-4 border-2 border-gray-300 rounded text-base text-nowrap hover:bg-[#DDDDDD] transition duration-500"
              onClick={() => navigate("/community/list")}
            >
              목록으로
            </button>
            {/* {dto.next &&
              makeBtn("다음", () =>
                navigate(`/community/read/${dto.next}`, {
                  state: { back: window.location.href },
                })
              )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Read;
