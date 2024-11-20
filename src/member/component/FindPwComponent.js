import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendMail } from "../api/memberAPI";
import { getCookie } from "../util/cookieUtil";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../etc/Loading";

const initState = {
  userId: "",
  authCode: "",
  userPw: "",
  confirmPw: "",
  roleName: "GENERAL",
};

const FindPwComponent = () => {
  const navigate = useNavigate();
  const { makeBtn, makeAdd, makeInput } = useCustomTag();
  const [loading, setLoading] = useState(false);

  const [member, setMember] = useState(initState);

  const [validation, setValidation] = useState({
    isMailSent: false,
    authCode: 0,
    isAuth: false,
  });

  const refList = {
    userId: useRef(null),
    authCode: useRef(null),
    userPw: useRef(null),
    confirmPw: useRef(null),
  };

  useEffect(() => {
    setMember({ ...member, userId: getCookie("userId") });
  }, []);

  const onChange = ({ target: { name, value } }) => {
    if (name === "userId") {
      setValidation({
        ...validation,
        isIdValid: false,
        isMailSent: false,
        authCode: 0,
        isAuth: false,
      });
    }
    setMember({ ...member, [name]: value });
  };

  const validField = () => {
    const validList = [
      [!member.userId, "아이디를 입력하세요.", refList.userId],
      [
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.userId),
        "올바르지 못한 아이디입니다. (example@domain.com)",
        refList.userId,
        "userId",
      ],
      [!validation.isMailSent, "메일 전송을 누르세요."],
      [!member.authCode, "인증코드를 입력하세요.", refList.authCode],
      [!validation.isAuth, "이메일 인증을 완료하세요."],
      [!member.userPw, "비밀번호를 입력하세요.", refList.userPw],
      [
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/.test(
          member.userPw
        ),
        "올바르지 못한 비밀번호입니다. (영어 대소문자, 숫자, 특수기호 포함, 8~16글자)",
        refList.userPw,
        "userPw",
      ],
      [!member.confirmPw, "비밀번호 확인을 입력하세요.", refList.confirmPw],
      [
        member.confirmPw !== member.userPw,
        "입력하신 비밀번호가 다릅니다.",
        refList.confirmPw,
        "confirmPw",
      ],
    ];

    for (const [condition, message, ref, err] of validList) {
      if (condition) {
        err ? toast.error(message) : toast.warn(message);
        if (err === "userId") {
          setMember({ ...member, userId: "" });
        } else if (err === "userPw") {
          setMember({ ...member, userPw: "" });
        } else if (err === "confirmPw") {
          setMember({ ...member, confirmPw: "" });
        }
        ref?.current?.focus();
        return false;
      }
    }
    return true;
  };

  const onClickModify = async () => {
    setLoading(true);

    if (!validField()) return setLoading(false);

    // TODO 이메일 검색 후 비밀번호 변경

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-2">
        <div className="bg-white w-full my-4 text-5xl text-sky-500">
          비밀번호 찾기
        </div>

        {/* 아이디 */}
        {makeAdd(
          "아이디",
          <div className="w-full h-full flex justify-center items-center space-x-1 track">
            {makeInput(
              "email",
              "userId",
              member.userId,
              "이메일",
              onChange,
              !validation.isAuth,
              refList.userId,
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.userId)
                ? "w-full"
                : !validation.isMailSent
                ? "w-5/6"
                : !validation.isAuth
                ? "w-7/12"
                : "w-full"
            )}
            {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.userId) ? (
              <></>
            ) : !validation.isMailSent ? (
              <>
                {makeBtn("메일 전송", async () => {
                  setLoading(true);

                  try {
                    const code = await sendMail(member);
                    toast.success("메일 전송 성공");
                    setValidation({
                      ...validation,
                      isMailSent: true,
                      authCode: code,
                    });
                    // TODO 삭제
                    setMember({ ...member, authCode: code });
                  } catch (error) {
                    toast.error("메일 전송에 실패했습니다.");
                  }

                  setLoading(false);
                })}
              </>
            ) : !validation.isAuth ? (
              <>
                {makeInput(
                  "text",
                  "authCode",
                  member.authCode,
                  "인증번호",
                  onChange,
                  !validation.isAuth,
                  refList.authCode,
                  "w-1/4 text-center"
                )}
                {makeBtn("인증 확인", () => {
                  setLoading(true);

                  if (validation.authCode === member.authCode * 1) {
                    toast.success("인증 완료");
                    setValidation({ ...validation, isAuth: true });
                  } else {
                    toast.warn("인증 코드를 다시 입력하세요.");
                    refList.authCode.current.focus();
                  }

                  setLoading(false);
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        )}

        {validation.isAuth && (
          <>
            {/* 비밀번호 */}
            {makeAdd(
              "비밀번호",
              makeInput(
                "password",
                "userPw",
                member.userPw,
                "영어 대소문자, 숫자, 특수기호를 포함한 8~16글자",
                onChange,
                validation.isAuth,
                refList.userPw
              )
            )}

            {/* 비밀번호 확인 */}
            {makeAdd(
              "비밀번호 확인",
              makeInput(
                "password",
                "confirmPw",
                member.confirmPw,
                "비밀번호 재입력",
                onChange,
                validation.isAuth,
                refList.confirmPw
              )
            )}
          </>
        )}

        <div className="w-full pt-2 text-2xl text-center font-bold flex space-x-4">
          <button
            className="bg-gray-500 w-1/4 p-4 rounded-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
            onClick={() => navigate("/member/login")}
          >
            취소
          </button>

          <button
            className="bg-sky-500 w-3/4 p-4 rounded-xl text-white hover:bg-sky-300 hover:text-black transition duration-500"
            onClick={onClickModify}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
};

export default FindPwComponent;
