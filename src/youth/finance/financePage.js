import React, { useEffect, useState } from "react";
import { fetchAllPolicies } from "./FinanceApi";

// import Header from "../main/Header"; // Header를 대문자로 수정

const FinancePage = () => {
  // 상태 관리와 데이터 로딩 로직
  const [policies, setPolicies] = useState([]); // 정책 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태

  useEffect(() => {
    const getPolicies = async () => {
      try {
        const data = await fetchAllPolicies(); // API 호출
        setPolicies(data); // 데이터 상태 업데이트
      } catch (err) {
        setError("Failed to load policies."); // 에러 처리
      } finally {
        setLoading(false);  // 로딩 상태 업데이트
      }
    };

    getPolicies();  // 데이터 가져오기 실행
  }, []);

  // 로딩 중일 때와 에러 발생 시 메시지 표시
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
        <div className="border-2 border-blue-400">
        {/* 들어가야하는 첫번째 div */}
          {/* 내용 필터 버튼 */}
          <div className="flex gap-2">
              <button className="bg-blue-300 text-white px-4 py-2 rounded">전체</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">제목</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">내용</button>
          </div>
          {/* 지역 필터 버튼 */}
          <div className="flex gap-2">
              <button className="bg-blue-300 text-white px-4 py-2 rounded">부산진구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">해운대구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">서구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">동구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">중구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">북구</button>
              <button className="bg-blue-300 text-white px-4 py-2 rounded">etc..</button>
          </div>
        </div>

        {/* 들어가야하는 두번째 div */}
        <div className="border-2 border-blue-400 h-[100px] flex items-center justify-center px-4">
            {/* 검색창과 검색 버튼 */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="검색어 입력창"
                className="border border-gray-300 px-4 py-2 rounded w-[800px]"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">검색 버튼</button>
            </div>
          </div>

        <div className="border-2 border-blue-400 h-[68%] mt-[2%]">
          {/* TODO : DB에 더미 데이터 만들어서 꺼내올 수 있게 만들어보기.
          TODO 순서
          1. 백엔드 구축하고 더미 데이터 만들어보기
          2. API 만들기
          3. 백엔드랑 연결해서 데이터 들고 오기
          들어가야하는 세번째 div */}
          <ul>
            {policies.map((policy) => (
              <li key={policy.policyId} className="mb-4">
                <h2 className="font-bold text-lg">{policy.title}</h2>
                <p>{policy.overview}</p>
                <p>
                  Application Period: {policy.applicationPeriodStart} to {policy.applicationPeriodEnd}
                </p>
              </li>
            ))}
          </ul>
        </div>

      <div className="w-[200px] h-[20px] bg-red-300 ml-[40%] mt-[5px]">
        TODO : 페이징 적용
        들어가야하는 페이징 5번째
      </div>

      {/* 사이드바 숨김 */}
      <div className="invisible w-[170px] h-[200px] bg-gray-400 rounded-lg ml-[2%] mt-[-31%]">
        내꺼는 사이드바 없음
        들어가야하는 네번째 div
      </div>
    </div>

  );
};

export default FinancePage;