import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCookie, removeCookie } from "../etc/util/cookieUtil";
import "../main/index.css";
import "react-toastify/dist/ReactToastify.css";

function Header({ pageTitle, titleBg }) {
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

  // 메뉴의 표시 여부를 관리하는 상태
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);

  // 메뉴 클릭 시 토글 함수
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (showMenu2) setShowMenu2(false);
  };

  const toggleMenu2 = () => {
    setShowMenu2(!showMenu2);
    if (showMenu) setShowMenu(false);
  };

  // 메뉴를 닫는 함수 (링크 클릭 시)
  const closeMenu = () => {
    setShowMenu(false); // 첫 번째 메뉴 닫기
    setShowMenu2(false); // 두 번째 메뉴 닫기
  };
  

  return (
    <div className="w-[100%] h-[150px]">
      <div className="w-full h-[40px] bg-[#E9E9E9]">
        <div className="w-[70%] h-[30px] ml-[15%] flex justify-start items-center font-bold text-sm ">
          <p>청년의 도전, 부산과 함께</p>

          {!getCookie("jwt") ? (
            <>
              <Link
                className="transition duration-500 hover:text-gray-400 ml-[77%] text-lg font-medium"
                to="/member/signup"
                replace={pageTitle === "계정"}
              >
                회원가입
              </Link>
              <p className="p-2 hidden sm:block">|</p>
              <Link
                className="transition duration-500 hover:text-gray-400 text-lg font-medium"
                to="/member/login"
                replace={pageTitle === "계정"}
              >
                로그인
              </Link>
            </>
          ) : (
            <>
              <Link
                className="transition duration-500 hover:text-gray-400 ml-[74%] text-lg font-medium"
                to="/mypage"
              >
                마이페이지
              </Link>
              <p className="p-2 hidden sm:block">|</p>
              <Link
                className="transition duration-500 hover:text-gray-400 text-lg font-medium"
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

        <div className="w-full h-[60px] bg-[#F9F9F9] border-b-2">
          <div className="w-[70%] h-[60px] ml-[15%] flex justify-start items-center font-bold">
            <Link to="/main">
                       {" "}
              <div class="text-3xl italic leading-[3px] group relative duration-500">
                           {" "}
                <div class="transition group-hover:-translate-x-8 group-hover:text-[#C0C0C0] w-[70px]">
                                BLO            {" "}
                </div>
                         {" "}
                <div class="transition group-hover:translate-x-8 group-hover:text-[#C0C0C0] w-[70px]">
                                BUS            {" "}
                </div>
                         {" "}
              </div>
                     {" "}
            </Link>

            <div
              className="text-white w-[150px] h-[60px] flex justify-center items-center ml-[1%] text-xl font-medium"
              style={{ background: titleBg }}
            >
              {pageTitle}
            </div>

            <div className="w-[480px] h-[60px] ml-[13%] flex text-md font-semibold ">
              <div className="w-[160px] h-[55px] flex justify-center items-center">
                <Link to="/blobusinfo" onClick={closeMenu}>
                  <p>소개</p>
                </Link>
              </div>

              <div className="w-[160px] h-[55px] flex justify-center items-center">
                <p className="cursor-pointer" onClick={toggleMenu}>
                  청년관
                </p>
              </div>

              <div className="w-[160px] h-[55px] flex justify-center items-center">
                <p className="cursor-pointer" onClick={toggleMenu2}>
                  지역자원관
                </p>
              </div>

              <div className="w-[160px] h-[55px] flex justify-center items-center">
                <Link to="/community" onClick={closeMenu}>
                  <p>커뮤니티</p>
                </Link>
              </div>
            </div>
          </div>

          {/* 청년관 누르면 나오는 카테고리 */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              showMenu
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-100%]"
            }`}
          >
            {showMenu && (
              <div className="w-[full] h-[55px] bg-[#F9F9F9] border-b-2">
                <div className="w-[70%] h-[40px] ml-[15%] pt-4 flex justify-center items-center space-x-[-70px] text-gray-500 font-bold">
                  <div className="w-[160px] h-[55px] flex justify-center items-center">
                    <Link to="/youth/job" onClick={closeMenu}>
                      <p className="cursor-pointer">일자리</p>
                    </Link>
                  </div>

                  <div className="w-[160px] h-[55px] flex justify-center items-center">
                    <Link to="/youth/house" onClick={closeMenu}>
                      <p className="cursor-pointer">주거</p>
                    </Link>
                  </div>

                  <div className="w-[160px] h-[55px] flex justify-center items-center">
                    <Link to="/youth/welfare" onClick={closeMenu}>
                      <p className="cursor-pointer">복지</p>
                    </Link>
                  </div>

                  <div className="w-[160px] h-[55px] flex justify-center items-center">
                    <Link to="/youth/education" onClick={closeMenu}>
                      <p className="cursor-pointer">교육</p>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 지역자원관 누르면 나오는 카테고리 */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              showMenu2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[-100%]"
            }`}
          >
            {showMenu2 && (
              <div className="w-[full] h-[55px] bg-[#F9F9F9] ">
                <div className="w-[70%] h-[40px] ml-[14%] flex justify-center items-center text-gray-500 font-bold">
                  <div className="w-[130px] h-[55px] flex justify-center items-center">
                    <Link to="/resource/digital" onClick={closeMenu}>
                      <p className="cursor-pointer">디지털마케팅</p>
                    </Link>
                  </div>

                  <div className="w-[130px] h-[55px] flex justify-center items-center">
                    <Link to="/resource/culture" onClick={closeMenu}>
                      <p className="cursor-pointer">문화</p>
                    </Link>
                  </div>

                  <div className="w-[100px] h-[55px] flex justify-center items-center ">
                    <Link to="/resource/sightsee" onClick={closeMenu}>
                      <p className="cursor-pointer">관광</p>
                    </Link>
                  </div>
                </div>
              </div>
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
