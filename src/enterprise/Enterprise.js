import React from "react";
import Header from "../main/Header"; // Header를 대문자로 수정

function Enterprise() {

    const enterprise = [
        { name: "기업메뉴1", link: "/" },
        { name: "기업메뉴2", link: "/" },
        { name: "기업메뉴3", link: "/" },
      ];

    return(
        <div>

      <div className="bg-[#0055FF] ">
      <div className="w-[99%]">
      {/* Header에 isWhite prop을 true로 전달하고, pageTitle을 '청년관'으로 설정 */}
      <Header 
      navs={enterprise} 
      isWhite={true} 
      pageTitle="기업관" 
      titleBg="#003BB2"  
      borderB={false} 
      />
      </div>
      </div>

      <div className="w-[70%] h-[600px] ml-[15%] mt-[1%]  border-2 border-red-600">
      
        <div className="border-2 border-blue-400 h-[100px]">
          들어가야하는 첫번째 div
        </div>

        <div className="border-2 border-blue-400 h-[80%] mt-[2%]">
          들어가야하는 두번째 div
        </div>

      </div>

      <div className="w-[170px] h-[200px] bg-gray-400 rounded-lg ml-[2%] mt-[-31%]">
        들어가야하는 세번째 div
      </div>
     

    </div>
    )
}

export default Enterprise;