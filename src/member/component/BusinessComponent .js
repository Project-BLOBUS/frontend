import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import { duplicate, register } from "../api/memberAPI";
import { setCookie, removeCookie } from "../util/cookieUtil";
import Loading from "../etc/Loading";

const initState = {
  userId: "",
  userPw: "",
  confirmPw: "",
  name: "",
  phoneNum: "",
  email: "",
  address: "",
  roleName: "BUSINESS",
};

const BusinessComponent = () => {
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(initState);

  const [isIdValid, setIsIdValid] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [regionList, setRegionList] = useState([{ code: "", name: "" }]);
  const [region, setRegion] = useState("");
  const [regionCode, setRegionCode] = useState(0);
  const [cityList, setCityList] = useState([{ code: "", name: "" }]);
  const [city, setCity] = useState("");

  const userIdRef = useRef(null);
  const userPwRef = useRef(null);
  const confirmPwRef = useRef(null);
  const nameRef = useRef(null);
  const phoneNumRef = useRef(null);
  const emailRef = useRef(null);
  const regionRef = useRef(null);
  const cityRef = useRef(null);

  const navigate = useNavigate();

  const key = "fbf556c8d8a044b7a60b";
  const secret = "484c7af49e1c4a2188d9";

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const resForToken = await axios.get(
          "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
          { params: { consumer_key: key, consumer_secret: secret } }
        );
        const resForRegion = await axios.get(
          "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
          { params: { accessToken: resForToken.data.result.accessToken } }
        );
        const temp = resForRegion.data.result.map((region) => ({
          key: region.cd * 1,
          name: region.addr_name,
        }));
        setRegionList(temp);

        const resForCity = await axios.get(
          "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
          {
            params: {
              accessToken: resForToken.data.result.accessToken,
              cd: regionCode,
            },
          }
        );
        setCityList(
          resForCity.data.result.map((city) => ({
            key: city.cd * 1,
            name: city.addr_name,
          }))
        );
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      }
    };
    fetchData();

    setLoading(false);
  }, [regionCode]);

  const onChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });

    if (e.target.name === "userId") {
      setIsIdValid(false);
      setIsAuth(false);
    }
  };

  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    let address = region + "-" + city;

    if (name === "region") {
      setRegion(value);
      setRegionCode(regionList.find((region) => region.name === value).key);
      setCity("");
      address = value + "-" + city;
    } else if (name === "city") {
      setCity(value);
      address = region + "-" + value;
      setMember({ ...member, address: address });
    }
  };

  const onCLickRegister = () => {
    setLoading(true);

    if (member.userId === "") {
      toast.warn("아이디 입력 필요");
      userIdRef.current.focus();
    } else if (!isIdValid) {
      toast.warn("아이디 중복 확인 필요");
    } else if (!isAuth) {
      toast.warn("아이디 인증 확인 필요");
    } else if (member.userPw === "") {
      toast.warn("비밀번호 입력 필요");
      userPwRef.current.focus();
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`_-]).{8,16}$/.test(
        member.userPw
      )
    ) {
      toast.warn(
        "비밀번호 재입력 필요 (영어 대소문자, 숫자, 특수기호 포함, 8~16글자)"
      );
      userPwRef.current.focus();
    } else if (member.confirmPw === "") {
      toast.warn("비밀번호 확인 입력 필요");
      confirmPwRef.current.focus();
    } else if (member.confirmPw !== member.userPw) {
      toast.warn("비밀번호 불일치");
      confirmPwRef.current.focus();
    } else if (member.name === "") {
      toast.warn("기업명 입력 필요");
      nameRef.current.focus();
    } else if (member.phoneNum === "") {
      toast.warn("담당자 연락처 입력 필요");
      phoneNumRef.current.focus();
    } else if (!/^\d{10,11}$/.test(member.phoneNum)) {
      toast.warn('담당자 연락처 재입력 필요 ("-" 없이 입력)');
      phoneNumRef.current.focus();
    } else if (member.email === "") {
      toast.warn("담당자 이메일 입력 필요");
      emailRef.current.focus();
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
      toast.warn("담당자 이메일 재입력 필요 (example@domain.com)");
      emailRef.current.focus();
    } else if (region === "") {
      toast.warn("주소 시/도 선택 필요");
      regionRef.current.focus();
    } else if (city === "") {
      toast.warn("주소 시/구/군 선택 필요");
      cityRef.current.focus();
    } else {
      register(member)
        .then(() => {
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
        })
        .catch(() => {
          toast.error("회원 가입 실패");
        });
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-2">
      <div className="bg-white w-full my-4 text-3xl text-sky-500">
        기업계정 회원가입
      </div>

      {loading && <Loading />}
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
            !isAuth,
            userIdRef,
            !/^\d{3}-\d{2}-\d{5}$/.test(member.userId)
              ? "w-full"
              : !isAuth
              ? "w-5/6"
              : "w-full"
          )}
          {!/^\d{3}-\d{2}-\d{5}$/.test(member.userId) ? (
            <></>
          ) : !isIdValid ? (
            <>
              {makeBtn("중복 확인", async () => {
                setLoading(true);

                try {
                  const data = await duplicate(member);
                  if (!data) {
                    setIsIdValid(true);
                    toast.success("가입 가능한 아이디");
                  } else {
                    toast.warn("중복된 아이디");
                  }
                } catch (error) {
                  toast.error("서버 연결 실패");
                }

                setLoading(false);
              })}
            </>
          ) : !isAuth ? (
            <>
              {makeBtn("인증 확인", async () => {
                setLoading(true);

                try {
                  setIsAuth(true);
                  toast.success("인증 성공");
                } catch (error) {
                  toast.error("인증 실패");
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
          isAuth,
          userPwRef
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
          isAuth,
          confirmPwRef
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
          isAuth,
          nameRef
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
          isAuth,
          phoneNumRef
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
          isAuth,
          emailRef
        )
      )}

      {/* 기업 주소 */}
      {makeAdd(
        "기업 주소",
        <div className="w-full flex justify-center items-center space-x-1">
          {makeSelect(
            "region",
            region,
            regionList,
            "시/도 선택",
            onChangeAddress,
            isAuth,
            regionRef,
            "w-1/2"
          )}
          {makeSelect(
            "city",
            city,
            cityList,
            "시/구/군 선택",
            onChangeAddress,
            isAuth,
            cityRef,
            "w-1/2"
          )}
        </div>
      )}

      <div className="w-full text-2xl text-center font-bold flex space-x-4">
        <button
          className="bg-gray-500 w-1/4 mt-4 p-4 rounded-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
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
          className="bg-sky-500 w-3/4 mt-4 p-4 rounded-xl text-white hover:bg-sky-300 hover:text-black transition duration-500"
          onClick={onCLickRegister}
        >
          완료
        </button>
      </div>
    </div>
  );
};

const makeAdd = (label, makeInput) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex justify-center items-stretch text-base font-bold">
        <div className="bg-sky-300 w-1/4 p-4 rounded text-nowrap flex justify-center items-center">
          {label}
        </div>
        <div className="w-3/4 ml-2 flex justify-center items-center">
          {makeInput}
        </div>
      </div>
    </div>
  );
};

const makeInput = (type, name, value, hint, onChange, isAuth, ref, width) => {
  return (
    <input
      className={`${
        width ?? "w-full"
      } p-4 border border-gray-500 rounded shadow-lg text-left tracking-widest  ${
        isAuth || "bg-gray-400 border-none text-white placeholder-gray-300"
      }`}
      type={type}
      name={name}
      value={value ?? ""}
      placeholder={hint}
      minLength={name === "userPw" || name === "confirmPw" ? 8 : undefined}
      maxLength={
        name === "userPw" || name === "confirmPw"
          ? 16
          : name === "phoneNum"
          ? 11
          : undefined
      }
      autoComplete="off"
      onChange={onChange}
      disabled={!isAuth}
      ref={ref}
    />
  );
};

const makeSelect = (name, value, list, hint, onChange, isAuth, ref, width) => {
  return (
    <select
      className={`${
        width ?? "w-full"
      } p-4 border border-gray-500 rounded shadow-lg text-center ${
        isAuth || "bg-gray-500 border-none text-gray-300"
      }`}
      name={name}
      value={value}
      onChange={onChange}
      disabled={!isAuth}
      ref={ref}
    >
      <option
        className="bg-sky-500 text-white font-bold"
        value=""
        disabled
        selected
      >
        {hint}
      </option>
      {list.map((data) => (
        <option key={data.key ?? data} value={data.name ?? data}>
          {data.name ?? data}
        </option>
      ))}
    </select>
  );
};

const makeBtn = (name, onClick) => {
  const bgColor = {
    "중복 확인": "bg-red-500 hover:bg-red-300",
    "메일 전송": "bg-green-500 hover:bg-green-300",
    "인증 확인": "bg-blue-500 hover:bg-blue-300",
  };

  return (
    <button
      className={`${bgColor[name]} w-1/6 h-full rounded-xl text-xs text-nowrap text-white hover:text-black transition duration-500`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default BusinessComponent;
