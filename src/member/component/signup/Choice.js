import { useNavigate } from "react-router-dom";
import { setCookie } from "../../util/cookieUtil";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-4">
      <div className="w-full my-4 text-5xl text-sky-500">가입계정 선택</div>

      <div className="w-full flex justify-between items-center space-x-4">
        {makeChoice("일반계정", "general", navigate)}
        {makeChoice("기업계정", "business", navigate)}
      </div>

      <div className="w-full pt-2">
        <button
          className="bg-gray-500 w-full p-4 rounded-2xl shadow-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
          onClick={() =>
            navigate(window.history.length > 1 ? -1 : "/", {
              replace: true,
            })
          }
        >
          취소
        </button>
      </div>
    </div>
  );
};

const makeChoice = (name, role, navigate) => {
  return (
    <div
      className="bg-sky-400 w-1/2 px-4 py-20 rounded-2xl shadow-xl text-white cursor-pointer hover:bg-sky-200 hover:text-black hover:scale-125 transition duration-500"
      onClick={() => {
        setCookie("isChoice", true);
        navigate(`/member/signup/agree/${role}`, { replace: true });
      }}
    >
      {name}
    </div>
  );
};

export default Login;
