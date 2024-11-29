import React from "react";
import { useNavigate } from "react-router-dom";

const PolicyReadPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full bg-white p-8 rounded-md shadow-md border">
        {/* 정책 제목 */}
        <h2 className="text-3xl font-bold mb-6">청년고용촉진지원</h2>

        {/* 정책 설명 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            정책 설명
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">정책 번호</td>
                <td>R202402260087</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">정책 분야</td>
                <td>일자리분야</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">지원 내용</td>
                <td>
                  미취업청년 시급 9,860원, 주 5일(일 8시간, 09:00 ~ 18:00)
                  고용촉진지원금, 자격증 취득지원
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">사업 신청기간</td>
                <td>2024년 02월 27일 ~ 2024년 03월 06일</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">지원 규모</td>
                <td>145명</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">비고</td>
                <td>24.02.27 10:00 ~ 03.06 18:00</td>
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
                <td>만 19세 ~ 29세</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">거주 및 소득</td>
                <td>부산광역시에 거주하는 만 29세 이하</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">학력</td>
                <td>제한 없음</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">추가 세부 사항</td>
                <td>시청, 공공기관 등에서 제공</td>
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
                <td>부산정보복지 신청 승인</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청 접수</td>
                <td>
                  부산정보복지포털 접수 :{" "}
                  <a href="#" className="text-blue-500 underline">
                    busanjob.net
                  </a>
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold py-2">신청 및 발표</td>
                <td>3.13 발표</td>
              </tr>
              <tr>
                <td className="font-semibold py-2">제출 서류</td>
                <td>신청서, 등본 등</td>
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
