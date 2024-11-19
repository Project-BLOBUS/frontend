import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCookie } from "../util/cookieUtil";
import TermsList from "../etc/TermsList";

const AgreeComponent = () => {
  const navigate = useNavigate();

  const [termsList, setTermsList] = useState([]);
  const [agreeAll, setAgreeAll] = useState(false);
  const [modal, setModal] = useState({ title: "", content: null, open: false });

  useEffect(() => {
    const newTermsList = TermsList().map((term) => ({
      ...term,
      agree: false,
    }));
    setTermsList(newTermsList);
  }, []);

  const openModal = (title, content) => {
    setModal({ title: title, content: content, open: true });
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
  };

  return (
    <div className="w-full h-fit max-w-[600px] min-w-min text-xl text-center font-bold flex flex-col justify-center items-center space-y-4">
      <div className="bg-white w-full my-4 text-3xl text-sky-500">
        {getCookie("isGeneral") ? "일반계정" : "기업계정"} 약관동의
      </div>

      <div className="w-full border border-gray-500 rounded text-4xl flex justify-center items-cente cursor-pointer">
        {makeAgree("전체 동의", agreeAll, () => {
          setAgreeAll(!agreeAll);
          setTermsList((prev) =>
            prev.map((term) => ({ ...term, agree: !agreeAll }))
          );
        })}
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {termsList.map((data, index) => (
          <div
            key={index}
            className="w-full border border-gray-500 rounded flex justify-start items-center"
          >
            {makeAgree(
              data.title,
              data.agree,
              () => {
                setTermsList((prev) => {
                  const newTermsList = prev.map((term) =>
                    data.title === term.title
                      ? { ...term, agree: !term.agree }
                      : term
                  );

                  setAgreeAll(newTermsList.every((term) => term.agree));

                  return newTermsList;
                });
              },
              data.required
            )}
            {makeBtn(data.title, data.content, openModal)}
          </div>
        ))}
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
            if (
              termsList.every((term) => (term.required ? term.agree : true))
            ) {
              getCookie("isGeneral")
                ? navigate("/member/signup/general")
                : navigate("/member/signup/business");
            } else {
              toast.warn("필수항목에 모두 동의하세요.");
            }
          }}
        >
          다음
        </button>
      </div>

      {modal.open && (
        <div className="bg-black bg-opacity-50 w-full h-full flex justify-center items-center fixed inset-0">
          <div className="bg-white w-5/6 max-w-[650px] p-4 rounded">
            <div className="text-2xl">{modal.title}</div>
            {modal.content}
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

const makeAgree = (title, agree, setAgree, 필수) => {
  return (
    <div
      className={`group h-full flex items-center space-x-4 cursor-pointer ${
        필수 === undefined
          ? "w-full p-4 justify-center"
          : "w-[90%] py-4 pl-4 justify-start"
      }`}
      onClick={setAgree}
    >
      <FaCheck
        className={`p-2 border rounded-3xl group-hover:scale-125 transition duration-500 ${
          필수 === undefined ? "w-12 h-12" : "w-8 h-8"
        }
        ${
          agree
            ? "bg-blue-500 border-blue-500 text-white group-hover:bg-gray-500 group-hover:border-gray-500 group-hover:text"
            : "border-gray-500 text-gray-500 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white"
        }`}
      />
      {필수 === undefined ? (
        <div>{title}</div>
      ) : (
        <div className="w-full text-left cursor-pointer">
          {title}
          {필수 ? (
            <span className="ml-2 text-red-500">(필수)</span>
          ) : (
            <span className="ml-2 text-blue-500">(선택)</span>
          )}
        </div>
      )}
    </div>
  );
};

const makeBtn = (title, content, openModal) => {
  return (
    <button
      className="w-[10%] mr-4 p-1 border border-gray-500 rounded text-base hover:bg-sky-500 hover:border-sky-500 hover:text-white transition duration-500"
      onClick={() => openModal(title, content)}
    >
      보기
    </button>
  );
};

export default AgreeComponent;
