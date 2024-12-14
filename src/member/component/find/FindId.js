import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCookie } from "../../../etc/util/cookieUtil";
import { find } from "../../api/memberAPI";
import useMemberTag from "../../hook/useMemberTag";
import Loading from "../../../etc/component/Loading";

const initState = {
  userId: "",
  name: "",
  phoneNum: "",
  roleName: "GENERAL",
};

const FindId = () => {
  const navigate = useNavigate();
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
        if (userId === "DELETE") {
          toast.error("해당 계정은 탈퇴계정입니다.");
          setTimeout(() => {
            toast.info("복구 문의 : blobus051@gmail.com");
          }, 100);
        } else if (userId === "LOCK") {
          toast.error("해당 계정은 잠금계정입니다.");
          setTimeout(() => {
            toast.info("복구 문의 : blobus051@gmail.com");
          }, 100);
        } else {
          setCookie("foundId", userId);
          setMember({ ...member, userId: userId });
          toast.success("아이디 검색 성공");
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          setMember({ ...member, userId: "" });
          toast.warn("검색 실패, 다시 입력하세요.");
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-1/2 h-[500px] p-10 border-2 border-gray-300 rounded-xl shadow-xl text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full h-[20%] text-4xl flex justify-center items-center">
          아이디 찾기
        </div>

        {member.userId === "" ? (
          <>
            <div className="w-full h-[10%] text-sm flex flex-col justify-center items-center">
              <div className="w-full h-1/2">
                회원정보에 등록된 정보로 아이디를 찾을 수 있습니다.
              </div>

              <div className="w-full h-1/2 text-gray-500">
                ※ 기업계정은 관리자에게 문의바랍니다.
              </div>
            </div>

            <div className="w-full h-[35%] flex flex-col justify-center items-center space-y-2">
              {/* 이름 */}
              {makeInput(
                "text",
                "name",
                member.name,
                "이름",
                refList.name,
                onChange
              )}

              {/* 연락처 */}
              {makeInput(
                "text",
                "phoneNum",
                member.phoneNum,
                "연락처",
                refList.phoneNum,
                onChange
              )}
            </div>

            <div className="w-full h-[35%] flex flex-col justify-center items-center space-y-2">
              {makeBtn("아이디 찾기", onCLickFind)}
              {makeBtn("뒤로가기", () => navigate(-1, { replace: true }))}
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-[45%] flex flex-col justify-center items-center space-y-4">
              <div className="w-full text-xl">
                {member.name}님의 아이디 검색 결과입니다.
              </div>

              <div className="w-full text-3xl py-16">{member.userId}</div>
            </div>

            <div className="w-full h-[35%] flex flex-col justify-center items-center space-y-2">
              {makeBtn("로그인", () => {
                setCookie("userId", member.userId);
                setCookie("userRole", member.roleName);
                navigate("/member/login", { replace: true });
              })}

              {makeBtn("비밀번호 찾기", () =>
                navigate("/member/find/pw", { replace: true })
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const makeInput = (type, name, value, hint, ref, onChange) => {
  return (
    <input
      className="w-full px-6 py-4 border border-gray-500 rounded-full shadow-md text-left tracking-widest"
      type={type}
      name={name}
      value={value ?? ""}
      placeholder={hint}
      maxLength={
        name === "authCode"
          ? 6
          : name === "userPw" || name === "confirmPw"
          ? 16
          : name === "phoneNum"
          ? 11
          : undefined
      }
      autoComplete="off"
      ref={ref}
      onChange={onChange}
    />
  );
};

const makeBtn = (name, onClick) => {
  return (
    <button
      className="w-full p-4 border-2 border-pink-500 rounded-full shadow-lg text-pink-500 hover:bg-pink-500 hover:text-white transition duration-500"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default FindId;
