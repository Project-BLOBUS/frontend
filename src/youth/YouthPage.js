import React from "react";
import Header from "../main/Header"; // Header를 대문자로 수정

function YouthPage (){

  const youths = [
    { name: "일자리", link: "/" },
    { name: "주거", link: "/" },
    { name: "금융", link: "/" },
    { name: "교육", link: "/" },
    { name: "창업", link: "/" },
    { name: "지도", link: "/" },
    { name: "건의", link: "/" }
  ];

  return (
    <div>

      <div className="bg-[#6F00FF]">
      {/* Header에 isWhite prop을 true로 전달하고, pageTitle을 '청년관'으로 설정 */}
      <Header 
      navs={youths} 
      isWhite={true} 
      pageTitle="청년관" 
      titleBg="#420099"  
      borderB={false} 
      />
      </div>

      <div className="w-[70%] h-[600px] ml-[15%]  border-2 border-red-600">
        <div className="border-2 border-blue-400 h-[70px]">

           들어가야하는 첫번째 div
        </div>

        <div className="border-2 border-blue-400 h-[100px]">
          들어가야하는 두번째 div
        </div>

        <div className="border-2 border-blue-400 h-[68%] mt-[2%]">
          들어가야하는 세번째 div
        </div>

        <div className="w-[200px] h-[20px] bg-red-300 ml-[40%] mt-[5px]">
          들어가야하는 페이징 5번째
        </div>

      </div>

      <div className="w-[170px] h-[200px] bg-gray-400 rounded-lg ml-[2%] mt-[-31%]">
        들어가야하는 네번째 div
      </div>
     

    </div>

  );
};

export default YouthPage;
