import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../util/cookieUtil";
import Header from "../../main/Header";
import Loading from "../etc/Loading";

const MemberPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCookie("jwt") && navigate(-1, { replace: true });

    setLoading(false);
  }, [getCookie("jwt")]);

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
