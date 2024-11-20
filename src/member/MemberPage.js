import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "./util/cookieUtil";
import Header from "../main/Header";
import Loading from "./etc/Loading";

const MemberPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO 현재 저장된 쿠키 정보 따라서 페이지 이동 (로그인 상태로는 접속불가)
    if (getCookie("jwt")) {
      setLoading(false);
      navigate(-1);
    } else {
      setLoading(false);
    }
  }, []);

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
