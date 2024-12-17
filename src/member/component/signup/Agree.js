import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaBackspace } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getCookie,
  setCookie,
  removeCookie,
} from "../../../etc/util/cookieUtil";
import useMemberTag from "../../hook/useMemberTag";
import Loading from "../../../etc/component/Loading";
import TermsList from "../../data/TermsList";

const Agree = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { makeBtn2 } = useMemberTag();
  const [loading, setLoading] = useState(false);

  const [termsList, setTermsList] = useState([]);
  const [agreeAll, setAgreeAll] = useState(false);
  const [modal, setModal] = useState({ title: "", content: null, open: false });

  useEffect(() => {
    setLoading(true);

    removeCookie("isAgree");
    if (!getCookie("isChoice")) {
      removeCookie("isChoice");
      navigate("/member/signup/choice", { replace: true });
    }

    const newTermsList = TermsList().map((term) => ({
      ...term,
      agree: false,
    }));

    setTermsList(newTermsList);

    setLoading(false);
  }, [TermsList]);

  const openModal = (title, content) => {
    setModal({ title: title, content: content, open: true });
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
  };

  return (
    <>
      {loading && <Loading />}
      <div className="w-[70%] h-[90%] px-10 py-4 border-2 border-gray-300 rounded shadow-xl text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full h-[20%] text-5xl flex justify-center items-center">
          약관동의
        </div>

        <div className="w-full h-[65%] flex flex-col justify-center items-center">
          <div className="w-full h-1/4 border-b-2 border-gray-300 text-3xl flex justify-center items-center cursor-pointer">
            {makeAgree("전체 동의", agreeAll, () => {
              setAgreeAll(!agreeAll);
              setTermsList((prev) =>
                prev.map((term) => ({ ...term, agree: !agreeAll }))
              );
            })}
          </div>

          <div className="w-full h-3/4 flex flex-col justify-center items-center space-y-4">
            {termsList.map((data, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center"
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
                {makeDetail(data.title, data.content, openModal)}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[15%] text-2xl flex flex-row-reverse justify-center items-center">
          {makeBtn2("다음", () => {
            if (
              termsList.every((term) => (term.required ? term.agree : true))
            ) {
              setCookie("isAgree", true);
              // removeCookie("isChoice");
              navigate(`/member/signup/input/${role}`);
            } else {
              toast.warn("필수항목에 모두 동의하세요.");
            }
          })}

          {/* <button
            className="bg-gray-500 w-1/6 mr-4 p-4 rounded-xl shadow-md text-white flex justify-center items-center hover:bg-gray-300 hover:text-black transition duration-500"
            onClick={() => {
              removeCookie("isChoice");
              navigate("/member/signup/choice", { replace: true });
            }}
          >
            <FaBackspace className="text-3xl" />
          </button> */}
        </div>
      </div>

      {modal.open && (
        <div className="bg-black bg-opacity-50 w-full h-full flex justify-center items-center fixed inset-0">
          <div className="bg-white w-[70%] max-w-[700px] p-4 rounded">
            <div className="text-3xl text-center font-bold">{modal.title}</div>
            {modal.content}
            <div className="flex justify-end items-center">
              <button
                className="p-2 text-base font-bold hover:text-gray-300 transition duration-500"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const makeAgree = (title, agree, setAgree, 필수) => {
  return (
    <div
      className="w-full h-full p-4 flex justify-start items-center space-x-4 cursor-pointer"
      onClick={setAgree}
    >
      <FaCheck
        className={`w-6 h-6 p-1 border border-gray-500 rounded text-white transition duration-500 
        ${agree ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
      />
      <div className="text-left">
        {title}
        {필수 === undefined ? "" : 필수 ? " (필수)" : " (선택)"}
      </div>
    </div>
  );
};

const makeDetail = (title, content, openModal) => {
  return (
    <button
      className="w-16 p-1 border border-gray-500 rounded hover:bg-[#DDDDDD] transition duration-500"
      onClick={() => openModal(title, content)}
    >
      보기
    </button>
  );
};

export default Agree;
