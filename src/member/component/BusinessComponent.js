import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import { checkBusinessCode, getAddressData } from "../api/externalAPI ";
import { duplicate, register } from "../api/memberAPI";
import { setCookie, removeCookie } from "../util/cookieUtil";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../etc/Loading";

const initState = {
  // TODO 삭제
  userId: "520-38-01151",
  file: "",
  userPw: "qwerQWER1234!@#$",
  confirmPw: "qwerQWER1234!@#$",
  name: "Project BLOBUS",
  phoneNum: "01049164357",
  email: "blobus051@gmail.com",
  address: "부산광역시-해운대구",
  roleName: "BUSINESS",
};

const BusinessComponent = () => {
  const navigate = useNavigate();
  const { makeBtn, makeAdd, makeInput, makeSelect } = useCustomTag();
  const [loading, setLoading] = useState(false);

  const [member, setMember] = useState(initState);

  const [validation, setValidation] = useState({
    isIdValid: false,
    isAuth: false,
  });

  const [address, setAddress] = useState({
    regionList: [{ code: "", name: "" }],
    region: "",
    regionCode: 0,
    cityList: [{ code: "", name: "" }],
    city: "",
  });

  const refList = {
    userId: useRef(null),
    file: useRef(null),
    userPw: useRef(null),
    confirmPw: useRef(null),
    name: useRef(null),
    phoneNum: useRef(null),
    email: useRef(null),
    region: useRef(null),
    city: useRef(null),
  };

  useEffect(() => {
    setLoading(true);
    getAddressData(setAddress, address.regionCode);
    setLoading(false);
  }, [address.regionCode]);

  const onChange = ({ target: { name, value } }) => {
    if (name === "userId") {
      setValidation({
        ...validation,
        isIdValid: false,
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
        regionCode: address.regionList.find((r) => r.name === value).key || 0,
        city: "",
      });
      setMember({ ...member, address: "" });
    } else if (name === "city") {
      setAddress({ ...address, city: value });
      setMember({ ...member, address: `${address.region}-${value}` });
    }
  };

  const validField = () => {
    const validList = [
      [!member.userId, "아이디를 입력하세요.", refList.userId],
      [
        !/^\d{3}-\d{2}-\d{5}$/.test(member.userId),
        "올바르지 못한 아이디입니다. (사업등록번호 : 000-00-00000)",
        refList.userId,
        "userId",
      ],
      [!validation.isIdValid, "중복 확인 버튼를 누르세요."],
      [!validation.isAuth, "사업자등록 여부를 확인하세요."],
      [!member.file, "사업자 등록증을 첨부하세요.", refList.file],
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
      [!member.name, "기업명을 입력하세요.", refList.name],
      [!member.phoneNum, "담당자 연락처를 입력하세요.", refList.phoneNum],
      [
        !/^\d{10,11}$/.test(member.phoneNum),
        '올바르지 못한 연락처입니다. ("-" 없이 숫자만 입력)',
        refList.phoneNum,
        "phoneNum",
      ],
      [!member.email, "담당자 이메일을 입력하세요.", refList.email],
      [
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email),
        "올바르지 못한 이메일입니다. (example@domain.com)",
        refList.email,
        "email",
      ],
      [!address.region, "주소-시/도를 선택하세요.", refList.region],
      [!address.city, "주소-시/구/군을 선택하세요.", refList.city],
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
        } else if (err === "email") {
          setMember({ ...member, email: "" });
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
        <div className="bg-white w-full my-4 text-3xl text-sky-500">
          기업계정 회원가입
        </div>

        {/* 아이디 */}
        {makeAdd(
          "아이디",
          <div className="w-full h-full flex justify-center items-center space-x-1 track">
            {makeInput(
              "text",
              "userId",
              member.userId,
              "사업자 등록 번호",
              onChange,
              !validation.isAuth,
              refList.userId,
              !/^\d{3}-\d{2}-\d{5}$/.test(member.userId)
                ? "w-full"
                : !validation.isAuth
                ? "w-5/6"
                : "w-full"
            )}
            {!/^\d{3}-\d{2}-\d{5}$/.test(member.userId) ? (
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
            ) : !validation.isAuth ? (
              <>
                {makeBtn("등록 확인", async () => {
                  setLoading(true);

                  const result = await checkBusinessCode(member.userId);
                  if (result.b_stt_cd) {
                    toast.success("등록확인 완료");
                    toast.info(result.b_stt + " / " + result.tax_type);
                    setValidation({ ...validation, isAuth: true });
                    refList.userPw.current.focus();
                  } else {
                    toast.warn("사업자등록번호 조회 실패, 다시 입력하세요.");
                    refList.userId.current.focus();
                  }

                  setLoading(false);
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        )}

        {console.log(member.file)}
        {/* 사업자등록증 */}
        {makeAdd(
          "첨부파일",
          makeInput(
            "file",
            "file",
            member.file,
            "",
            onChange,
            validation.isAuth,
            refList.file
          )
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

        {/* 기업명 */}
        {makeAdd(
          "기업명",
          makeInput(
            "text",
            "name",
            member.name,
            "기업명",
            onChange,
            validation.isAuth,
            refList.name
          )
        )}

        {/* 담당자 연락처 */}
        {makeAdd(
          "담당자 연락처",
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

        {/* 담당자 이메일 */}
        {makeAdd(
          "담당자 이메일",
          makeInput(
            "email",
            "email",
            member.email,
            "example@domain.com",
            onChange,
            validation.isAuth,
            refList.email
          )
        )}

        {/* 기업 주소 */}
        {makeAdd(
          "기업 주소",
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

        <div className="w-full py-4 text-2xl text-center font-bold flex space-x-4">
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

export default BusinessComponent;
