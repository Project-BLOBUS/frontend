import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../../etc/util/cookieUtil";
import { getPost, modifyPost } from "../api/postAPI";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../../etc/component/Loading";

const initPost = {
  id: 0,
  prev: 0,
  next: 0,
  authorId: "",
  authorName: "",
  authorEmail: "",
  boardType: "",
  category: "",
  title: "",
  content: "",
  toEmail: false,
  visibility: false,
  createdAt: null,
  updatedAt: null,
  commentList: [],
};

const Modify = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { makeBtn } = useCustomTag();

  const [jwt, setJwt] = useState(getCookie("jwt"));
  const [post, setPost] = useState(initPost);
  const [hover, setHover] = useState(false);

  const refList = {
    category: useRef(null),
    title: useRef(null),
    content: useRef(null),
  };

  useEffect(() => {
    setLoading(true);

    setPost({
      ...post,
      authorId: getCookie("userId"),
      authorName: getCookie("name"),
      authorEmail: getCookie("email"),
    });

    const interval = setInterval(() => {
      const newJwt = getCookie("jwt");

      if (!newJwt) {
        navigate("/member/login");
        setJwt(newJwt);
        setTimeout(() => {
          toast.error("로그인이 필요합니다.", { toastId: "e" });
        }, 200);
      }
    }, 100);

    setLoading(false);
    return () => clearInterval(interval);
  }, [jwt]);

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
  }, [id]);

  const validField = () => {
    const validList = [
      [!post.category, "카테고리를 선택하세요.", refList.category],
      [!post.title, "제목을 입력하세요.", refList.title],
      [!post.content, "내용을 입력하세요.", refList.content],
    ];

    for (const [condition, message, ref, err] of validList) {
      if (condition) {
        err ? toast.error(message) : toast.warn(message);
        ref?.current?.focus();
        return false;
      }
    }
    return true;
  };

  const onClickModify = async (post) => {
    setLoading(true);

    if (!validField()) return setLoading(false);

    await modifyPost(post)
      .then((data) => {
        if (data.error) {
          toast.error("게시글 수정에 실패했습니다.");
        } else {
          navigate(-1, { replace: true });
          setTimeout(() => {
            toast.success("게시글 수정 완료");
          }, 100);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          toast.error("게시글 수정에 실패했습니다.");
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="bg-gray-100 w-full m-4 p-4 text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <div className="w-full pr-4 text-sm flex justify-between items-center">
            <div className="w-full text-xl flex justify-start items-center space-x-2">
              <div className="w-1/2 flex justify-start items-center space-x-2">
                {makeTab("자유게시판", "자유", post, setPost)}
                {makeTab("건의게시판", "건의", post, setPost)}
              </div>

              <select
                className="bg-white p-2 border border-black rounded text-center"
                name="category"
                value={post.category}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                ref={refList.category}
              >
                <option
                  className="bg-sky-500 text-white font-bold"
                  value=""
                  disabled
                  selected
                >
                  카테고리
                </option>
                <option value="청년">청년관</option>
                <option value="기업">기업관</option>
                <option value="지역">지역관</option>
              </select>
            </div>

            <div className="flex justify-center items-center space-x-2">
              {makeBtn("뒤로", "orange", () => navigate(-1, { replace: true }))}
              {makeBtn("완료", "blue", () => onClickModify(post))}
            </div>
          </div>

          <div className="bg-white w-full p-4 border rounded text-2xl text-left flex justify-between items-center">
            <div className="w-full flex justify-center items-center">
              <div
                className={`p-3 rounded cursor-pointer transition duration-500 ${
                  post.visibility
                    ? "text-red-500 hover:bg-gray-500 hover:text-gray-300"
                    : "text-gray-300 hover:bg-gray-500 hover:text-red-500"
                }`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() =>
                  setPost({ ...post, visibility: !post.visibility })
                }
                hidden={post.boardType === "자유"}
              >
                {post.visibility === hover ? <FaLockOpen /> : <FaLock />}
              </div>

              <input
                className="w-full p-2 border border-black rounded"
                type="text"
                name="title"
                value={post.title}
                maxLength={30}
                placeholder="제목을 입력하세요. (최대 30글자)"
                autoComplete="off"
                onChange={(e) =>
                  setPost({ ...post, [e.target.name]: e.target.value })
                }
                ref={refList.title}
              />
            </div>
          </div>

          <div className="bg-white w-full p-4 border rounded text-left font-normal">
            <textarea
              className="w-full h-[400px] p-2 border border-black rounded resize-none"
              type="text"
              name="content"
              value={post.content}
              placeholder="내용을 입력하세요."
              autoComplete="off"
              onChange={(e) =>
                setPost({ ...post, [e.target.name]: e.target.value })
              }
              ref={refList.content}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const makeTab = (name, value, post, setPost) => {
  return (
    <div
      className={`w-full p-2 rounded  ${
        value === post.boardType
          ? "bg-[#DB0153] text-white"
          : "bg-gray-300 text-gray-100"
      }`}
    >
      {name}
    </div>
  );
};

export default Modify;
