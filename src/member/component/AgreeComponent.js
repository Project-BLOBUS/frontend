import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../util/cookieUtil";

const AgreeComponent = () => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(<></>);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setAgreeAll(agree1 && agree2 && agree3);
  }, [agreeAll, agree1, agree2, agree3]);

  const openModal = (title, content) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-4">
      <div className="bg-white w-full my-4 text-3xl text-sky-500">
        {getCookie("isGeneral") ? "일반계정" : "기업계정"} 약관동의
      </div>

      <div
        className="group w-full p-4 border border-gray-500 rounded text-3xl flex justify-center items-center cursor-pointer hover:scale-110 transition duration-500"
        onClick={() => {
          if (!agreeAll) {
            setAgreeAll(!agreeAll);
            setAgree1(true);
            setAgree2(true);
            setAgree3(true);
          } else {
            setAgreeAll(false);
            setAgree1(false);
            setAgree2(false);
            setAgree3(false);
          }
        }}
      >
        <div>전체 동의</div>
        <FaCheck
          className={`ml-5 p-2 rounded-3xl text-3xl flex group-hover:text-white transition duration-500 ${
            !agreeAll
              ? "bg-white border border-gray-500 group-hover:bg-blue-500 group-hover:border-none"
              : "bg-blue-500 text-white group-hover:bg-black group-hover:text-red-500"
          }`}
        />
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {makeAgree(
          "BLOBUS 이용약관",
          content1,
          agree1,
          setAgree1,
          true,
          openModal
        )}
        {makeAgree(
          "개인정보 수집 및 이용 동의",
          "",
          agree2,
          setAgree2,
          true,
          openModal
        )}
        {makeAgree(
          "개인정보 수집 및 이용 동의",
          "",
          agree3,
          setAgree3,
          false,
          openModal
        )}
      </div>

      <div className="w-full m-4 text-2xl flex space-x-4">
        <button
          className="bg-gray-500 w-1/6 p-4 rounded-xl text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
          onClick={() => {
            if (window.history.length > 2) {
              navigate(-1);
            } else {
              navigate("/member/signup");
            }
          }}
        >
          <FaBackspace className="text-3xl" />
        </button>

        <button
          className="bg-sky-500 w-5/6 p-4 rounded-xl text-white hover:bg-sky-300 hover:text-black transition duration-500"
          onClick={() => {
            if (agree1 && agree2) {
              getCookie("isGeneral")
                ? navigate("/member/signup/general")
                : navigate("/member/signup/business");
            } else {
              toast.warn("필수항목에 모두 동의해 주세요.");
            }
          }}
        >
          다음
        </button>
      </div>

      {isModalOpen && (
        <div className="bg-black bg-opacity-50 w-full h-full flex justify-center items-center fixed inset-0">
          <div className="bg-white w-5/6 max-w-[650px] p-4 rounded">
            <div className="text-2xl">{modalTitle}</div>
            {modalContent}
            <div className="flex justify-end items-center">
              <button
                className="bg-red-500 px-4 py-2 text-base rounded-xl text-white hover:bg-red-300 hover:text-black transition duration-500"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const makeAgree = (title, content, agree, setAgree, 필수, openModal) => {
  return (
    <div className="group w-full p-4 border border-gray-500 rounded text-base flex justify-start items-center hover:scale-105 transition duration-500">
      <FaCheck
        className={`w-[5%] mr-5 p-2 rounded-3xl text-3xl cursor-pointer group-hover:text-white transition duration-500 ${
          !agree
            ? "bg-white border border-gray-500 group-hover:bg-blue-500 group-hover:border-none"
            : "bg-blue-500 text-white group-hover:bg-black group-hover:text-red-500"
        }`}
        onClick={() => setAgree(!agree)}
      />

      <div
        className="w-[85%] text-left cursor-pointer"
        onClick={() => setAgree(!agree)}
      >
        {title}
        {필수 ? (
          <span className="ml-2 text-red-500">(필수)</span>
        ) : (
          <span className="ml-2 text-blue-500">(선택)</span>
        )}
      </div>

      <button
        className="w-[10%] p-1 border border-gray-500 rounded hover:bg-sky-500 hover:border-none hover:text-white transition duration-500"
        onClick={() => openModal(title, content)}
      >
        보기
      </button>
    </div>
  );
};

const content1 = () => {
  return (
    <div className="h-60 my-4 p-4 border border-gray-300 rounded text-xs text-gray-700 leading-4 flex flex-col justify-start items-start space-y-4 overflow-y-scroll">
      <div>제 1조 (목적)</div>
      <div className="ml-2 flex flex-col justify-center items-start space-y-2">
        <span>
          본 약관은 BLOBUS 서비스(이하 "서비스"라 합니다)의 이용 조건 및 절차,
        </span>
        <span>기타 필요한 사항을 규정하는 것을 목적으로 합니다.</span>
      </div>

      <div>제 2조 (정의)</div>
      <div className="ml-2 flex flex-col justify-center items-start space-y-2">
        <span>
          1. "회원"이란 서비스를 제공받기 위해 가입한 자를 의미합니다.
        </span>
        <span>
          2. "운영자"란 서비스를 관리 및 운영하는 책임자를 의미합니다.
        </span>
      </div>

      <div>제 3조 (서비스의 제공)</div>
      <div className="ml-2 flex flex-col justify-center items-start space-y-2">
        <span>회사는 본 약관에 따라 회원에게 서비스를 제공합니다.</span>
        <span>서비스의 구체적인 내용은 회사가 별도로 정합니다.</span>
      </div>
    </div>
  );
};

export default AgreeComponent;
