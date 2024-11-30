import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCustomMove from "../hooks/useCustomMove";
import { policyDetail } from "../api/houseApi";

const initState = {
  policyId: 0,
};

const PolicyReadPage = () => {
  const navigate = useNavigate();
  const { policyId } = useParams(); // URL에서 policyId 가져오기
  const [policy, setPolicy] = useState(initState);
  const { moveToPolicyList } = useCustomMove();

  useEffect(() => {
    policyDetail(policyId).then((data) => {
      console.log(data);
      setPolicy(data);
    });
  }, [policyId]);

  return (
    <>
      <div className="w-full bg-white p-8 rounded-md shadow-md border">
        {/* 정책 제목 */}
        <h2 className="text-3xl font-bold mb-3">{policy.polyBizSjnm}</h2>
        <p className="text-lg mb-6">{policy.polyItcnCn}</p>

        {/* 정책 설명 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            정책 설명
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">정책 번호</td>
                <td>{policy.bizId}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">정책 분야</td>
                <td>
                  {policy.polyRlmCd === "023010" ? "일자리분야" : "확인불가"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">지원 내용</td>
                <td>{policy.sporCn}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">사업 신청기간</td>
                <td>{policy.rqutPrdCn}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">지원 규모</td>
                <td>{policy.sporScvl}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">운영기관명</td>
                <td>{policy.cnsgNmor}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 지원 대상 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            지원 대상
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">연령</td>
                <td>{policy.ageInfo}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">거주 및 소득</td>
                <td>{policy.prcpCn}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">학력</td>
                <td>{policy.accrRqisCn}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">추가 세부 사항</td>
                <td>{policy.aditRscn}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">참여제한대상</td>
                <td>{policy.prcpLmttTrgtCn}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 신청 방법 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            신청 방법
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청 절차</td>
                <td>{policy.rqutProcCn}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청 접수</td>
                <td>
                  {policy.rqutUrla}, {policy.rfcSiteUrla1},{" "}
                  {policy.rfcSiteUrla2}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">신청 및 발표</td>
                <td>{policy.jdgnPresCn}</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">제출 서류</td>
                <td>{policy.pstnPaprCn}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* 이전 페이지 버튼 */}
      <div className="w-full text-center">
        <button
          className="px-10 py-3 border rounded-sm bg-gray-50 hover:bg-gray-100 my-10 transition-colors duration-500"
          onClick={() => {
            navigate(-1);
          }}
        >
          이전 페이지
        </button>
      </div>
    </>
  );
};

export default PolicyReadPage;
