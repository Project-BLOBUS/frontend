import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaBackspace } from "react-icons/fa";
import { GiSouthKorea } from "react-icons/gi";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { toast } from "react-toastify";
import { duplicate, sendMail, register } from "../api/memberAPI";
import { setCookie, removeCookie } from "../util/cookieUtil";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../etc/Loading";
import AddressList from "../data/AddressList";

const initState = {
  // TODO 삭제
  userId: "bell4916@naver.com",
  authCode: "",
  userPw: "Yang544110!@",
  confirmPw: "Yang544110!@",
  name: "양성규",
  phoneNum: "01049164357",
  address: "",
  birthDate: null,
  gender: "M",
  foreigner: false,
  roleName: "GENERAL",
};

const GeneralComponent = () => {
  const navigate = useNavigate();
  const { makeBtn, makeAdd, makeInput, makeSelect, makeRatio } = useCustomTag();
  const [loading, setLoading] = useState(false);

  const [member, setMember] = useState(initState);

  const [validation, setValidation] = useState({
    isIdValid: false,
    isMailSent: false,
    authCode: 0,
    isAuth: false,
  });

  const [address, setAddress] = useState({
    regionList: [],
    region: "",
    cityList: [],
    city: "",
  });

  const [birthDate, setBirthDate] = useState({ year: "", month: "", date: "" });

  const refList = {
    userId: useRef(null),
    authCode: useRef(null),
    userPw: useRef(null),
    confirmPw: useRef(null),
    name: useRef(null),
    phoneNum: useRef(null),
    region: useRef(null),
    city: useRef(null),
    year: useRef(null),
    month: useRef(null),
    date: useRef(null),
  };

  useEffect(() => {
    setLoading(true);

    setAddress({
      ...address,
      regionList: AddressList().region,
      cityList: address.region ? AddressList()[address.region] : [],
    });

    setLoading(false);
  }, [address.region]);

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

  const onChangeAddress = ({ target: { name, value } }) => {
    if (name === "region") {
      setAddress({
        ...address,
        region: value,
        city: "",
      });
      setMember({ ...member, address: "" });
    } else if (name === "city") {
      setAddress({ ...address, city: value });
      setMember({ ...member, address: `${address.region}-${value}` });
    }
  };

  const onChangeBirth = ({ target: { name, value } }) => {
    if (name === "year") {
      setBirthDate({ ...birthDate, year: value, month: "", date: "" });
      setMember({ ...member, birthDate: null });
    } else if (name === "month") {
      setBirthDate({ ...birthDate, month: value, date: "" });
      setMember({ ...member, birthDate: null });
    } else if (name === "date") {
      setBirthDate({ ...birthDate, date: value });
      setMember({
        ...member,
        birthDate: new Date(birthDate.year, birthDate.month - 1, value),
      });
    }
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
      [!validation.isIdValid, "중복 확인 버튼를 누르세요."],
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
      [!member.name, "이름을 입력하세요.", refList.name],
      [!member.phoneNum, "연락처를 입력하세요.", refList.phoneNum],
      [
        !/^\d{10,11}$/.test(member.phoneNum),
        '올바르지 못한 연락처입니다. ("-" 없이 숫자만 입력)',
        refList.phoneNum,
        "phoneNum",
      ],
      [!address.region, "주소-시/도를 선택하세요.", refList.region],
      [!address.city, "주소-시/구/군을 선택하세요.", refList.city],
      [!birthDate.year, "생녕월일 연도를 선택하세요.", refList.year],
      [!birthDate.month, "생년월일 월을 선택하세요.", refList.month],
      [!birthDate.date, "생년월일 일을 선택하세요.", refList.date],
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
        } else if (err === "phoneNum") {
          setMember({ ...member, phoneNum: "" });
        }
        ref?.current?.focus();
        return false;
      }
    }
    return true;
  };

  const onCLickRegister = async () => {
    setLoading(true);

    if (!validField()) return setLoading(false);

    await register(member)
      .then((data) => {
        if (data.error) {
          toast.error("회원 가입에 실패했습니다.");
        } else if (data === 0) {
          toast.warn("이미 등록된 번호, 다시 입력하세요.");
          setMember({ ...member, phoneNum: "" });
          refList.phoneNum.current.focus();
        } else {
          toast.success("회원 가입 완료");
          setTimeout(() => {
            setCookie("userId", member.userId);
            setCookie("userRole", member.roleName);
            removeCookie("isGeneral");
            navigate(-3, { replace: true });
            setTimeout(() => {
              navigate("/member/login");
            }, 10);
          }, 1000);
        }
      })
      .catch(() => {
        toast.error("회원 가입에 실패했습니다.");
      });

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-2">
        <div className="bg-white w-full my-4 text-5xl text-sky-500">
          일반계정 회원가입
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
            ) : !validation.isIdValid ? (
              <>
                {makeBtn("중복 확인", async () => {
                  setLoading(true);

                  try {
                    const data = await duplicate(member);
                    if (!data) {
                      toast.success("가입 가능한 아이디");
                      setValidation({ ...validation, isIdValid: true });
                    } else {
                      toast.warn("중복된 아이디, 다시 입력하세요.");
                      refList.userId.current.focus();
                    }
                  } catch (error) {
                    toast.error("서버 연결에 실패했습니다.");
                  }

                  setLoading(false);
                })}
              </>
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
                    refList.userPw.current.focus();
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

        {/* 이름 */}
        {makeAdd(
          "이름",
          makeInput(
            "text",
            "name",
            member.name,
            "이름",
            onChange,
            validation.isAuth,
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
            validation.isAuth,
            refList.phoneNum
          )
        )}

        {/* 주소 */}
        {makeAdd(
          "주소",
          <div className="w-full flex justify-center items-center space-x-1">
            {makeSelect(
              "region",
              address.region,
              address.regionList,
              "시/도 선택",
              onChangeAddress,
              validation.isAuth,
              refList.region,
              "w-1/2"
            )}
            {makeSelect(
              "city",
              address.city,
              address.cityList,
              "시/구/군 선택",
              onChangeAddress,
              validation.isAuth,
              refList.city,
              "w-1/2"
            )}
          </div>
        )}

        {/* 생년월일 */}
        {makeAdd(
          "생년월일",
          <div className="w-full flex justify-center items-center space-x-1">
            {makeSelect(
              "year",
              birthDate.year,
              Array.from(
                { length: new Date().getFullYear() - 1900 + 1 - 14 },
                (_, i) => 1900 + i
              ).reverse(),
              "연도 선택",
              onChangeBirth,
              validation.isAuth,
              refList.year,
              "w-1/3"
            )}
            {makeSelect(
              "month",
              birthDate.month,
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              "월 선택",
              onChangeBirth,
              validation.isAuth,
              refList.month,
              "w-1/3"
            )}
            {makeSelect(
              "date",
              birthDate.date,
              Array.from(
                {
                  length: new Date(
                    birthDate.year,
                    birthDate.month,
                    0
                  ).getDate(),
                },
                (_, i) => i + 1
              ),
              "일 선택",
              onChangeBirth,
              validation.isAuth,
              refList.date,
              "w-1/3"
            )}
          </div>
        )}

        {/* 성별 */}
        {makeAdd(
          "성별",
          <div className="w-full flex justify-center items-center space-x-1">
            {makeRatio(
              member.gender === "M",
              IoMdMale,
              "남성",
              () =>
                member.gender === "M" || setMember({ ...member, gender: "M" }),
              validation.isAuth,
              "w-1/2"
            )}
            {makeRatio(
              member.gender === "F",
              IoMdFemale,
              "여성",
              () =>
                member.gender === "F" || setMember({ ...member, gender: "F" }),
              validation.isAuth,
              "w-1/2"
            )}
          </div>
        )}

        {/* 내외국인 */}
        {makeAdd(
          "내와국인",
          <div className="w-full flex justify-center items-center space-x-1">
            {makeRatio(
              !member.foreigner,
              GiSouthKorea,
              "내국인",
              () => setMember({ ...member, foreigner: false }),
              validation.isAuth,
              "w-1/2"
            )}
            {makeRatio(
              member.foreigner,
              AiOutlineGlobal,
              "외국인",
              () => setMember({ ...member, foreigner: true }),
              validation.isAuth,
              "w-1/2"
            )}
          </div>
        )}

        <div className="w-full pt-2 text-2xl text-center font-bold flex space-x-4">
          <button
            className="bg-gray-500 w-1/4 p-4 rounded-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
          >
            <FaBackspace className="text-3xl" />
          </button>

          <button
            className="bg-sky-500 w-3/4 p-4 rounded-xl text-white hover:bg-sky-300 hover:text-black transition duration-500"
            onClick={onCLickRegister}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
};

export default GeneralComponent;
