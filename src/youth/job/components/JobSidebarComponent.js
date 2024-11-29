import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobSidebarComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("일자리 정책현황");
  return (
    <div className="w-[170px] h-[200px] rounded-lg ml-[-19%] mt-[-36%]">
      <div className="w-full bg-[#6F00FF] text-white text-2xl font-semibold rounded-t-md px-3 py-5">
        일자리
      </div>
      <div className="rounded-b-md border">
        <ul>
          <li
            className={`p-2 cursor-pointer font-semibold ${
              activeTab === "일자리 정책현황"
                ? "text-[#6F00FF] bg-gray-100"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => {
              setActiveTab("일자리 정책현황");
              navigate(""); // 해당 경로로 이동
            }}
          >
            일자리 정책현황
          </li>
          <li
            className={`p-2 cursor-pointer font-semibold ${
              activeTab === "일자리 정보"
                ? "text-[#6F00FF] bg-gray-100"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => {
              setActiveTab("일자리 정보");
              navigate("infoList"); // 해당 경로로 이동
            }}
          >
            일자리 정보
          </li>
        </ul>
      </div>
    </div>
  );
};

export default JobSidebarComponent;
