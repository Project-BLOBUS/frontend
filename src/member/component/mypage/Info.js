import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { get } from "../../api/memberAPI";
import { getCookie } from "../../util/cookieUtil";
import Loading from "../../etc/Loading";

const initState = {
  userId: getCookie("userId"),
  name: "",
  phoneNum: "",
  address: "-",
  birthDate: "",
  roleName: "GENERAL",
};

const Info = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [member, setMember] = useState(initState);

  useEffect(() => {
    setLoading(true);

    get(member)
      .then((dto) => {
        const { userPw, ...member } = dto;
        setMember(member);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버 연결에 실패했습니다.");
        } else {
          toast.error("회원정보를 불러오는데 실패했습니다.");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      });

    setLoading(false);
  }, [member]);

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center space-y-4">
        <div className="w-full py-4 border-b-4 border-gray-500 text-3xl text-left flex justify-between items-center">
          내 정보
        </div>

        <div className="w-full px-10 flex flex-col justify-center items-center">
          <div className="w-full pt-4 pb-1 border-b-4 border-gray-300 flex justify-end items-center">
            <button className="bg-green-500 px-4 py-2 rounded text-base text-white hover:bg-green-300 hover:text-black transition duration-500">
              수정
            </button>
          </div>

          <>
            {makeRead("아이디", member.userId)}
            {makeRead("이름", member.name)}
            {makeRead("연락처", member.phoneNum)}
            {makeRead("주소", member.address.replace("-", " "))}
            {makeRead(
              "생년월일",
              `${member.birthDate.split("-")[0] * 1}년
            ${member.birthDate.split("-")[1] * 1}월
            ${member.birthDate.split("-")[2] * 1}일`
            )}
            {makeRead("성별", member.gender === "M" ? "남성" : "여성")}
            {makeRead("내외국인", member.foreigner ? "외구인" : "내국인")}
          </>

          <div className="w-full pt-1 border-t-4 border-gray-300 flex justify-end items-center">
            <button className="px-4 py-2 rounded text-base hover:bg-black hover:text-red-500 transition duration-500">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const makeRead = (name, info) => {
  const commoncCSS = "p-4 border-b-2 border-gray-300 text-nowrap";
  return (
    <div className="w-full flex justify-center items-center">
      <div className={`bg-gray-200 w-1/6 ${commoncCSS}`}>{name}</div>
      <div className={`w-5/6 text-left ${commoncCSS}`}>{info}</div>
    </div>
  );
};

export default Info;
