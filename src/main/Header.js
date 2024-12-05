import React from "react";
import { Link } from 'react-router-dom';
import '../main/index.css';

function Header({ navs = [],navs2 = [], isWhite = false, pageTitle,titleBg = '#EC0245',textC ='#FFFFFF', borderB = true  }) {
  const blobusTextColor = isWhite ? 'text-white' : 'text-[#3E16E2]';  
  const linkTextColor = isWhite ? 'text-white' : 'text-[#666666]';   
  

  return (
    <div className={`font-bold ${borderB ? 'border-b-2 main-border-bottom' : ''}`}>
      <div className="w-[full] sm:w-[70.6%] sm:flex-row ml-[15%] flex justify-between items-center ">
        
      <Link to="/main">
        <p className={`text-3xl ${blobusTextColor} ml-[-45px] mt-[-70px] sm:ml-[0px] sm:mt-[0px]`}>BLOBUS</p>
      </Link>

        <div className="mt-[65px] sm:mt-[0px] flex ml-[-130px] sm:ml-[0px] flex-wrap sm:flex-none">
          {navs.map((nav) => (
            <Link 
              className={`m-4 ${linkTextColor} transition duration-500 hover:text-gray-300 `} 
              key={nav.name} 
              to={nav.link}
            >
              {nav.name}
            </Link>
          ))}

          {navs2.map((nav) => (
            <Link 
              className={`m-3 ${linkTextColor} transition duration-500 hover:text-gray-300 opacity-0 pointer-events-none`} 
              key={nav.name} 
              to={nav.link}
            >
              {nav.name}
            </Link>
          ))}
        </div>

        
        

        

        <div className="sm:mr-[14px] mr-[30px]">
        <p className={`mt-[-8px] h-[50px] rounded-b-[5px] flex justify-center items-center`} style={{ backgroundColor: titleBg,color:textC }}>
            {pageTitle}  {/* 메인 글자 동적으로 텍스트 표시 */}
          </p>

          <div className={`flex justify-center items-center mt-[10px] ${linkTextColor} mt-[20px] sm:mt-[0px] flex flex-wrap sm:flex-none`}>
            <div className="cursor-pointer transition duration-500 hover:text-gray-300">회원가입</div>
              <p className="p-2 hidden sm:block">|</p>
            <div className="cursor-pointer transition duration-500 hover:text-gray-300 mt-[34px] sm:mt-[0px]">로그인</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;