import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaBackspace } from "react-icons/fa";
import { GiSouthKorea } from "react-icons/gi";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { toast } from "react-toastify";
import { setCookie, removeCookie } from "../util/cookieUtil";
import { duplicate, register } from "../api/memberAPI";

const initState = {
  userId: "bell4916@naver.com",
  authCode: "123456",
  userPw: "",
  confirmPw: "",
  name: "",
  phoneNum: "",
  address: "",
  birthDate: null,
  gender: "M",
  foreigner: false,
  roleName: "GENERAL",
};

const GeneralComponent = () => {
  const [member, setMember] = useState(initState);

  const [isIdValid, setIsIdValid] = useState(false);
  const [authCode, setAuthCode] = useState();
  const [isMailSent, setIsMailSent] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [regionList, setRegionList] = useState([{ code: "", name: "" }]);
  const [region, setRegion] = useState(member.address.split("-")[0]);
  const [regionCode, setRegionCode] = useState(0);
  const [cityList, setCityList] = useState([{ code: "", name: "" }]);
  const [city, setCity] = useState(member.address.split("-")[1]);

  const [year, setYear] = useState(1900);
  const [month, setMonth] = useState(1);
  const [date, setDate] = useState();

  const navigate = useNavigate();

  const key = "fbf556c8d8a044b7a60b";
  const secret = "484c7af49e1c4a2188d9";

  useEffect(() => {
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
  }, [regionCode]);

  const onChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });

    if (e.target.name === "userId") {
      setIsIdValid(false);
      setAuthCode(0);
      setIsMailSent(false);
      setIsAuth(false);
    }
  };

  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    let address = region + "-" + city;

    if (name === "region") {
      setRegion(value);
      setRegionCode(regionList.find((region) => region.name === value).key);
      address = value + "-" + city;
    } else if (name === "city") {
      setCity(value);
      address = region + "-" + value;
    }
    setMember({ ...member, address: address });
  };

  const onChangeBirth = (e) => {
    const { name, value } = e.target;
    let birth = new Date(year, month, date);

    if (name === "year") {
      setYear(value);
      birth = new Date(value, month, date);
    } else if (name === "month") {
      setMonth(value);
      birth = new Date(year, value, date);
    } else if (name === "date") {
      setDate(value);
      birth = new Date(year, month, value);
    }
    setMember({ ...member, birthDate: birth });
  };

  const onCLickRegister = () => {
    if (true) {
      // TODO : 각 입력값 검증
    } else {
      register(member)
        .then(() => {
          toast.success("회원 가입 완료");
          setTimeout(() => {
            setCookie("userId", member.userId);
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

    console.log(
      "아이디 : " +
        member.userId +
        "\n인증코드 : " +
        member.authCode +
        "\n비밀번호 : " +
        member.userPw +
        "\n비밀번호 확인 : " +
        member.confirmPw +
        "\n이름 : " +
        member.name +
        "\n전화번호 : " +
        member.phoneNum +
        "\n주소 : " +
        member.address +
        "\n생년월일 : " +
        member.birthDate +
        "\n성별 : " +
        member.gender +
        "\n내외국인 : " +
        member.foreigner +
        "\n계정 종류 : " +
        member.roleName
    );
  };

  return (
    <div className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-2">
      <div className="bg-white w-full my-4 text-3xl text-sky-500">
        일반계정 회원가입
      </div>

      {/* 아이디 */}
      {makeAdd(
        "아이디",
        <div className="w-full h-full flex justify-center items-center space-x-1">
          {makeInput(
            "email",
            "userId",
            member.userId,
            "이메일",
            onChange,
            !isAuth,
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.userId)
              ? "w-full"
              : !isMailSent
              ? "w-5/6"
              : !isAuth
              ? "w-1/2"
              : "w-full"
          )}
          {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.userId) ? (
            <></>
          ) : !isIdValid ? (
            <>
              {makeBtn("중복 확인", () => {
                duplicate(member)
                  .then((data) => {
                    if (!data) {
                      setIsIdValid(true);
                      toast.success("가입 가능한 아이디");
                    } else {
                      toast.warn("중복된 아이디");
                    }
                  })
                  .catch(() => {
                    toast.error("서버 연결 실패");
                  });
              })}
            </>
          ) : !isMailSent ? (
            <>
              {makeBtn("메일 전송", () => {
                // TODO : 메일 전송
                if (true) {
                  setAuthCode(123456);
                  setIsMailSent(true);
                  toast.success("인증 메일 발송");
                } else {
                  toast.warn("메일 전송 실패");
                }
              })}
            </>
          ) : !isAuth ? (
            <>
              {makeInput(
                "number",
                "authCode",
                member.authCode,
                "인증번호",
                onChange,
                !isAuth,
                "w-1/3"
              )}
              {makeBtn("인증 확인", () => {
                // TODO : 인증
                if (authCode === member.authCode * 1) {
                  setIsAuth(true);
                  toast.success("인증 완료");
                } else {
                  toast.warn("인증 실패");
                }
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
          isAuth
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
          isAuth
        )
      )}

      {/* 이름 */}
      {makeAdd(
        "이름",
        makeInput("text", "name", member.name, "이름", onChange, isAuth)
      )}

      {/* 전화번호 */}
      {makeAdd(
        "전화번호",
        makeInput(
          "text",
          "phoneNum",
          member.phoneNum,
          '"─" 없이 입력',
          onChange,
          isAuth
        )
      )}

      {/* 주소 */}
      {makeAdd(
        "주소",
        <div className="w-full flex justify-center items-center space-x-1">
          {makeSelect(
            "region",
            regionList,
            "시/도 선택",
            onChangeAddress,
            isAuth,
            "w-1/2"
          )}
          {makeSelect(
            "city",
            cityList,
            "시/구/군 선택",
            onChangeAddress,
            isAuth,
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
            Array.from(
              { length: new Date().getFullYear() - 1900 + 1 },
              (_, i) => ({
                key: 1900 + i,
                name: 1900 + i,
              })
            ).reverse(),
            "연도 선택",
            onChangeBirth,
            isAuth,
            "w-1/3"
          )}
          {makeSelect(
            "month",
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "월 선택",
            onChangeBirth,
            isAuth,
            "w-1/3"
          )}
          {makeSelect(
            "date",
            Array.from(
              { length: new Date(year, month, 0).getDate() },
              (_, i) => i + 1
            ),
            "일 선택",
            onChangeBirth,
            isAuth,
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
            isAuth,
            "w-1/2"
          )}
          {makeRatio(
            member.gender === "F",
            IoMdFemale,
            "여성",
            () =>
              member.gender === "F" || setMember({ ...member, gender: "F" }),
            isAuth,
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
            isAuth,
            "w-1/2"
          )}
          {makeRatio(
            member.foreigner,
            AiOutlineGlobal,
            "외국인",
            () => setMember({ ...member, foreigner: true }),
            isAuth,
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

const makeInput = (type, name, value, hint, onChange, isAuth, width) => {
  return (
    <input
      className={`${
        width ?? "w-full"
      } p-4 border border-gray-500 rounded shadow-lg text-left ${
        isAuth || "bg-gray-400 border-none text-white placeholder-gray-300"
      }`}
      type={type}
      name={name}
      value={value ?? ""}
      placeholder={hint}
      autoComplete="off"
      onChange={onChange}
      disabled={!isAuth}
    />
  );
};

const makeSelect = (name, list, hint, onChange, isAuth, width) => {
  return (
    <select
      className={`${
        width ?? "w-full"
      } p-4 border border-gray-500 rounded shadow-lg text-center ${
        isAuth || "bg-gray-500 border-none text-gray-300"
      }`}
      name={name}
      onChange={onChange}
      disabled={!isAuth}
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

const makeRatio = (value, Icon, text, onClick, isAuth, width) => {
  return (
    <div
      className={`${
        width ?? "w-full"
      } p-4 border border-gray-500 rounded shadow-lg flex justify-center items-center space-x-4 ${
        isAuth
          ? value
            ? "text-black"
            : "text-gray-300 cursor-pointer hover:bg-sky-500 hover:text-white transition duration-500"
          : "bg-gray-400 border-none text-gray-300"
      }`}
      onClick={isAuth ? onClick : undefined}
    >
      <Icon className="w-6 h-6" />
      <div>{text}</div>
    </div>
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

export default GeneralComponent;
