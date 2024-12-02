import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaLock } from "react-icons/fa";
import { getCookie } from "../../etc/util/cookieUtil";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../../etc/component/Loading";

const initState = {
  boadrType: "",
  category: "",
  title: "",
  content: "",
  author: getCookie("name"),
  authorId: getCookie("userId"),
  visibility: false,
};

const Add = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dto, setDto] = useState(initState);
  const { id } = useParams();
  const { makeBtn } = useCustomTag();

  useEffect(() => {
    setLoading(true);

    setLoading(false);
  }, [id]);

  console.log(dto);
  return (
    <>
      {loading && <Loading />}
      <div className="bg-gray-100 w-full m-4 p-4 text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <div className="w-full pr-4 text-sm flex justify-between items-center">
            <div className="w-full flex justify-start items-center space-x-4">
              <div className="bg-white p-2 border rounded">
                게시판 종류 선택
              </div>
              <div className="bg-white p-2 border rounded">말머리 선택</div>
            </div>
            <div className="flex justify-center items-center space-x-4">
              {makeBtn("뒤로", "orange", () => navigate(-1))}
              {makeBtn("완료", "blue", () => {})}
            </div>
          </div>

          <div className="bg-white w-full p-4 border rounded text-2xl text-left flex justify-between items-center">
            <div className="w-full flex justify-center items-center space-x-2">
              <div className="p-3 border border-black rounded">
                <FaLock />
              </div>
              <input
                className="w-full p-2 border border-black rounded"
                type="text"
                name="title"
                value={dto.title}
                maxLength={30}
                onChange={(e) =>
                  setDto({ ...dto, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bg-white w-full p-4 border rounded text-left font-normal">
            내용입력
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
