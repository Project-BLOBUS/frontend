import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCookie } from "../util/cookieUtil";
import Header from "../../main/Header";
import Loading from "../etc/Loading";

const MyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [jwt, setJwt] = useState(getCookie("jwt"));

  useEffect(() => {
    setLoading(true);

    const interval = setInterval(() => {
      const newJwt = getCookie("jwt");

      if (!newJwt) {
        navigate("/member/login");
        setJwt(newJwt);
        setTimeout(() => {
          toast.error("로그인이 필요합니다.", { toastId: "e" });
        }, 200);
      } else if (getCookie("userRole") !== "GENERAL") {
        navigate("/");
        setTimeout(() => {
          toast.error("접근 불가능한 페이지입니다.", { toastId: "e" });
        }, 100);
      }
    }, 100);

    setLoading(false);
    return () => clearInterval(interval);
  }, [jwt]);

  return (
    <>
      {loading && <Loading />}
      <div className="bg-[rgb(255,215,25)]">
        <Header
          isWhite={true}
          pageTitle="마이페이지"
          titleBg="rgb(255,125,0)"
          borderB={false}
        />
      </div>
      <div className="w-[15%] h-screen pt-20 text-base text-center flex flex-col justify-start items-center fixed z-0">
        <div className="bg-pink-500 w-2/3 border-2 rounded-2xl font-bold">
          <div className="py-6 text-xl text-white">마이페이지</div>

          <div className="bg-white p-4 rounded-xl flex flex-col justify-center items-center space-y-2">
            {makeNav("커스텀", "custom")}
            {makeNav("즐겨찾기", "bookmark")}
            {makeNav("작성글", "doc")}
            {makeNav("내정보", "info")}
          </div>
        </div>
      </div>

      <div className="ml-[15%] pr-[15%] h-[calc(100vh-90px)] flex justify-center items-start overflow-y-scroll">
        {/* <div className="mx-[15%] flex justify-center items-center"> */}
        <Outlet />
      </div>
    </>
  );
};

const makeNav = (name, link) => {
  const act = window.location.pathname.split("/")[2] === link;
  return (
    <Link
      to={`/mypage/${link}`}
      replace={window.location.pathname.includes("modify")}
      className={`w-full p-2 border-b-2 rounded ${
        act
          ? "text-pink-500 cursor-default"
          : "hover:bg-gray-300 hover:text-white transition duration-500"
      }`}
      onClick={(e) =>
        window.location.pathname.includes(link) && e.preventDefault()
      }
    >
      {name}
    </Link>
  );
};

export default MyPage;
