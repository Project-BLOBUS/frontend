import React from "react";
import Header from "../main/Header"; // Header를 대문자로 수정

function Resources() {

  const resources = [
    { name: "자원메뉴1", link: "/" },
    { name: "자원메뉴2", link: "/" },
    { name: "자원메뉴3", link: "/" },
  ];

return(
    <div>

  <div className="bg-[linear-gradient(45deg,_#FF0033,_#4900D2)]">
  {/* Header에 isWhite prop을 true로 전달하고, pageTitle을 '청년관'으로 설정 */}
  <Header 
  navs={resources} 
  isWhite={true} 
  pageTitle="지역자원" 
  titleBg="#4400A8"  
  borderB={false} 
  />
  </div>

  <div className="w-[70%] h-[600px] ml-[15%] mt-[1%]  border-2 border-red-600">
  
    <div className="border-2 border-blue-400 h-[100px]">
      들어가야하는 첫번째 div
    </div>

    <div className="border-2 border-blue-400 h-[80%] mt-[2%]">
      들어가야하는 두번째 div
    </div>

  </div>

  <div className="w-[170px] h-[200px] bg-gray-400 rounded-[5px] ml-[2%] mt-[-31%]">
    들어가야하는 세번째 div
  </div>
 

</div>
)
};

export default Resources;
