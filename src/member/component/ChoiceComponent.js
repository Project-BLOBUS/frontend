import { useNavigate } from "react-router-dom";
import { setCookie } from "../util/cookieUtil";

const ChoiceComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-fit max-w-[600px] min-w-min text-2xl text-center font-bold flex flex-col justify-center items-center space-y-4">
      <div className="w-full my-4 text-3xl text-sky-500">가입계정 선택</div>

      <div className="w-full flex justify-between items-center space-x-4">
        {makeChoice("일반계정", true, navigate)}
        {makeChoice("기업계정", false, navigate)}
      </div>

      <button
        className="bg-gray-500 w-full p-4 rounded-2xl shadow-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
        onClick={() => {
          if (window.history.length > 2) {
            navigate(-1);
          } else {
            navigate("/");
          }
        }}
      >
        취소
      </button>
    </div>
  );
};

const makeChoice = (name, isGeneral, navigate) => {
  return (
    <div
      className="bg-sky-400 w-1/2 px-4 py-20 rounded-2xl shadow-xl text-white cursor-pointer hover:bg-sky-200 hover:text-black hover:scale-125 transition duration-500"
      onClick={() => {
        setCookie("isGeneral", isGeneral);
        navigate("/member/signup/agree");
      }}
    >
      {name}
    </div>
  );
};

export default ChoiceComponent;
