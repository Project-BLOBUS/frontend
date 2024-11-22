import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { find } from "../../api/memberAPI";
import { setCookie, removeCookie } from "../../util/cookieUtil";
import useCustomTag from "../../hook/useCustomeTag";
import Loading from "../../etc/Loading";

const initState = {
  // TODO 삭제
  userId: "",
  name: "테스트3",
  phoneNum: "01033333333",
  roleName: "GENERAL",
};

const FindId = () => {
  const navigate = useNavigate();
  const { makeAdd, makeInput } = useCustomTag();
  const [loading, setLoading] = useState(false);

  const [member, setMember] = useState(initState);

  const refList = {
    userId: useRef(null),
    name: useRef(null),
    phoneNum: useRef(null),
  };

  const onChange = ({ target: { name, value } }) => {
    setMember({ ...member, [name]: value, userId: "" });
  };

  const validField = () => {
    const validList = [
      [!member.name, "이름을 입력하세요.", refList.name],
      [!member.phoneNum, "연락처를 입력하세요.", refList.phoneNum],
      [
        !/^\d{10,11}$/.test(member.phoneNum),
        '올바르지 못한 연락처입니다. ("-" 없이 숫자만 입력)',
        refList.phoneNum,
        "phoneNum",
      ],
    ];

    for (const [condition, message, ref, err] of validList) {
      if (condition) {
        err ? toast.error(message) : toast.warn(message);
        if (err === "phoneNum") {
          setMember({ ...member, phoneNum: "" });
        }
        ref?.current?.focus();
        return false;
      }
    }
    return true;
  };

  const onCLickFind = async () => {
    setLoading(true);

    if (!validField()) return setLoading(false);

    await find(member)
      .then((userId) => {
        toast.success("아이디 검색 성공");
        setMember({ ...member, userId: userId });
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버 연결에 실패했습니다.");
        } else {
          toast.warn("검색 실패, 다시 입력하세요.");
          setMember({ ...member, userId: "" });
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-2">
        <div className="bg-white w-full my-4 text-5xl text-sky-500">
          아이디 찾기
          <div className=" w-full mt-4 text-xs text-gray-500">
            기업계정은 관리자에게 문의바랍니다.
          </div>
        </div>

        {/* 이름 */}
        {makeAdd(
          "이름",
          makeInput(
            "text",
            "name",
            member.name,
            "이름",
            onChange,
            true,
            refList.name
          )
        )}

        {/* 연락처 */}
        {makeAdd(
          "연락처",
          makeInput(
            "text",
            "phoneNum",
            member.phoneNum,
            '"─" 없이 입력',
            onChange,
            true,
            refList.phoneNum
          )
        )}

        {member.userId === "" ? (
          <div className="w-full py-2 text-2xl text-center font-bold flex space-x-4">
            <button
              className="bg-gray-500 w-1/4 p-4 rounded-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
              onClick={() => navigate(-1, { replace: true })}
            >
              취소
            </button>

            <button
              className="bg-sky-500 w-3/4 p-4 rounded-xl text-white hover:bg-sky-300 hover:text-black transition duration-500"
              onClick={onCLickFind}
            >
              검색
            </button>
          </div>
        ) : (
          <>
            {makeAdd(
              "아이디",
              <div className="w-full p-4 border border-gray-500 rounded shadow-lg text-left tracking-wider">
                {member.userId}
              </div>
            )}

            <div className="w-full pt-2 text-xl text-center font-bold flex justify-center items-center space-x-4">
              <button
                className="w-1/2 p-4 hover:text-gray-300 transition duration-500"
                onClick={() => {
                  setCookie("foundId", member.userId);
                  navigate("/member/findpw", { replace: true });
                }}
              >
                비밀번호 찾기
              </button>
              <div>|</div>
              <button
                className="w-1/2 p-4 hover:text-gray-300 transition duration-500"
                onClick={() => {
                  removeCookie("foundId");
                  setCookie("userId", member.userId);
                  setCookie("userRole", member.roleName);
                  navigate("/member/login", { replace: true });
                }}
              >
                로그인
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FindId;
