import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResourceSideberComponent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("문화");
  return (
    <div className="w-[170px] h-[200px] rounded-lg ml-[-19%] mt-[10%]">
      <div className="w-full bg-[#6F00FF] text-white text-2xl font-semibold rounded-t-md px-3 py-5">
        지역자원
      </div>
      <div className="rounded-b-md border">
        <ul>
          <li
            className={`p-2 cursor-pointer font-semibold ${
              activeTab === "문화"
                ? "text-[#6F00FF] bg-gray-100"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => {
              setActiveTab("문화");
              navigate(""); // 해당 경로로 이동
            }}
          >
            문화
          </li>
          <li
            className={`p-2 cursor-pointer font-semibold ${
              activeTab === "관광"
                ? "text-[#6F00FF] bg-gray-100"
                : "text-gray-700 bg-white"
            }`}
            onClick={() => {
              setActiveTab("관광");
              navigate(""); // 해당 경로로 이동
            }}
          >
            관광
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResourceSideberComponent;
