import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AiOutlineGlobal } from "react-icons/ai";
import { GiSouthKorea } from "react-icons/gi";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "../../../etc/util/cookieUtil";
import { getInfo, modify } from "../../api/memberAPI";
import useInfoTag from "../../hook/useInfoTag";
import Loading from "../../../etc/component/Loading";
import AddressList from "../../data/AddressList";
import { FaCircleUser } from "react-icons/fa6";

const initState = {
  userId: "",
  userPw: "",
  confirmPw: "",
  name: "",
  phoneNum: "",
  address: "-",
  birthDate: "",
  gender: "M",
  foreigner: false,
  roleName: "GENERAL",
};

const InfoMofiy = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { makeBtn2, makeModify, makeInput, makeSelect, makeRatio } =
    useInfoTag();

  const [member, setMember] = useState(initState);

  const [address, setAddress] = useState({
    regionList: [],
    region: "",
    cityList: [],
    city: "",
  });

  const [birthDate, setBirthDate] = useState({ year: "", month: "", date: "" });

  const refList = {
    userId: useRef(null),
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

    getInfo(member, getCookie("userId"))
      .then((dto) => {
        const { userPw, ...member } = dto;
        setMember(member);

        const code = member.address.split("-")[0];

        setAddress({
          regionList: AddressList().region,
          region: member.address.split("-")[0],
          cityList: code ? AddressList()[code] : [],
          city: member.address.split("-")[1],
        });

        setBirthDate({
          year: member.birthDate.split("-")[0] * 1,
          month: member.birthDate.split("-")[1] * 1,
          date: member.birthDate.split("-")[2] * 1,
        });
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
    setMember({ ...member, [name]: value });
  };

  const onChangeAddress = ({ target: { name, value } }) => {
    if (name === "region") {
      setAddress({
        ...address,
        region: value,
        city: "",
      });
      setMember({ ...member, address: `${value}-` });
    } else if (name === "city") {
      setAddress({ ...address, city: value });
      setMember({ ...member, address: `${address.region}-${value}` });
    }
  };

  const onChangeBirth = ({ target: { name, value } }) => {
    if (name === "year") {
      setBirthDate({ ...birthDate, year: value, month: "", date: "" });
    } else if (name === "month") {
      setBirthDate({ ...birthDate, month: value, date: "" });
    } else if (name === "date") {
      setBirthDate({ ...birthDate, date: value });
      setMember({
        ...member,
        birthDate: new Date(birthDate.year, birthDate.month - 1, value, 9),
      });
    }
  };

  const validField = () => {
    const validList = [
      [
        member.userPw &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/.test(
            member.userPw
          ),
        "올바르지 못한 비밀번호입니다. (영어 대소문자, 숫자, 특수기호 포함, 8~16글자)",
        refList.userPw,
        "userPw",
      ],
      [
        member.userPw && !member.confirmPw,
        "비밀번호 확인을 입력하세요.",
        refList.confirmPw,
      ],
      [
        member.userPw && member.confirmPw !== member.userPw,
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
        if (err === "userPw") {
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

  const onClickModify = async () => {
    setLoading(true);

    if (!validField()) return setLoading(false);

    await modify(member)
      .then((data) => {
        if (data.error) {
          toast.error("회원 가입에 실패했습니다.");
        } else if (data === 0) {
          toast.warn("이미 등록된 번호, 다시 입력하세요.");
          setMember({ ...member, phoneNum: "" });
          refList.phoneNum.current.focus();
        } else {
          setCookie("userAddress", member.address);
          navigate(-1, { replace: true });
          setTimeout(() => {
            toast.success("회원정보 수정 완료");
          }, 100);
          setTimeout(() => {
            member.userPw && toast.success("비밀변호 변경 완료");
          }, 200);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.");
        } else {
          toast.error("회원정보 수정에 실패했습니다.");
        }
      });

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full mb-2 pb-4 text-3xl text-left border-b-2 border-gray-200">
          내 정보 - 수정
        </div>

        <div className="w-full mt-2 py-2 flex justify-center items-center space-x-4">
          <div className="bg-white w-2/5 py-28 border-2 border-gray-300 rounded shadow-xl flex flex-col justify-center items-center">
            <div className="text-[12rem]">
              <FaCircleUser className="text-gray-400" />
            </div>
            <div className="pt-10 text-3xl">반갑습니다. {member.name}님</div>
          </div>

          <div className="bg-white w-3/5 px-4 py-[0.688rem] border-2 border-gray-300 rounded shadow-xl flex flex-col justify-center items-center space-y-2">
            {/* 비밀번호 */}
            {makeModify(
              "비밀번호",
              makeInput(
                "password",
                "userPw",
                member.userPw,
                "변경을 원할 경우에 입력",
                refList.userPw,
                onChange
              )
            )}

            {/* 비밀번호 확인 */}
            {makeModify(
              "비밀번호 확인",
              makeInput(
                "password",
                "confirmPw",
                member.confirmPw,
                "미입력 시 변경되지 않음",
                refList.confirmPw,
                onChange
              )
            )}

            {/* 이름 */}
            {makeModify(
              "이름",
              makeInput(
                "text",
                "name",
                member.name,
                "이름",
                refList.name,
                onChange
              )
            )}
            {/* 연락처 */}
            {makeModify(
              "연락처",
              makeInput(
                "text",
                "phoneNum",
                member.phoneNum,
                '"─" 없이 입력',
                refList.phoneNum,
                onChange
              )
            )}

            {/* 주소 */}
            {makeModify(
              "주소",
              <div className="w-full flex justify-center items-center space-x-1">
                {makeSelect(
                  "region",
                  address.region,
                  address.regionList,
                  "시/도 선택",
                  refList.region,
                  onChangeAddress
                )}
                {makeSelect(
                  "city",
                  address.city,
                  address.cityList,
                  "시/구/군 선택",
                  refList.city,
                  onChangeAddress
                )}
              </div>
            )}

            {/* 생년월일 */}
            {makeModify(
              "생년월일",
              <div className="w-full flex justify-center items-center space-x-1">
                {makeSelect(
                  "year",
                  birthDate.year,
                  Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, i) => 1900 + i
                  ).reverse(),
                  "연도 선택",
                  refList.year,
                  onChangeBirth
                )}
                {makeSelect(
                  "month",
                  birthDate.month,
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  "월 선택",
                  refList.month,
                  onChangeBirth
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
                  refList.date,
                  onChangeBirth
                )}
              </div>
            )}

            {/* 성별 */}
            {makeModify(
              "성별",
              <div className="w-full flex justify-center items-center space-x-1">
                {makeRatio(
                  member.gender === "M",
                  IoMdMale,
                  "남성",
                  () =>
                    member.gender === "M" ||
                    setMember({ ...member, gender: "M" })
                )}
                {makeRatio(
                  member.gender === "F",
                  IoMdFemale,
                  "여성",
                  () =>
                    member.gender === "F" ||
                    setMember({ ...member, gender: "F" })
                )}
              </div>
            )}

            {/* 내외국인 */}
            {makeModify(
              "내와국인",
              <div className="w-full flex justify-center items-center space-x-1">
                {makeRatio(!member.foreigner, GiSouthKorea, "내국인", () =>
                  setMember({ ...member, foreigner: false })
                )}
                {makeRatio(member.foreigner, AiOutlineGlobal, "외국인", () =>
                  setMember({ ...member, foreigner: true })
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full py-2 flex justify-end items-center space-x-4">
          {makeBtn2("완료", onClickModify)}
          {makeBtn2("취소", () => {
            navigate(-1, { replace: true });
          })}
        </div>
      </div>
    </>
  );
};

export default InfoMofiy;
