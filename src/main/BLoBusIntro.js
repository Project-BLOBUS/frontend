// BLoBusIntro.js
import React from "react";
import { NavLink,Link } from 'react-router-dom';
import Header from './Header';

function BLoBusIntro() {
  return (
    <div>
      {/* 배경과 Header 부분 */}
      <div className="bg-[linear-gradient(15deg,_#0130BC,_#DB0153)]">
        <Header
          pageTitle="소개"
          titleBg="#C40052"
          isWhite={true}
          borderB={false}
        />
      </div>

      {/* 레이아웃 */}
      <div className="w-[70%] h-[600px] ml-[15%] mt-[1%] ">
        <div className="border-b-4 h-[100px] pt-[3%] text-2xl font-bold hidden sm:block">
          BLoBus 소개
        </div>

        <div className=" h-[80%] mt-[2%] mr-[8%]">
          <p className="w-[170px] h-[50px] ml-[35%] mt-[5%] sm:mt-[0%] sm:ml-[45%] text-3xl sm:text-5xl font-bold text-transparent bg-[linear-gradient(75deg,_#0130BC,_#DB0153)] bg-clip-text">
            BLoBus
          </p>

          <p className="sm:text-xl text-center text-xs font-bold w-[233px] sm:w-[670px] p-2 bg-[linear-gradient(75deg,_#0130BC,_#DB0153)] ml-[12%] sm:ml-[22%] mt-[2%] rounded-full text-white">
            부산을 중심으로 세계와 청년이 하나로 연결하는 정보 통합 플랫폼 구축
          </p>

          <p className="w-[255px] sm:w-[700px] ml-[7%] sm:ml-[21%] text-sm sm:text-md font-bold text-gray-600 text-center mt-4">
            BLoBus는 부산 청년들이 필요한 정보와 정책을 한 곳에서 직관적이고 효율적으로 제공하는 통합 플랫폼으로, 청년들이 지역에 정착할수 있는 기반을 마련
          </p>

          <div className="flex flex-col sm:flex-row sm:space-x-20 space-x-0 pl-[14%] w-[100%] h-[60%]">

              <nav className="w-[223px] h-[240px] mt-4 p-5 border-2 border-[#87CEFA] rounded-[25px] text-lg font-bold  ">
                 <p className="mt-[-10px]"> First Chapter</p> 
                <p className="bg-[#87CEFA] text-[15px] w-[224px] h-[190px] mt-[10px] ml-[-22px] rounded-b-[25px] p-4 text-slate-700">BLoBus는 부산 청년들에게 일자리,주거,교육,문화 생활 등 다양한 정보에 대한 접근성을 높여 줄 뿐 만 아니라 부산을 글로벌 청년 커뮤니티와 연결하는 가교 역할</p>
              </nav>

              <nav className="w-[223px] h-[220px] sm:h-[240px] mt-4 p-5 border-2 border-[#D8B7DD] rounded-[25px] text-lg font-bold  ">
                 <p className="mt-[-10px]"> Two Chapter</p> 
                <p className="bg-[#D8B7DD] text-[15px] w-[224px] h-[170px] sm:h-[190px] mt-[10px] ml-[-22px] rounded-b-[25px] p-4 text-slate-700">이를 통해 부산이 단순히 머무르는 곳이 아닌, 청년들에게 매력적인 미래를 설계할 수 있는 도시로 거듭날 수 있도록 돕는것을 목표</p>
              </nav>

              <nav className=" w-[223px] h-[240px] mt-4 p-5 border-2 border-[#FFB6C1] rounded-[25px] text-lg font-bold  ">
                 <p className="mt-[-10px]"> Three Chapter</p> 
                <p className="bg-[#FFB6C1] text-[15px] w-[224px] h-[190px] mt-[10px] ml-[-22px] rounded-b-[25px] p-4 text-slate-700">부산 청년 정책의 문제점, 청년들의 의견 수림을 바탕으로 한 개선 방향, 그리고 통합 플랫폼의 주요 기능을 다루며, 부산 청년과 글로벌 커뮤니티를 하나로 연결</p>
              </nav>

          </div>

        </div>
      </div>

      {/* "BLoBus의 설명" 카드 */}
      <div className="w-[100%] sm:w-[200px] h-[100%] sm:h-[200px] rounded-[25px]  sm:ml-[1%] mt-[95%] sm:mt-[-31%] bg-[linear-gradient(75deg,_#0130BC,_#DB0153)]">
        <p className="flex justify-center items-center pt-4 text-2xl font-bold text-white">
          BLoBus 소개
        </p>

        <div className="w-[100%] sm:w-[200px] h-[170px] rounded-[25px] bg-white font-bold mt-[20px] p-4 space-y-6 border-2">
          <NavLink to="/blobusintro" className={({ isActive }) => `${isActive ? 'text-gray-400' : ''}`}>
            <p className="border-b-2 p-2 sm:p-2 pl-[38%] transition duration-500 hover:text-gray-400">BLoBus 소개</p>
          </NavLink>

          <Link to="/blobuswork">
            <p className="border-b-2 p-2 sm:p-2 pl-[38%] transition duration-500 hover:text-gray-400">BLoBus 기능</p>
          </Link>

          <Link to="/blobusnews">
            <p className="border-b-2 p-2 sm:p-2 pl-[38%] transition duration-500 hover:text-gray-400">BLoBus 목표</p>
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default BLoBusIntro;
