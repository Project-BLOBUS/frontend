import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../util/cookieUtil";
import Header from "../../main/Header";
import Loading from "../etc/Loading";

const MemberPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useState(getCookie("jwt"));

  useEffect(() => {
    setLoading(true);

    const interval = setInterval(() => {
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
        <>
          <div className="bg-sky-500">
            <Header
              isWhite={true}
              pageTitle="계정"
              titleBg="#0369A1"
              borderB={false}
            />
          </div>
          <div className="flex justify-center items-center">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default MemberPage;
