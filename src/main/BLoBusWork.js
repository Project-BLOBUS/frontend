import React from "react";
import Header from "./Header";
import { NavLink,Link } from 'react-router-dom';
import { FaArrowDown,FaArrowRight,FaArrowUp,FaArrowLeft   } from "react-icons/fa";

function BLoBusWork() {
    return(
        <div>
             <div className="bg-[linear-gradient(15deg,_#0130BC,_#DB0153)]">
            <Header 
            pageTitle="기능" 
            titleBg="#C40052" 
            isWhite={true} 
            borderB={false} 
            />
            </div>
             {/* 레이아웃 */}
      <div className="w-[70%] h-[600px] ml-[15%] mt-[1%]">
        <div className="border-b-4 h-[100px] pt-[3%] text-2xl font-bold hidden sm:block">
          BLoBus 기능
        </div>

        <div className="h-[85%] w-[400px] sm:w-full flex flex-wrap pl-[9%] sm:ml-[0%] ml-[-28%] mt-2 space-x-13 sm:space-x-6">
            <p className=" border-2 border-[#1a247d] w-[280px] sm:w-[400px] ml-[52px] sm:ml-[24px] h-[180px] sm:h-[240px] rounded-[25px] pl-[14%] sm:mt-0 mt-4">
               <p className="border-b-2 border-[#1a247d] ml-[-23%] sm:ml-[-53%] pl-[40%] sm:pl-[58%] font-bold text-xl">정보 통합</p>
                <div className="h-[85%] p-2 sm:p-4 ml-[-20%] sm:ml-[-53%] pt-4 sm:pt-4 text-md sm:text-lg">일자리,주거,교육,금융,문화생활 등 청년들에게 필요한 정보를 카테고리화 하여 제공함으로써 사용자들이 쉽게 원하는 정보를 탐색 할 수 있음</div>
            </p>

            <p className=" border-2 border-[#800080] w-[280px] sm:w-[400px] ml-[52px] sm:ml-[24px] h-[250px] sm:h-[240px] rounded-[25px] pl-[11%]  sm:mt-[0%] mt-[7%]">
                <p className="border-b-2 border-[#800080] ml-[-17%] sm:ml-[-37.5%] pl-[27%] sm:pl-[40%] font-bold text-xl">커뮤니티 활성화</p>
                <div className="h-[85%] p-5 sm:p-4 ml-[-20%] sm:ml-[-36%] pt-4 text-md sm:text-lg">청년들이 정책 활용 후기나 질문, 제안을 공유할 수 있는 공간 제공,플랫폼 내 이벤트를 통해 적극적으로 참여를 유도하고 커뮤니티 참여률 장려,SNS 등 활용하여 커뮤니티 홍보하고 지역 내 청년들에게 플랫폼의 가치를 알리기 위한 마케팅 캠페인 진행</div>
            </p>

            <p className=" border-2 border-[#D1006B] w-[280px] sm:w-[400px] ml-[52px] mt-6 h-[280px] sm:h-[240px] rounded-[25px] pl-[10%] ">
               <p className="border-b-2 border-[#D1006B] ml-[-16%] sm:ml-[-33%] pl-[25%] sm:pl-[40%] font-bold text-xl">맞춤형 정보 제공</p>
               <div className="h-[85%] p-5 sm:p-4 ml-[-18%] sm:ml-[-33%] pt-4 sm:pt-4 text-lg">사용자가 관심있는 정보를 설정하거나, 사용 이력을 기반으로 AI 추천 시스템이 개인화된 정보를 제공, 특정 지역의 주거 지원 정보를 자주 검색하는 사용자는 해당 지역의 새로운 정책이 업데이트될 경우 자동으로 추천받을 수 있음</div>
            </p>

            <p className=" border-2 border-[#DC143C] w-[280px] sm:w-[400px] ml-[52px] mt-6 h-[250px] sm:h-[240px] rounded-[25px] pl-[9%]  ">
              <p className="border-b-2 border-[#DC143C] ml-[-14%] sm:ml-[-29%] pl-[21%] sm:pl-[35%] font-bold text-xl">정책 업데이트 알림</p>
              <div className="h-[85%] p-5 sm:p-6 ml-[-18%] sm:ml-[-33%] pt-4 sm:pt-3 text-lg">사용자는 마이페이지에서 자신의 프로필 정보를 기반으로 거주 지역(부산 한정), 관심 분야(일자리,주거,교육 등)에 맞는 최신 정책과 프로그램 알림을 받을 수 있음 정책 마감일이나 신청 기간에 대한 알림도 포함</div>
            </p>

            <div className="absolute h-[25px] text-3xl mt-[15.5%] pl-[12%] text-[#1a247d] hidden sm:block"><FaArrowDown/></div>
            <div className="absolute h-[25px] text-3xl mt-[25%] pl-[25.9%] text-[#800080] hidden sm:block"><FaArrowRight/></div>
            <div className="absolute h-[25px] text-3xl mt-[15.5%] pl-[40%] text-[#D1006B] hidden sm:block"><FaArrowUp/></div>
            <div className="absolute h-[25px] text-3xl mt-[5.5%] pl-[25.8%] text-[#DC143C] hidden sm:block"><FaArrowLeft/></div>
        </div>
      </div>

      {/* "BLoBus의 설명" 카드 */}
      <div className="w-[100%] sm:w-[200px] h-[235px] sm:h-[200px] rounded-[25px] ml-[0%] sm:ml-[1%] mt-[115%] sm:mt-[-31%] bg-[linear-gradient(75deg,_#0130BC,_#DB0153)]">
        <p className="flex justify-center items-center pt-4 text-2xl font-bold text-white sm:ml-[0px] ml-[-10px]">
          BLoBus 기능
        </p>

        <div className="absolute w-[100%] sm:w-[200px] h-[170px] rounded-[25px] bg-white font-bold mt-[20px] p-4 space-y-6 border-2">
          <Link to="/blobusintro">
            <p className="border-b-2 p-2 sm:p-2 pl-[37%] transition duration-500 hover:text-gray-400">BLoBus 소개</p>
          </Link>

          <NavLink to="/blobuswork" className={({ isActive }) => `${isActive ? 'text-gray-400' : ''}`}>
            <p className="border-b-2 p-2 sm:p-2 pl-[37%] transition duration-500 hover:text-gray-400">BLoBus 기능</p>
          </NavLink>

          <Link to="/blobusnews">
            <p className="border-b-2 p-2 sm:p-2 pl-[37%] transition duration-500 hover:text-gray-400">BLoBus 목표</p>
          </Link>

        </div>
      </div>
            
        </div>
    )
}
export default BLoBusWork;