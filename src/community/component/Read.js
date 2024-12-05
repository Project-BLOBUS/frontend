import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../../etc/util/cookieUtil";
import { getPost, deletePost } from "../api/postAPI";
import useCustomTag from "../hook/useCustomeTag";
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
  const { makeBtn } = useCustomTag();

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
      <div className="bg-gray-100 w-full my-4 p-4 text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center space-y-4">
          <div className="w-full pt-2 px-4 text-sm flex justify-between items-center space-x-2">
            <div>
              <div className="text-left">
                작성자 : {dto.authorName}
                <span
                  className="ml-1 px-1 text-xs text-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white transition duration-500"
                  onClick={() => {
                    navigator.clipboard.writeText(dto.authorEmail);
                    toast.success("메일 복사 완료");
                  }}
                >
                  {dto.authorEmail}
                </span>
              </div>
              <div className="text-left">
                작성시간 : {printTime(dto.createdAt)}
                <span className="text-gray-500">
                  {new Date(dto.updatedAt) - new Date(dto.createdAt) < 1000
                    ? ""
                    : ` (${printTime(dto.updatedAt)}에 수정됨)`}
                </span>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-2">
              {dto.prev &&
                makeBtn("이전", "none", () =>
                  navigate(`/community/read/${dto.prev}`, {
                    state: { back: window.location.href },
                  })
                )}
              {makeBtn("목록", "none", () => navigate("/community/list"))}
              {dto.next &&
                makeBtn("다음", "none", () =>
                  navigate(`/community/read/${dto.next}`, {
                    state: { back: window.location.href },
                  })
                )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="bg-white w-full p-4 border rounded-t-xl shadow-lg text-2xl text-left flex justify-between items-center">
              <div className="flex justify-center items-center space-x-2">
                <div className="text-base text-gray-500">
                  {dto.boardType}글/{dto.category}관
                </div>
                <div>{dto.visibility && <FaLock />}</div>
                <div className="select-text">{dto.title}</div>
              </div>

              <div className="flex justify-center items-center space-x-2">
                {(dto.authorId === getCookie("userId") ||
                  getCookie("userRole") === "ADMIN") &&
                  makeBtn("삭제", "red", () => {
                    setLoading(true);

                    deletePost(id);

                    navigate("/community/list", { replace: true });
                    setTimeout(() => {
                      toast.success("게시글 삭제 완료");
                    }, 100);

                    setLoading(false);
                  })}
                {dto.authorId === getCookie("userId") &&
                  makeBtn("수정", "green", () =>
                    navigate(`/community/modify/${id}`)
                  )}
                {getCookie("jwt") &&
                  makeBtn("글쓰기", "blue", () => navigate("/community/add"))}
              </div>
            </div>

            <div
              className="bg-white w-full p-4 border rounded-b-lg shadow-lg text-left font-normal select-text"
              dangerouslySetInnerHTML={{
                __html: dto.content.replace(/\n/g, "<br/>"),
              }}
            />
          </div>

          <Comment />
        </div>
      </div>
    </>
  );
};

export default Read;
