import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { policyDetail, policyRemove } from "../api/jobApi";
import { formatTextWithLineBreaks, formatUrl } from "../utils/formatUtil";
import { getCookie } from "../../../etc/util/cookieUtil";
import useCustomMove from "../hooks/useCustomMove";
import Swal from "sweetalert2";
import BookBtn from "../../../member/component/mypage/BookBtn";

const initState = {
  policyId: 0,
};

const PolicyReadPage = () => {
  const { policyId } = useParams(); // URL에서 policyId 가져오기
  const [policy, setPolicy] = useState(initState);
  const userRole = getCookie("userRole");

  useEffect(() => {
    policyDetail(policyId).then((data) => {
      setPolicy(data);
    });
  }, [policyId]);

  const { moveToPolicyList, moveToPolicyModify } = useCustomMove();

  const handleClickPolicyRemove = () => {
    // 상세페이지 내 삭제 버튼클릭시 호출
    Swal.fire({
      icon: "warning",
      title: "Delete",
      text: "삭제 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        policyRemove(policyId)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "삭제되었습니다.",
              showConfirmButton: false,
              timer: 1000,
            });
            moveToPolicyList();
          })
          .catch((error) => {
            console.error("Failed to delete policy:", error);
            Swal.fire({
              icon: "error",
              title: "삭제 실패했습니다.",
              text: error.message,
            });
          });
      } else {
        // 취소
        Swal.fire({
          icon: "info",
          title: "취소되었습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <>
      <div className="w-full bg-white p-8 rounded-md shadow-md border">
        {/* 정책명 */}
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-3">{policy.polyBizSjnm}</h2>
          <BookBtn main="청년" sub="일자리" targetId={policy.policyId} />
        </div>
        <p className="text-lg mb-6">{policy.polyItcnCn}</p>
        {/* 정책소개 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            정책 설명
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">지원내용</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.sporCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">사업신청기간</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.rqutPrdCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">지원 규모</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.sporScvl)}
                </td>
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
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.ageInfo)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">거주지 및 소득</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.prcpCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">학력</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.accrRqisCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">전공</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.majrRqisCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">취업상태</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.empmSttsCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">추가 세부 사항</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.aditRscn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참여제한대상</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.prcpLmttTrgtCn)}
                </td>
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
                <td className="font-semibold w-1/4 py-2">신청방법 및 절차</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.rqutProcCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">심사 및 발표</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.jdgnPresCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청 사이트</td>
                <td className="leading-6">{formatUrl(policy.rqutUrla)}</td>
              </tr>
              <tr>
                <td className="font-semibold w-1/4 py-2">제출서류</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.pstnPaprCn)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 추가 정보 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            추가 정보
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">주관기관</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.mngtMson)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">
                  주관기관 담당자 연락처
                </td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.cherCtpcCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">운영기관</td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.cnsgNmor)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">
                  운영기관 담당자 연락처
                </td>
                <td className="leading-6">
                  {formatTextWithLineBreaks(policy.tintCherCtpcCn)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참고 사이트1</td>
                <td className="leading-6">{formatUrl(policy.rfcSiteUrla1)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참고 사이트2</td>
                <td className="leading-6">{formatUrl(policy.rfcSiteUrla2)}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">첨부파일</td>
                <td className="leading-6">{formatUrl(policy.attachment)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 관리자용 수정버튼 */}
        {userRole === "ADMIN" && (
          <div className="w-full text-right">
            <button
              className="w-1/12 py-3 me-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
              onClick={() => {
                moveToPolicyModify(policyId);
              }}
            >
              수정
            </button>
            <button
              className="w-1/12 py-3 ms-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
              onClick={handleClickPolicyRemove}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {/* 이전 페이지 버튼 */}
      <div className="w-full text-center">
        <button
          className="px-10 py-3 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold my-10 transition-colors duration-500"
          onClick={() => {
            moveToPolicyList();
          }}
        >
          목록으로
        </button>
      </div>
    </>
  );
};

export default PolicyReadPage;
