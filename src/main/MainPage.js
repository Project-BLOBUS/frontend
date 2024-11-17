import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

function MainPage() {
  const [activeNav, setActiveNav] = useState(null); // 클릭된 항목을 추적

  const handleNavClick = (nav) => {
    setActiveNav(nav); // 클릭된 항목으로 상태 업데이트
  };

  const slides = [
    {
      url: "https://img.freepik.com/free-vector/flat-social-media-cover-template-international-youth-day_23-2150561956.jpg?t=st=1730684814~exp=1730688414~hmac=6713f93beb6b5a1d446b0132f0bd405acc5183d673551e59ea32ad711dfeb5bb&w=996",
      link: "/youth",
      text: "청년~~",
    },
    {
      url: "https://img.freepik.com/premium-vector/flat-back-school-landing-page-template_23-2149477804.jpg?w=996",
      link: "/enterprise",
      text: "기업~~",
    },
    {
      url: "https://img.freepik.com/free-vector/flat-international-youth-day-horizontal-banner-template_23-2149459177.jpg?t=st=1730685111~exp=1730688711~hmac=4f5d9e4264f317a238fb3dc222024ad2110341898766d47366cd42ed49d12cb1&w=996",
      link: "/community",
      text: "커뮤니티~~",
    },
    {
      url: "https://img.freepik.com/free-vector/flat-international-youth-day-social-media-post-template_23-2149511851.jpg?t=st=1730685156~exp=1730688756~hmac=a1bd4db5cf2bcc0f4dbe1e01289e5f99711436ada2ea28036c96561e564ff3b8&w=1060",
      link: "/resource",
      text: "지역자원~~",
    },
    {
      url: "https://img.freepik.com/premium-vector/flat-design-international-youth-day-banner-template_23-2149487441.jpg?w=996",
      link: "/",
      text: "아무거나~~",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {/* "메인"으로 설정된 페이지 제목 */}
      <Header pageTitle="메인" titleBg="#EC0245" borderB={true} />

      <div className="h-full w-[70%] ml-[15%] mt-[3%] flex">
        {/* 왼쪽 라인 */}
        <div className="w-[535px]">
          <div className="w-[100%] h-[400px]">
            <Link to={slides[currentIndex].link || "#"}>
              <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full bg-center bg-cover duration-500 rounded-lg"
              >
                <div className="text-white text-3xl font-bold shadow-md">
                  {slides[currentIndex].text}
                </div>
              </div>
            </Link>

            {/* 왼쪽 화살표 */}
            <div className="w-[9%] mt-[-35%] transform -translate-y-1/2 rounded-full p-2 bg-black/20 text-white transition duration-500 hover:text-black hover:bg-white cursor-pointer hidden sm:block">
              <BsChevronLeft onClick={prevSlide} size={30} />
            </div>

            <div className="w-[9%] mt-[-9%] ml-[91%]  transform -translate-y-1/2 rounded-full p-2 bg-black/20 text-white transition duration-500 hover:text-black hover:bg-white cursor-pointer hidden sm:block">
              <BsChevronRight onClick={prevSlide} size={30} />
            </div>
          </div>

          <div className="text-2xl mt-4 font-bold">통합검색</div>

          <div className="flex justify-start">
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className="font-bold text-lg mt-4 rounded-tl-[25px] rounded-bl-[25px] border-2 w-[450px] h-[50px] p-4 focus:outline-none"
            />

            <div className="w-[85px] h-[50px] mt-4 bg-[#A488F3] text-lg text-white font-bold rounded-tr-[25px] rounded-br-[25px] flex justify-center items-center cursor-pointer">
              검색
            </div>
          </div>
        </div>
        {/* 오른쪽 라인 */}
        <div className="ml-[1.5%]">
          <div className="text-lg font-bold">실시간 정보</div>

          <div className="flex justify-center items-center text-md font-bold text-center ">
            <nav
              onClick={() => handleNavClick("청년관")}
              className={`p-3 w-[130px] cursor-pointer ${
                activeNav === "청년관"
                  ? "border-t-[3px] border-t-[#0130BC] border-b-0"
                  : "border"
              }`}
            >
              청년관
            </nav>

            <nav
              onClick={() => handleNavClick("기업관")}
              className={`p-3 w-[130px] cursor-pointer ${
                activeNav === "기업관"
                  ? "border-t-[3px] border-t-[#DB0153] border-b-0"
                  : "border"
              }`}
            >
              기업관
            </nav>

            <nav
              onClick={() => handleNavClick("지역자원")}
              className={`p-3 w-[130px] cursor-pointer ${
                activeNav === "지역자원"
                  ? "border-t-[3px] border-t-[#6E00FF] border-b-0"
                  : "border"
              }`}
            >
              지역자원
            </nav>

            <nav
              onClick={() => handleNavClick("커뮤니티")}
              className={`p-3 w-[130px] cursor-pointer ${
                activeNav === "커뮤니티"
                  ? "border-t-[3px] border-t-[#FB0138] border-b-0"
                  : "border"
              }`}
            >
              커뮤니티
            </nav>
          </div>

          {/* 조건부 렌더링 임시로 넣은겁니다. */}
          {activeNav === "청년관" && (
            <motion.div
              className="flex flex-col h-[168px] overflow-y-auto"
              initial={{ opacity: 0, y: -20 }} // 초기 상태: 투명하고 위쪽에 위치
              animate={{ opacity: 1, y: 0 }} // 애니메이션 종료 후: 불투명하고 원래 위치로
              exit={{ opacity: 0, y: -20 }} // 떠날 때: 다시 투명하고 위로 이동
              transition={{ duration: 0.5 }} // 애니메이션 지속 시간
            >
              <span className="border-b-2 p-1">실시간 청년1</span>
              <span className="border-b-2 p-1">실시간 청년2</span>
              <span className="border-b-2 p-1">실시간 청년3</span>
              <span className="border-b-2 p-1">실시간 청년4</span>
              <span className="border-b-2 p-1">실시간 청년5</span>
              <span className="border-b-2 p-1">실시간 청년6</span>
            </motion.div>
          )}

          {activeNav === "기업관" && (
            <motion.div
              className="flex flex-col h-[168px] overflow-y-auto"
              initial={{ opacity: 0, y: -20 }} // 초기 상태
              animate={{ opacity: 1, y: 0 }} // 애니메이션 종료 후
              exit={{ opacity: 0, y: -20 }} // 떠날 때
              transition={{ duration: 0.5 }} // 애니메이션 지속 시간
            >
              <span className="border-b-2 p-1">실시간 기업1</span>
              <span className="border-b-2 p-1">실시간 기업2</span>
              <span className="border-b-2 p-1">실시간 기업3</span>
              <span className="border-b-2 p-1">실시간 기업4</span>
              <span className="border-b-2 p-1">실시간 기업5</span>
              <span className="border-b-2 p-1">실시간 기업6</span>
            </motion.div>
          )}

          {activeNav === "지역자원" && (
            <motion.div
              className="flex flex-col h-[168px] overflow-y-auto"
              initial={{ opacity: 0, y: -15 }} // 초기 상태
              animate={{ opacity: 1, y: 0 }} // 애니메이션 종료 후
              exit={{ opacity: 0, y: -20 }} // 떠날 때
              transition={{ duration: 0.5 }} // 애니메이션 지속 시간
            >
              <span className="border-b-2 p-1">실시간 지역자원1</span>
              <span className="border-b-2 p-1">실시간 지역자원2</span>
              <span className="border-b-2 p-1">실시간 지역자원3</span>
              <span className="border-b-2 p-1">실시간 지역자원4</span>
              <span className="border-b-2 p-1">실시간 지역자원5</span>
              <span className="border-b-2 p-1">실시간 지역자원6</span>
            </motion.div>
          )}

          {activeNav === "커뮤니티" && (
            <motion.div
              className="flex flex-col h-[168px] overflow-y-auto"
              initial={{ opacity: 0, y: -15 }} // 초기 상태
              animate={{ opacity: 1, y: 0 }} // 애니메이션 종료 후
              exit={{ opacity: 0, y: -20 }} // 떠날 때
              transition={{ duration: 0.5 }} // 애니메이션 지속 시간
            >
              <span className="border-b-2 p-1">실시간 커뮤니티1</span>
              <span className="border-b-2 p-1">실시간 커뮤니티2</span>
              <span className="border-b-2 p-1">실시간 커뮤니티3</span>
              <span className="border-b-2 p-1">실시간 커뮤니티4</span>
              <span className="border-b-2 p-1">실시간 커뮤니티5</span>
              <span className="border-b-2 p-1">실시간 커뮤니티6</span>
            </motion.div>
          )}

          <div className="mt-2 w-[521px] h-[270px] flex flex-wrap gap-4 text-white font-bold">
            <Link to="/youth">
              <div className="text-2xl w-[250px] h-[150px] bg-[linear-gradient(45deg,_#0130BC,_#6E00FF)]  flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
                청년관
              </div>
            </Link>

            <Link to="/enterprise">
              <div className="w-[245px] h-[100px] bg-[linear-gradient(45deg,_#DB0153,_#0130BC)] ml-[10px] flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
                기업관
              </div>
            </Link>

            <Link to="/community">
              <div className="w-[250px] h-[100px] bg-[linear-gradient(45deg,_#6E00FF,_#DB0153)] flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
                커뮤니티
              </div>
            </Link>

            <Link to="/resource">
              <div className="w-[245px] h-[150px] bg-[linear-gradient(45deg,_#DB0153,_#FB0138)] mt-[-50px] ml-[10px] flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
                지역자원
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
