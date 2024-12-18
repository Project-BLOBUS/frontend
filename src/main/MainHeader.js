import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCookie, removeCookie } from "../etc/util/cookieUtil";

function MainHeader({pageTitle}) {
    return(
        <div className="w-[100%] h-[150px] flex flex-col justify-center pb-8">
             <div className="w-full h-[60px]">
            
                      <div className="w-[70%] h-[60px] ml-[15%] flex justify-start items-center font-bold text-sm">
                                    <Link to="/main">
                                        <div class="text-3xl italic leading-[3px] group relative duration-500">
                                         <div class="transition group-hover:-translate-x-8 group-hover:text-[#C0C0C0] w-[70px]">
                                           BLO
                                         </div>
                         
                                          <div class="transition group-hover:translate-x-8 group-hover:text-[#C0C0C0] w-[70px]">
                                           BUS
                                         </div>
                                       </div>
                                     </Link>    
                         <div className="text-lg w-[150px] ml-[6.5%] flex ">
                            <p className="text-[#D70159]">부산</p>
                            <p className="text-[#0051E6]">청년</p>
                            <p>플랫폼</p>
                         </div>
                      
                        
                          {!getCookie("jwt") ? (
                          <>
                            <Link
                              className="transition duration-500 hover:text-gray-400 ml-[62%] text-lg font-medium"
                              to="/member/signup"
                              replace={pageTitle === "계정"}
                            >
                              회원가입
                            </Link>
                            <p className="p-2 text-lg hidden sm:block">|</p>
                            <Link
                              className="transition duration-500 hover:text-gray-400 text-lg font-medium"
                              to="/member/login"
                              replace={pageTitle === "계정"}
                            >
                              로그인
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              className="transition duration-500 hover:text-gray-400 ml-[59%] text-lg font-medium"
                              to="/mypage"
                            >
                              마이페이지
                            </Link>
                            <p className="p-2 hidden sm:block">|</p>
                            <Link
                              className="transition duration-500 hover:text-gray-400 text-lg font-medium"
                              onClick={() => {
                                // TODO 로그아웃 모달창
                                if (window.confirm("로그아웃하시겠습니까?")) {
                                  removeCookie("jwt");
                                  removeCookie("expirationTime");
                                  removeCookie("userName");
                                  removeCookie("userEmail");
                                  removeCookie("userAddress");
            
                                  if (!getCookie("idSave")) {
                                    removeCookie("userId");
                                    removeCookie("userRole");
                                  }
                                  setTimeout(() => {
                                    toast.success("로그아웃");
                                  }, 100);
                                }
                              }}
                            >
                              로그아웃
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                    <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
        </div>
    )
}
export default MainHeader;