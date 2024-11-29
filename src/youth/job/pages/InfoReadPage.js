import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoReadPage = () => {
  const navigate = useNavigate();
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState("채용정보");

  return (
    <>
      <div className="pb-8">
        {/* 메인 컨텐츠 영역 */}
        <div className="border shadow-md rounded-sm">
          {/* 탭 메뉴 */}
          <div className="flex">
            <button
              className={`w-1/2 py-4 font-semibold ${
                activeTab === "채용정보"
                  ? "text-[#6F00FF] border-t-2 border-[#6F00FF]"
                  : "text-gray-500 border-r bg-gray-50"
              }`}
              onClick={() => setActiveTab("채용정보")}
            >
              채용정보
            </button>
            <button
              className={`w-1/2 py-4 font-semibold ${
                activeTab === "기업정보"
                  ? "text-[#6F00FF] border-t-2 border-[#6F00FF]"
                  : "text-gray-500 border-l bg-gray-50"
              }`}
              onClick={() => setActiveTab("기업정보")}
            >
              기업정보
            </button>
          </div>

          {/* 탭 내용 */}
          {activeTab === "채용정보" && (
            <div className="p-6 pt-14">
              <div className="flex justify-between">
                <div>
                  <div className="text-lg mb-2">(주)우리기연</div>
                  {/* 제목 */}
                  <h1 className="text-3xl font-bold mb-4">
                    (주)우리기업 시스템사업부(서울) 영업부 경력직 채용
                  </h1>
                </div>
                {/* 입사지원 버튼 */}
                <div className="">
                  <button className="px-10 py-4 bg-[#6F00FF] text-white font-semibold rounded-sm hover:bg-[#420099] transition-colors duration-500">
                    입사지원
                  </button>
                </div>
              </div>

              {/* 정보 표 */}
              <div className="grid grid-cols-2 mb-6">
                <div className="flex items-center border-t-2 py-1 me-2">
                  <p className="w-32 px-2 text-gray-500">고용형태</p>
                  <p>정규직</p>
                </div>
                <div className="flex items-center border-t-2 py-1">
                  <p className="w-32 px-2 text-gray-500">경력</p>
                  <p>경력(연차무관)</p>
                </div>
                <div className="flex items-center border-t py-1 me-2">
                  <p className="w-32 px-2 text-gray-500">근무지역</p>
                  <p>서울 &gt; 서초구</p>
                </div>
                <div className="flex items-center border-t py-1">
                  <p className="w-32 px-2 text-gray-500">학력</p>
                  <p>초대졸이상</p>
                </div>
                <div className="flex items-center border-t border-b-2 py-1 me-2">
                  <p className="w-32 px-2 text-gray-500">급여조건</p>
                  <p>협의</p>
                </div>
                <div className="flex items-center border-t border-b-2 py-1">
                  <p className="w-32 px-2 text-gray-500">근무시간</p>
                  <p>09:00 ~ 18:00</p>
                </div>
              </div>

              {/* 크롤링 내용 */}
              <div className="border border-gray-300 rounded-sm p-4 text-gray-500 h-64">
                크롤링된 내용이 들어가는 영역입니다.
              </div>

              <div className="mt-6 text-center">
                <button className="px-10 py-4 bg-[#6F00FF] text-white font-semibold rounded-sm hover:bg-[#420099] transition-colors duration-500">
                  입사지원
                </button>
              </div>
            </div>
          )}

          {activeTab === "기업정보" && (
            <div className="p-6 pt-14">
              {/* 기업정보 탭 내용 */}
              <h2 className="text-xl font-bold mb-4">기업정보</h2>
              <p className="text-gray-700">
                여기에 기업 관련 정보가 표시됩니다. 데이터를 기반으로 내용을
                채워주세요.
              </p>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-6 text-center">
          <button
            className="px-7 py-4 border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-100 transition-colors duration-500"
            onClick={() => {
              navigate(-1);
            }}
          >
            이전 페이지
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoReadPage;
