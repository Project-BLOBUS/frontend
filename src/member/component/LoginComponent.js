import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import { login } from "../api/memberAPI";
import { getCookie, setCookie } from "../util/cookieUtil";
import Loading from "../etc/Loading";

const LoginComponent = () => {
  const navigate = useNavigate();
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
          if (data.error === "LOCK") {
            toast.error("잠긴 계정입니다. - 복구 문의 : blobus051@gmail.com");
          } else if (data.error) {
            toast.error("로그인에 실패했습니다. (5회 이상 실패 시 계정 잠금)");
            setUserPw("");
          } else if (data.delFlag) {
            toast.error("탈퇴한 계정입니다. - 복구 문의 : blobus051@gmail.com");
          } else if (userRole !== data.roleName) {
            toast.warn("계정 종류를 다시 선택하세요.");
          } else {
            setCookie("jwt", data.accessToken);
            setCookie("expirationTime", data.expirationTime);
            setCookie("name", data.name);
            setCookie("userId", userId);
            setCookie("userRole", userRole);
            userRole !== "ADMIN" && setCookie("idSave", idSave);

            toast.success("로그인 완료 : " + data.userId);
            setTimeout(() => {
              const moveAfterLogin = () => {
                if (window.location.pathname.includes("member")) {
                  navigate(-1, { replace: true });
                  setTimeout(moveAfterLogin, 10);
                }
              };
              moveAfterLogin();
            }, 1000);
          }
        })
        .catch(() => {
          toast.error("로그인에 실패했습니다.");
        });
    }

    setLoading(false);
  };

  const onKeyUpLogin = (e) => {
    if (e.key === "Enter") {
      onCLickLogin(e);
    } else if (e.key === "Escape") {
      // TODO 삭제
      if (userRole === "GENERAL") {
        setUserId("bell4916@naver.com");
        setUserPw("Yang544110!@");
        onCLickLogin(e);
      } else if (userRole === "BUSINESS") {
        setUserId("520-38-01151");
        setUserPw("qwerQWER1234!@#$");
        onCLickLogin(e);
      } else if (userRole === "ADMIN") {
        setUserId("ADMIN");
        setUserPw("ADMIN");
        onCLickLogin(e);
      }
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div
        className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-4"
        onKeyUp={onKeyUpLogin}
      >
        <div className="w-full my-4 text-5xl text-sky-500">로그인</div>

        <div className="w-full flex justify-between">
          {makeTab("일반", "GENERAL", userRole, setUserRole)}
          {makeTab("기업", "BUSINESS", userRole, setUserRole)}
          {makeTab("관리자", "ADMIN", userRole, setUserRole)}
        </div>

        <input
          className="w-full p-4 border border-gray-500 rounded-lg"
          type="text"
          name="userId"
          value={userId ?? ""}
          placeholder="아이디"
          autoComplete="off"
          onChange={(e) => setUserId(e.target.value)}
          ref={idRef}
        />

        <input
          className="w-full p-4 border border-gray-500 rounded-lg"
          type="password"
          name="userPw"
          value={userPw ?? ""}
          placeholder="비밀번호"
          autoComplete="off"
          onChange={(e) => setUserPw(e.target.value)}
          ref={pwRef}
        />

        {userRole === "ADMIN" || (
          <div className="group w-full flex justify-center items-center cursor-pointer">
            <input
              className="w-4 h-4"
              type="checkbox"
              name="idSave"
              checked={idSave}
              onChange={() => setIdSave(!idSave)}
            />
            <div
              className={`ml-2 transition duration-500 ${
                idSave
                  ? "group-hover:text-gray-300"
                  : "group-hover:text-sky-300"
              }`}
              onClick={() => setIdSave(!idSave)}
            >
              아이디 저장
            </div>
          </div>
        )}

        <div className="w-full pt-2 text-2xl flex space-x-4">
          <button
            className="bg-gray-500 w-1/6 p-4 rounded-2xl shadow-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
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
            className="bg-sky-500 w-5/6 p-4 rounded-2xl shadow-xl text-white hover:bg-sky-300 hover:text-black transition duration-500"
            onClick={onCLickLogin}
          >
            LOGIN
          </button>
        </div>

        <div className="w-full px-20 text-base flex justify-between items-start">
          {makeLink("/member/findid", "아이디 찾기")}
          <div>|</div>
          {makeLink("/member/findpw", "비밀번호 찾기")}
          <div>|</div>
          {makeLink("/member/signup", "회원가입")}
        </div>
      </div>
    </>
  );
};

const makeTab = (name, role, userRole, setUserRole) => {
  return (
    <div
      className={`w-1/3 p-4 rounded-t-2xl ${
        userRole === role
          ? "bg-sky-500 text-white"
          : "text-gray-300 cursor-pointer hover:bg-sky-300 hover:text-black transition duration-500"
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

export default LoginComponent;
