import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { policyDetail } from "../api/houseApi";
import { formatTextWithLineBreaks, formatUrl } from "../utils/formatUtil";

const initState = {
  policyId: 0,
};

const PolicyReadPage = () => {
  const navigate = useNavigate();
  const { policyId } = useParams(); // URL에서 policyId 가져오기
  const [policy, setPolicy] = useState(initState);
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
                <td className="font-semibold w-1/4 py-2">정책 분야</td>
                <td>{policy.polyRlmCd === "023020" ? "주거분야" : ""}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">지원 내용</td>
                <td>{formatTextWithLineBreaks(policy.sporCn)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">사업 신청기간</td>
                <td>{formatTextWithLineBreaks(policy.rqutPrdCn)}</td>
                {/* <td>{policy.rqutPrdCn}</td> */}
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">지원 규모</td>
                <td>{formatTextWithLineBreaks(policy.sporScvl)}</td>
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
                <td>{formatTextWithLineBreaks(policy.ageInfo)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">거주 및 소득</td>
                <td>{formatTextWithLineBreaks(policy.prcpCn)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">학력</td>
                <td>{formatTextWithLineBreaks(policy.accrRqisCn)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">전공</td>
                <td>{formatTextWithLineBreaks(policy.ㅁㅁㅁㅁㅁ)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">취업상태</td>
                <td>{formatTextWithLineBreaks(policy.ㅁㅁㅁㅁㅁ)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">추가 세부 사항</td>
                <td>{formatTextWithLineBreaks(policy.aditRscn)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참여제한대상</td>
                <td>{formatTextWithLineBreaks(policy.prcpLmttTrgtCn)}</td>
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
                <td>{formatTextWithLineBreaks(policy.rqutProcCn)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청 및 발표</td>
                <td>{formatTextWithLineBreaks(policy.jdgnPresCn)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청접수</td>
                <td>{formatUrl(policy.rqutUrla)}</td>
              </tr>
              <tr>
                <td className="font-semibold w-1/4 py-2">제출서류</td>
                <td>{formatTextWithLineBreaks(policy.pstnPaprCn)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 기타 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            기타
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">주관기관명</td>
                <td>{formatTextWithLineBreaks(policy.mngtMson)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">운영기관명</td>
                <td>{formatTextWithLineBreaks(policy.cnsgNmor)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참고사이트1</td>
                <td>{formatUrl(policy.rfcSiteUrla1)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참고사이트2</td>
                <td>{formatUrl(policy.rfcSiteUrla2)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">첨부파일</td>
                <td>{formatTextWithLineBreaks(policy.etct)}</td>
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
