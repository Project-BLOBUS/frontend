import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCookie, removeCookie } from "../etc/util/cookieUtil";
import "../main/index.css";
import "react-toastify/dist/ReactToastify.css";

function Header({
  navs = [],
  navs2 = [],
  isWhite = false,
  pageTitle,
  titleBg = "#EC0245",
  textC = "#FFFFFF",
  borderB = true,
}) {
  const blobusTextColor = isWhite ? "text-white" : "text-[#3E16E2]";
  const linkTextColor = isWhite ? "text-white" : "text-[#666666]";
  const [jwt, setJwt] = useState(getCookie("jwt"));

  useEffect(() => {
    const interval = setInterval(() => {
      const newJwt = getCookie("jwt");
      if (newJwt !== jwt && !window.location.pathname.includes("member")) {
        setJwt(newJwt);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [jwt]);

  return (
    <div
      className={`font-bold ${borderB ? "border-b-2 main-border-bottom" : ""}`}
    >
      <div className="w-full sm:w-[70.6%] sm:flex-row ml-[15%] flex justify-between items-center ">
        <Link to="/main">
          <p
            className={`text-3xl ${blobusTextColor} ml-[-45px] mt-[-70px] sm:ml-[0px] sm:mt-[0px]`}
          >
            BLOBUS
          </p>
        </Link>

        <div className="mt-[65px] sm:mt-[0px] flex ml-[-130px] sm:ml-[0px] flex-wrap sm:flex-none">
          {navs.map((nav) => (
            <Link
              className={`m-4 ${linkTextColor} transition duration-500 hover:text-gray-300 `}
              key={nav.name}
              to={nav.link}
            >
              {nav.name}
            </Link>
          ))}

          {navs2.map((nav) => (
            <Link
              className={`m-3 ${linkTextColor} transition duration-500 hover:text-gray-300 opacity-0 pointer-events-none`}
              key={nav.name}
              to={nav.link}
            >
              {nav.name}
            </Link>
          ))}
        </div>

        <div className="sm:mr-[14px] mr-[30px]">
          <p
            className={`mt-[-8px] h-[50px] rounded-b-[5px] flex justify-center items-center`}
            style={{ backgroundColor: titleBg, color: textC }}
          >
            {pageTitle} {/* 메인 글자 동적으로 텍스트 표시 */}
          </p>

          <div
            className={`flex justify-center items-center mt-[10px] ${linkTextColor} mt-[20px] sm:mt-[0px] flex flex-wrap sm:flex-none`}
          >
            {!getCookie("jwt") ? (
              <>
                <Link
                  className="transition duration-500 hover:text-gray-300"
                  to="/member/signup"
                  replace={pageTitle === "계정"}
                >
                  회원가입
                </Link>
                <p className="p-2 hidden sm:block">|</p>
                <Link
                  className="transition duration-500 hover:text-gray-300 mt-[34px] sm:mt-[0px]"
                  to="/member/login"
                  replace={pageTitle === "계정"}
                >
                  로그인
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="transition duration-500 hover:text-gray-300"
                  to="/mypage"
                >
                  마이페이지
                </Link>
                <p className="p-2 hidden sm:block">|</p>
                <Link
                  className="transition duration-500 hover:text-gray-300 mt-[34px] sm:mt-[0px]"
                  onClick={() => {
                    // TODO 로그아웃 모달창
                    if (window.confirm("로그아웃하시겠습니까?")) {
                      removeCookie("jwt");
                      removeCookie("expirationTime");
                      removeCookie("userName");
                      removeCookie("userEmail");
                      removeCookie("userAddress");

                      if (!getCookie("idSave")) {
                        removeCookie("userId");
                        removeCookie("userRole");
                      }
                      setTimeout(() => {
                        toast.success("로그아웃");
                      }, 100);
                    }
                  }}
                >
                  로그아웃
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        style={{ width: "auto" }}
        className="text-base text-center text-nowrap"
        position="bottom-center"
        autoClose={1000}
        pauseOnFocusLoss={false}
        pauseOnHover
      />
    </div>
  );
}

export default Header;
