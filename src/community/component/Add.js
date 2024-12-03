import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../../etc/util/cookieUtil";
import { registerOne } from "../api/communityAPI";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../../etc/component/Loading";

const initState = {
  boardType: "자유",
  category: "",
  title: "",
  content: "",
  authorId: "",
  authorName: "",
  authorEmail: "",
  toEmail: false,
  visibility: false,
};

const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { makeBtn } = useCustomTag();

  const [jwt, setJwt] = useState(getCookie("jwt"));
  const [dto, setDto] = useState(initState);
  const [hover, setHover] = useState(false);

  const refList = {
    category: useRef(null),
    title: useRef(null),
    content: useRef(null),
  };

  useEffect(() => {
    setLoading(true);

    setDto({
      ...dto,
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

  const validField = () => {
    const validList = [
      [!dto.category, "카테고리를 선택하세요.", refList.category],
      [!dto.title, "제목을 입력하세요.", refList.title],
      [!dto.content, "내용을 입력하세요.", refList.content],
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

  const onClickAdd = async (dto) => {
    setLoading(true);

    if (!validField()) return setLoading(false);

    await registerOne(dto)
      .then((data) => {
        if (data.error) {
          toast.error("게시글 등록에 실패했습니다.");
        } else {
          navigate(`/community/read/${data.register}`, { replace: true });
          setTimeout(() => {
            toast.success(
              dto.toEmail ? "게시글 등록 및 메일 전송 완료" : "게시글 등록 완료"
            );
          }, 100);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          toast.error("게시글 등록에 실패했습니다.");
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
            <div className="w-full text-xl flex justify-start items-center space-x-4">
              <div className="w-1/3 flex justify-start items-center space-x-2">
                {makeTab("자유게시판", "자유", dto, setDto)}
                {makeTab("건의게시판", "건의", dto, setDto)}
              </div>

              <select
                className="bg-white p-2 border border-black rounded text-center"
                name="category"
                value={dto.category}
                onChange={(e) => setDto({ ...dto, category: e.target.value })}
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

              <div
                className="group w-1/6 flex justify-center items-center cursor-pointer"
                hidden={dto.boardType === "자유"}
              >
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  name="idSave"
                  checked={dto.toEmail}
                  onChange={() => setDto({ ...dto, toEmail: !dto.toEmail })}
                  hidden={dto.boardType === "자유"}
                />
                <div
                  className={`ml-2 transition duration-500 ${
                    dto.toEmail
                      ? "group-hover:text-gray-300"
                      : "group-hover:text-[#DB0153]"
                  }`}
                  onClick={() => setDto({ ...dto, toEmail: !dto.toEmail })}
                  hidden={dto.boardType === "자유"}
                >
                  메일 전송
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4">
              {makeBtn("뒤로", "orange", () => navigate(-1, { replace: true }))}
              {makeBtn("완료", "blue", () => onClickAdd(dto))}
            </div>
          </div>

          <div className="bg-white w-full p-4 border rounded text-2xl text-left flex justify-between items-center">
            <div className="w-full flex justify-center items-center">
              <div
                className={`p-3 rounded cursor-pointer transition duration-500 ${
                  dto.visibility
                    ? "text-red-500 hover:bg-gray-500 hover:text-gray-300"
                    : "text-gray-300 hover:bg-gray-500 hover:text-red-500"
                }`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setDto({ ...dto, visibility: !dto.visibility })}
                hidden={dto.boardType === "자유"}
              >
                {dto.visibility === hover ? <FaLockOpen /> : <FaLock />}
              </div>

              <input
                className="w-full p-2 border border-black rounded"
                type="text"
                name="title"
                value={dto.title}
                maxLength={30}
                placeholder="제목을 입력하세요. (최대 30글자)"
                autoComplete="off"
                onChange={(e) =>
                  setDto({ ...dto, [e.target.name]: e.target.value })
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
              value={dto.content}
              placeholder="내용을 입력하세요."
              autoComplete="off"
              onChange={(e) =>
                setDto({ ...dto, [e.target.name]: e.target.value })
              }
              ref={refList.content}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const makeTab = (name, value, dto, setDto) => {
  return (
    <div
      className={`w-full p-2 rounded  ${
        value === dto.boardType
          ? "bg-[#DB0153] text-white"
          : "bg-gray-300 text-gray-100 cursor-pointer hover:bg-[#DB0153] hover:text-white transition duration-500"
      }`}
      onClick={() => {
        value !== dto.boardType &&
          setDto({
            ...dto,
            boardType: value,
            toEmail: false,
            visibility: false,
          });
      }}
    >
      {name}
    </div>
  );
};

export default Add;
