import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaLock } from "react-icons/fa";
import { getOne } from "../api/communityAPI";
import { getCookie } from "../../etc/util/cookieUtil";
import useCustomTag from "../hook/useCustomeTag";
import Loading from "../../etc/component/Loading";

const initState = {
  id: 0,
  boadrType: "",
  category: "",
  title: "",
  content: "",
  author: "",
  authorId: "",
  visibility: false,
  createdAt: "--T::",
  updatedAt: "--T::",
};

const Read = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { makeBtn } = useCustomTag();

  const [dto, setDto] = useState(initState);

  useEffect(() => {
    setLoading(true);

    getOne(id)
      .then((data) => {
        setDto(data);
      })
      .catch((error) => {
        console.error("데이터를 불러오지 못했습니다. : ", error);
      });

    setLoading(false);
  }, [id]);

  const printTime = (dateTime) => {
    const year = dateTime.split("T")[0].split("-")[0];
    const month = dateTime.split("T")[0].split("-")[1];
    const date = dateTime.split("T")[0].split("-")[2];

    const hour = dateTime.split("T")[1].split(":")[0];
    const min = dateTime.split("T")[1].split(":")[1];
    const sec = Math.floor(dateTime.split("T")[1].split(":")[2], 0);

    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
  };

  return (
    <>
      {loading && <Loading />}
      <div className="bg-gray-100 w-full m-4 p-4 text-base text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <div className="w-full px-4 text-sm flex justify-between items-center space-x-2">
            <div>
              작성자 : {dto.author} ({dto.authorId}) 작성일 :{" "}
              {printTime(dto.createdAt)}
              {dto.createdAt === dto.updatedAt
                ? ""
                : ` (수정일 : ${printTime(dto.updatedAt)})`}
            </div>
            {makeBtn("뒤로", "orange", () => navigate(-1))}
          </div>

          <div className="bg-white w-full p-4 border rounded text-2xl text-left flex justify-between items-center">
            <div className="flex justify-center items-center space-x-2">
              <div>{dto.visibility && <FaLock />}</div>
              <div>{dto.title}</div>
            </div>
            {dto.authorId === getCookie("userId") && (
              <div className="flex justify-center items-center space-x-4">
                {makeBtn("수정", "green", () => {})}
                {makeBtn("삭제", "red", () => {})}
              </div>
            )}
          </div>

          <div
            className="bg-white w-full p-4 border rounded text-left font-normal"
            dangerouslySetInnerHTML={{
              __html: dto.content.replace(/\n/g, "<br/>"),
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Read;
