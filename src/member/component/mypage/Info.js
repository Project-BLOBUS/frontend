import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import { getCookie, removeCookie } from "../../../etc/util/cookieUtil";
import { getInfo, deleteId, sendMail } from "../../api/memberAPI";
import useMemberTag from "../../hook/useMemberTag";
import useInfoTag from "../../hook/useInfoTag";
import Loading from "../../../etc/component/Loading";

const initState = {
  userId: "",
  authCode: "",
  name: "",
  phoneNum: "",
  address: "-",
  birthDate: "",
  gender: "M",
  foreigner: false,
  roleName: "GENERAL",
};

const Info = () => {
  const navigate = useNavigate();
  const { makeBtn, makeAdd, makeInput } = useMemberTag();
  const { makeBtn2, makeRead } = useInfoTag();
  const [loading, setLoading] = useState(false);

  const [member, setMember] = useState(initState);
  const [modal, setModal] = useState(false);
  const [btnType, setBtnType] = useState("");

  const [validation, setValidation] = useState({
    isMailSent: false,
    authCode: 0,
  });

  const refList = {
    userId: useRef(null),
    authCode: useRef(null),
  };

  useEffect(() => {
    setLoading(true);

    getInfo(member, getCookie("userId"))
      .then((dto) => {
        const { userPw, ...member } = dto;
        setMember(member);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          toast.error("회원정보를 불러오는데 실패했습니다.", { toastId: "e" });
        }
      });

    setLoading(false);
  }, []);

  const onChange = ({ target: { name, value } }) => {
    setMember({ ...member, [name]: value });
  };

  const onClickDelete = () => {
    setLoading(true);

    deleteId(member, getCookie("userId"))
      .then(() => {
        removeCookie("jwt");
        removeCookie("expirationTime");
        removeCookie("userName");
        removeCookie("userId");
        removeCookie("userRole");
        removeCookie("idSave");

        navigate("/", { replace: true });
        setTimeout(() => {
          toast.success("회원탈퇴 완료");
        }, 100);
        setTimeout(() => {
          toast.info("홈으로 이동합니다.");
        }, 200);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          toast.error("회원탈퇴에 실패했습니다.");
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full mb-2 pb-4 text-3xl text-left border-b-2 border-gray-200">
          내 정보
        </div>

        <div className="w-full py-2 flex justify-center items-center space-x-[.25rem]">
          <div className="bg-white w-2/5 py-28 border-2 border-gray-300 rounded shadow-xl flex flex-col justify-center items-center">
            <div className="text-[12rem]">
              <FaCircleUser className="text-gray-400" />
            </div>
            <div className="pt-10 text-3xl">반갑습니다. {member.name}님</div>
          </div>

          <div className="w-3/5 flex flex-col justify-center items-center space-y-[0.25rem]">
            <div className="bg-white w-full border-2 border-gray-300 rounded shadow-xl flex flex-col justify-center items-center">
              <div className="w-full px-4 py-2 text-xl border-b-2 border-yellow-500 text-left">
                기본 정보
              </div>
              {makeRead("아이디", member.userId)}
              {makeRead("이름", member.name)}
              {makeRead(
                "생년월일",
                `${member.birthDate.split("-")[0] * 1}년
              ${member.birthDate.split("-")[1] * 1}월
              ${member.birthDate.split("-")[2] * 1}일`
              )}
              {makeRead("성별", member.gender === "F" ? "여성" : "남성")}
              {makeRead("내외국인", member.foreigner ? "외국인" : "내국인")}
            </div>

            <div className="bg-white w-full border-2 border-gray-300 rounded shadow-xl flex flex-col justify-center items-center">
              <div className="w-full px-4 py-2 text-xl border-b-2 border-yellow-500 text-left">
                연락처 정보
              </div>
              {makeRead(
                "연락처",
                member.phoneNum.slice(0, 3) +
                  "-" +
                  member.phoneNum.slice(3, 7) +
                  "-" +
                  member.phoneNum.slice(7, 11)
              )}
              {makeRead("주소", member.address.replace("-", " "))}
            </div>
          </div>
        </div>

        <div className="w-full py-2 flex justify-end items-center space-x-4">
          {makeBtn2("수정", () => {
            setLoading(true);
            setBtnType("수정");
            setModal(true);
            setLoading(false);
          })}
          {makeBtn2("탈퇴", () => {
            setLoading(true);
            setBtnType("탈퇴");
            setModal(true);
            setLoading(false);
          })}
        </div>
      </div>

      {modal && (
        <div className="bg-black bg-opacity-50 w-full h-full flex justify-center items-center fixed inset-0">
          <div className="bg-white w-5/6 max-w-[650px] p-4 rounded flex flex-col justify-center items-center space-y-4">
            <div className="text-3xl text-center font-bold">
              이메일 인증 - {btnType}
            </div>

            {makeAdd(
              "아이디",
              <div className="w-full h-full flex justify-center items-center space-x-1">
                <div
                  className={`${
                    !validation.isMailSent
                      ? "w-[calc(100%-100px)]"
                      : "w-[calc(100%-105px-8rem)]"
                  } p-4 border-2 border-gray-300 rounded-full shadow-lg text-left tracking-widest`}
                >
                  {member.userId}
                </div>
                {!validation.isMailSent ? (
                  <>
                    {makeBtn("메일 전송", async () => {
                      setLoading(true);

                      try {
                        const code = await sendMail(member);
                        setValidation({
                          ...validation,
                          isMailSent: true,
                          authCode: code,
                        });
                        toast.success("메일 전송 성공");
                      } catch (error) {
                        toast.error("메일 전송에 실패했습니다.");
                      }

                      setLoading(false);
                    })}
                  </>
                ) : (
                  <>
                    {makeInput(
                      "text",
                      "authCode",
                      member.authCode,
                      "인증번호",
                      refList.authCode,
                      onChange,
                      true,
                      "w-32 text-center"
                    )}
                    {makeBtn("인증 확인", () => {
                      setLoading(true);

                      if (validation.authCode === member.authCode * 1) {
                        toast.success("인증 완료");

                        if (btnType === "수정") navigate("modify");
                        else if (btnType === "탈퇴") onClickDelete();
                      } else {
                        toast.warn("코드를 다시 입력하세요.");
                        refList.authCode.current.focus();
                      }

                      setLoading(false);
                    })}
                  </>
                )}
              </div>
            )}

            <div className="w-full flex justify-end items-center">
              <button
                className="p-2 font-bold hover:text-gray-300 transition duration-500"
                onClick={() => {
                  setValidation({
                    isMailSent: false,
                    authCode: 0,
                  });
                  setModal(false);
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
