import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../etc/util/cookieUtil";
import Loading from "../../etc/component/Loading";
import Header from "../../main/Header";
import Footer from "../../main/Footer";

const MemberPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useState(getCookie("jwt"));

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      if (!window.location.pathname.includes("signup")) {
        removeCookie("isChoice");
        removeCookie("isAgree");
      }

      if (!window.location.pathname.includes("find")) {
        removeCookie("foundId");
      }

      const newJwt = getCookie("jwt");
      if (newJwt) {
        navigate(-1, { replace: true });
      } else {
        setJwt(newJwt);
      }
    }, 10);

    setLoading(false);
    return () => clearInterval(interval);
  }, [jwt]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-orange-50 h-screen">
          <div className="bg-pink-500">
            <Header
              isWhite={true}
              pageTitle="메인"
              titleBg="#BE185D"
              borderB={false}
            />
          </div>

          <div className="bg-white mx-[10%] flex justify-center items-center">
            <Outlet />
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default MemberPage;
