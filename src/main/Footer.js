import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram,FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="h-[141px] bg-gradient-to-r from-[#5c2d91] to-[#d4145a] text-white ">
    <div className="w-[100%] border-b-2 border-gray-300 ">    
      <div className="w-[70%] ml-[15%] flex justify-start items-center">
          <Link to="/" className="w-[130px]">
            개인정보처리방침
          </Link>
          <p className="p-2 text-xl">|</p>
         <Link to="/" className="w-[65px]">
          이용약관
        </Link>
        <p className="p-2 text-xl">|</p>
        <Link to="/" className="w-[160px]">
          이메일 무단 수집거부
        </Link>
        
        
          <Link to="/#" className="text-3xl ml-[59%] ">
            <FaYoutube />
          </Link>

          <Link to="/#" className="text-3xl ml-[2%] ">
            <FaInstagram />
          </Link>

          <Link to="/#" className="text-3xl ml-[2%] ">
            <FaFacebook />
          </Link>
         
        </div>
      </div>

      <div className="w-[70%] ml-[14.5%] flex justify-start items-center mt-[15px]">
        <img
          src="https://i.ibb.co/kBnHhDn/blobus-logo-white.png"
          alt="블루버스 로고"
          className="w-[90px] h-[70px]"
        />
        <div className="ml-[2%]">
          우48059 부산광역시 해운대구 센텀동로 41
          
          <p>문의: info@busanyouthplatform.kr | 전화: 051-123-4567</p>
          
          <p>© 2024 Busan Youth Platform. All rights reserve</p>
        </div>
      
    </div>
  </footer>
 );
}

export default Footer;
