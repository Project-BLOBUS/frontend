import React from "react";
import Header from "./Header";
import { NavLink,Link } from 'react-router-dom';

function BLoBusNews() {
    return(
        <div>
             <div className="bg-[linear-gradient(15deg,_#0130BC,_#DB0153)]">
            <Header 
            pageTitle="소개" 
            titleBg="#C40052" 
            isWhite={true} 
            borderB={false} 
            />
            </div>
             {/* 레이아웃 */}
      <div className="w-[70%] h-[600px] ml-[15%] mt-[1%]">
        <div className="border-b-4 h-[100px] pt-[3%] text-2xl font-bold ">
          BLoBus 목표
        </div>

        <div className="h-[80%] mt-[2%] flex justify-evenly items-center">
        
          <div className="mb-[30%]">
              <div className="w-[400px] border-b-4 mt-[70%] text-xl font-bold ">가. 청년 유출 방지 및 지역 활성화</div>
              <p className=" w-[400px] h-[350px] border-2 border-[#00008B] rounded-[10px] p-2 mt-2">『BLoBus는 부산 청년들이 필요한 정보를 효율적으로 제공하여 청년들의 지역 정착을 유도하고, 부산의 인구 유출 문제를 완화 할 수 있도록 함
                <p className="w-[400px] ml-[-2.5%] border-t-2 border-[#00008B] p-2">①. 정보 접근성 개선: 정책과 지원 정보의 통합으로 청년들이 필요한 정보를 쉽게 찾고 활용할 수 있어 정책 실효성을 극대화
                  <p className="mt-4">②. 부산 정착 환경 조성: 맞춤형 정보 제공과 정책 알림 기능을 통해 청년들이 부산에서 안정적으로 생활 할 수 있는 기반을 마련
                    <p className="mt-4">③. 지역 경제 활성화: 청년 정착률 증가로 지역 내 경제 활동이 촉진되고, 부산의 지속 가능성을 높이는데 기여</p>
                  </p>
                </p>
              </p>
              
          </div> 

          <div className="mb-[30%]">
          <div className="w-[400px] border-b-4 mt-[70%] text-xl font-bold">나. 정책 활용률 증가와 신뢰성 향상</div>
              <p className="w-[400px] h-[350px] border-2 border-[#4B0082] rounded-[10px] p-2 mt-2">『BLoBus는 정책과 정보를 통합적으로 제공하여 청년들이 정책을 더 효과적으로 활용할 수 있도록 지원하며, 정책에 대한 신뢰도를 높임
                <p className="w-[400px] ml-[-2.5%] border-t-2 border-[#4B0082] p-2">①. 정책 활용률 증가: 마이페이지와 맞춤형 정보 제공 기능을 통해 청년들이 자신에게 적합한 정책을 빠르게 파악하고, 적극적으로 참여할 수 있게 가능
                  <p className="mt-4">②. 정책 피드백 수집: 커뮤니티 활성화를 통해 정책의 실제 효과에 대한 청년들의 의견을 수립하고, 이를 기반으로 정책 개선이 가능
                    <p className="mt-4">③. 정책 홍보 강화: 홍보와 마케팅을 통해 정책과 플랫폼에 대한 인지도를 높이고, 부산 청년 정책의 신뢰도를 회복</p>
                  </p>
                </p>
              </p>
          </div>

        </div>

      </div>

      {/* "BLoBus의 설명" 카드 */}
      <div className="w-[200px] h-[200px] bg-gray-400 rounded-[25px] ml-[1%] mt-[-31%] bg-[linear-gradient(75deg,_#0130BC,_#DB0153)]">
        <p className="flex justify-center items-center pt-4 text-2xl font-bold text-white">
          BLoBus 목표
        </p>

        <div className="absolute w-[200px] h-[170px] rounded-[25px] bg-white font-bold mt-[20px] p-4 space-y-6 border-2">
          <Link to="/blobusintro">
            <p className="border-b-2 p-2 transition duration-500 hover:text-gray-400">BLoBus 소개</p>
          </Link>

          <Link to="/blobuswork">
            <p className="border-b-2 p-2 transition duration-500 hover:text-gray-400">BLoBus 기능</p>
          </Link>

          <NavLink to="/blobusnews" className={({ isActive }) => `${isActive ? 'text-gray-400' : ''}`}>
            <p className="border-b-2 p-2 transition duration-500 hover:text-gray-400">BLoBus 목표</p>
          </NavLink>
        </div>
      </div>
        </div>
    )
}
export default BLoBusNews;