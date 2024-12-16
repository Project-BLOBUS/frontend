import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie, removeCookie } from "../../../etc/util/cookieUtil";
import Loading from "../../../etc/component/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    removeCookie("isChoice");

    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="w-[70%] h-[90%] px-10 py-4 border-2 border-gray-300 rounded shadow-xl text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full h-[20%] text-4xl flex justify-center items-center">
          가입계정 선택
        </div>

        <div className="w-full h-[10%] text-sm flex flex-col justify-center items-center">
          <div className="w-full h-1/2">BLOBUS에 오신걸 환영합니다.</div>
          <div className="w-full h-1/2">
            가입 할 계정의 종류를 선택해주세요.
          </div>
        </div>

        <div className="w-full h-[70%] flex justify-between items-center space-x-8">
          {makeChoice("일반계정", "general", navigate)}
          {makeChoice("기업계정", "business", navigate)}
        </div>

        {/* <div className="w-full pt-2">
        <button
          className="bg-gray-500 w-full p-4 rounded-xl shadow-md text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
          onClick={() =>
            navigate(window.history.length > 1 ? -1 : "/", {
              replace: true,
            })
          }
        >
          취소
        </button>
      </div> */}
      </div>
    </>
  );
};

const makeChoice = (name, role, navigate) => {
  return (
    <div
      className="w-1/2 px-4 py-20 border-2 border-gray-300 rounded text-4xl cursor-pointer hover:shadow-xl transition duration-500"
      onClick={() => {
        setCookie("isChoice", true);
        navigate(`/member/signup/agree/${role}`);
      }}
    >
      {name}
    </div>
  );
};

export default Login;
