import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie, setCookie } from "../../../etc/util/cookieUtil";
import { login } from "../../api/memberAPI";
import useMemberTag from "../../hook/useMemberTag";
import Loading from "../../../etc/component/Loading";
import imgLogin from "./login.png";

const Login = () => {
  const navigate = useNavigate();
  const { makeInput } = useMemberTag();
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(getCookie("userId") ?? "");
  const [userPw, setUserPw] = useState("");
  const [userRole, setUserRole] = useState(getCookie("userRole") ?? "GENERAL");
  const [idSave, setIdSave] = useState(getCookie("idSave") ?? false);

  const idRef = useRef(null);
  const pwRef = useRef(null);

  const onCLickLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (userId === "") {
      toast.warn("아이디를 입력하세요.");
      idRef.current.focus();
    } else if (userPw === "") {
      toast.warn("비밀번호를 입력하세요.");
      pwRef.current.focus();
    } else {
      const member = new FormData();
      member.append("username", userId);
      member.append("password", userPw);

      await login(member)
        .then((data) => {
          if (data.error === "DELETE" || data.delFlag) {
            toast.error("탈퇴계정입니다.");
            setTimeout(() => {
              toast.info("복구 문의 : blobus051@gmail.com");
            }, 100);
          } else if (data.error === "LOCK" || data.loginErrorCount > 5) {
            toast.error("잠금계정입니다.");
            setTimeout(() => {
              toast.info("복구 문의 : blobus051@gmail.com");
            }, 100);
          } else if (data.error) {
            setUserPw("");
            toast.error("로그인에 실패했습니다. (5회 이상 실패 시 계정 잠금)");
          } else if (userRole !== data.roleName && data.roleName !== "ADMIN") {
            toast.warn("계정종류를 다시 선택하세요.");
          } else {
            setCookie("jwt", data.accessToken);
            setCookie("expirationTime", data.expirationTime);
            setCookie("userName", data.name ?? "-");
            setCookie("userAddress", data.address);
            setCookie(
              "userEmail",
              userRole === "GENERAL" ? data.userId : data.email ?? "-"
            );
            setCookie("userId", data.userId);
            setCookie("userRole", data.roleName);
            setCookie("idSave", data.roleName === "ADMIN" ? false : idSave);

            setTimeout(() => {
              toast.success("로그인 완료");
            }, 100);
            setTimeout(() => {
              toast.info((data.name ?? data.userId) + "님 반갑습니다.");
            }, 200);
          }
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            toast.error("서버연결에 실패했습니다.");
          } else {
            toast.error("로그인에 실패했습니다.");
          }
        });
    }

    setLoading(false);
  };

  const onKeyUpLogin = (e) => {
    if (e.key === "Enter") {
      onCLickLogin(e);
    } else if (e.key === "Escape") {
      // ToDEL 삭제
      if (userRole === "GENERAL") {
        setUserId("test@test.com");
        setUserPw("qwerQWER1234!@#$");
        onCLickLogin(e);
      } else if (userRole === "BUSINESS") {
        setUserId("ADMIN");
        setUserPw("ADMIN");
        onCLickLogin(e);
      }
    }
  };

  return (
    <div className="w-full text-center font-bold flex flex-col justify-center items-center">
      {loading && <Loading />}
      <div className="w-full text-4xl p-4 text-left">통합 로그인</div>

      <div className="w-full border-2 border-gray-300 rounded-xl shadow-md text-base flex justify-center items-center">
        <div className="w-1/2 p-4 border-r-2 border-gray-300 text-left flex flex-col justify-center items-center">
          <img className="w-[80%]" src={imgLogin} alt="로그인" />
          <div className="w-full">BLOBUS에 방문해주셔서 감사합니다.</div>
          <div className="w-full">
            로그인 하시면 보다 다양한 서비스 이용이 가능합니다.
          </div>
        </div>

        <div
          className="w-1/2 px-8 p-4 flex flex-col justify-center items-center space-y-2"
          onKeyUp={onKeyUpLogin}
        >
          <div className="w-full px-10 py-2 text-2xl flex justify-around items-center space-x-4">
            {makeTab("일반회원", "GENERAL", userRole, setUserRole)}
            {makeTab("기업회원", "BUSINESS", userRole, setUserRole)}
            {/* {makeTab("관리자", "ADMIN", userRole, setUserRole)} */}
          </div>

          <div className="w-full py-2 flex flex-col justify-center items-center space-y-2">
            {makeInput(
              "text",
              "userId",
              userId,
              "아이디",
              idRef,
              (e) => setUserId(e.target.value),
              true
            )}
            {makeInput(
              "password",
              "userPw",
              userPw,
              "비밀번호",
              pwRef,
              (e) => setUserPw(e.target.value),
              true
            )}

            {userRole === "ADMIN" || (
              <div className="flex justify-center items-center cursor-pointer">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  name="idSave"
                  checked={idSave}
                  onChange={() => setIdSave(!idSave)}
                />
                <div className="ml-2" onClick={() => setIdSave(!idSave)}>
                  아이디 저장
                </div>
              </div>
            )}
          </div>

          <div className="w-full py-2 flex flex-row-reverse justify-center items-center">
            <button
              className="bg-pink-500 w-full p-4 rounded-full shadow-lg text-2xl text-white"
              onClick={onCLickLogin}
            >
              로그인
            </button>

            {/* <button
              className="bg-gray-500 w-1/6 mr-4 p-4 rounded-xl shadow-md text-white flex justify-center items-center"
              onClick={() =>
                navigate(window.history.length > 1 ? -1 : "/", {
                  replace: true,
                })
              }
            >
              <FaBackspace className="text-2xl" />
            </button> */}
          </div>

          <div className="w-full px-10 py-2 flex justify-between items-center">
            {makeLink("/member/find/id", "아이디 찾기")}
            {makeLink("/member/find/pw", "비밀번호 찾기")}
            {makeLink("/member/signup", "회원가입")}
          </div>
        </div>
      </div>
    </div>
  );
};

const makeTab = (name, role, userRole, setUserRole) => {
  return (
    <div
      className={`w-40 p-4 border-2 rounded-full ${
        userRole === role
          ? "border-pink-500"
          : "text-gray-300 border-white cursor-pointer hover:border-pink-500 hover:text-black transition duration-500"
      }`}
      onClick={() => setUserRole(role)}
    >
      {name}
    </div>
  );
};

const makeLink = (link, name) => {
  return (
    <Link to={link} className="hover:text-gray-300 transition duration-500">
      {name}
    </Link>
  );
};

export default Login;
