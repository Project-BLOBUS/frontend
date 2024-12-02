import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../../main/Header";
import Loading from "../../etc/component/Loading";

const Community = () => {
  const [loading, setLoading] = useState(false);

  const navList = [
    { name: "청년관", link: "../youth" },
    { name: "기업관", link: "../enterprise" },
    { name: "지역관", link: "../resource" },
    { name: "커뮤니티", link: "../community" },
  ];

  return (
    <>
      {loading && <Loading />}
      <div className="bg-[#DB0153]">
        <Header
          navs={navList}
          isWhite={true}
          pageTitle="커뮤니티"
          titleBg="#A1003C"
          borderB={false}
        />
      </div>

      <div className="mx-[15%] flex justify-center items-center">
        <Outlet />
      </div>
    </>
  );
};

export default Community;
