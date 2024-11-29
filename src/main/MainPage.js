import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate,Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";      
import 'react-toastify/dist/ReactToastify.css';

function MainPage() {
  const [activeNav, setActiveNav] = useState(null); // 클릭된 항목을 추적

  const handleNavClick = (nav) => {
    setActiveNav(nav); // 클릭된 항목으로 상태 업데이트
  };


  const [searchs, setSearchs] = useState(''); // 검색어 상태
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const [toastId,setToastId] = useState(null);

    // 검색어 입력 시 상태 업데이트
    const handleSearchChange = (e) => {
      setSearchs(e.target.value);
    };

      // 검색 아이콘 클릭 시 AllComponent로 이동
  const handleSearchClick = () => {
    if (searchs.trim() !== '') {
      // AllComponent로 검색어를 쿼리 파라미터로 전달 (비어 있지 않을때)
      navigate(`/allsearch?query=${searchs}`);
    } else {
      // 현재 토스트가 활성화되어 있는지 확인 (비어 있을때)
      if (!toast.isActive(toastId)) {
        const newToastId = toast.warning("검색어를 입력해주세요!");
        setToastId(newToastId); // 새로운 토스트 ID 저장
      }
    }
  };


  const slides = [
    
    {
      url: "https://img.freepik.com/premium-vector/young-businessman-speaking-screen-announcer-teacher_147644-3273.jpg?w=900" ,
      link: "/blobusIntro",
      text: "BLoBus 소개",
      style: "w-full h-full bg-center bg-cover rounded-lg",
      textStyle: "sm:text-4xl text-2xl p-7 pt-[50px] sm:pl-[40px] pl-[20px] font-bold text-gray-800",
    },
    {
      url: "https://img.freepik.com/premium-vector/man-sits-desk-front-computer-screen-that-says-i-m-software-developer_877730-109.jpg?w=996",
      link: "/blobusWork",
      text: "BLoBus 기능",
      style: "w-full h-full bg-center bg-cover rounded-lg",
      textStyle: "sm:text-2xl text-xl p-7 pt-[40px] sm:pl-[38%] pl-[32%] font-bold text-gray-800",
    },
    {
<<<<<<< HEAD
      url: "https://img.freepik.com/premium-vector/hand-holding-tablet-with-checklist-online-survey-form_34089-125.jpg?w=740",
      link: "/blobusNews",
      text: "BLoBus 목표",
      style: "w-full h-full bg-center bg-cover rounded-lg",
      textStyle: "text-white sm:text-xl text-xs p-7 sm:pt-[18px] pt-[35px] sm:pl-[38%] pl-[39.5%] font-bold text-gray-700",
=======
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
>>>>>>> a2756e0da6640e82bed9309d982be114d26ff3aa
    },
  ];

  

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
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
      <Header pageTitle="메인" titleBg="#EC0245" borderB={true}/>

      <div className="h-full w-[70.7%] ml-[15%] mt-[1.6%] flex flex-col sm:flex-row">
        {/* 왼쪽 라인 */}
        <div className="w-full sm:w-[535px]">
          <div className=" sm:w-[100%] w-[118%] ml-[-10%] sm:ml-[0%] h-[300px] sm:h-[400px]">
            <Link to={slides[currentIndex].link || "#"}>
              <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className={slides[currentIndex].style}
              >
                <div className={slides[currentIndex].textStyle}>
                  {slides[currentIndex].text}
                </div>
              </div>
            </Link>

            {/* 왼쪽 화살표 */}
            <div className="w-[9%] mt-[-35%] transform -translate-y-1/2 rounded-full p-2 bg-black/20 text-white transition duration-500 hover:text-black hover:bg-white hover:bg-opacity-20 cursor-pointer hidden sm:block">
              <BsChevronLeft onClick={prevSlide} size={30} />
            </div>

            {/* 오른쪽 화살표 */}
            <div className="w-[9%] mt-[-9%] ml-[91%]  transform -translate-y-1/2 rounded-full p-2 bg-black/20 text-white transition duration-500 hover:text-black hover:bg-white hover:bg-opacity-20 cursor-pointer hidden sm:block">
              <BsChevronRight onClick={prevSlide} size={30} />
            </div>
          </div>

          <div className="text-xl sm:text-2xl mt-4 sm:ml-[0%] ml-[37%] font-bold">통합검색</div>

          <div className="flex justify-start">
            <input
              type="text"
              placeholder="검색"
              className="font-bold text-md sm:text-lg mt-2 rounded-tl-[25px] rounded-bl-[25px] border-2 w-[230px] sm:w-[450px] h-[30px] sm:h-[50px] p-4 focus:outline-none"
              value={searchs} // 상태값을 input에 바인딩
              onChange={handleSearchChange} // 검색어 입력 시 상태 업데이트
            />

            <div className="w-[85px] sm:h-[50px] mt-2 bg-[#A488F3] text-md sm:text-lg text-white font-bold rounded-tr-[25px] rounded-br-[25px] flex  justify-center items-center cursor-pointer transition duration-500 hover:text-gray-300" onClick={handleSearchClick}>
              검색
            </div>
          </div>
        </div>
        {/* 오른쪽 라인 */}
<<<<<<< HEAD
        <div className="ml-[1.8%] mt-[-1%] ">

          <div className="sm:text-lg text-xl font-bold sm:ml-[0%] ml-[31.5%] mt-4 sm:mt-[-8px]">실시간 정보</div>
=======
        <div className="ml-[1.5%]">
          <div className="text-lg font-bold">실시간 정보</div>
>>>>>>> a2756e0da6640e82bed9309d982be114d26ff3aa

          <div className="flex flex-wrap justify-center items-center text-md font-bold text-center mt-2 sm:mt-0 sm:ml-[-1%] ml-[-3%]">
            <nav
              onClick={() => handleNavClick("청년관")}
              className={` p-3 w-[129px] cursor-pointer ${
                activeNav === "청년관"
                  ? "border-t-[3px] border-t-[#0130BC] border-b-0"
                  : "border"
              }`}
            >
              청년관
            </nav>

            <nav
              onClick={() => handleNavClick("기업관")}
              className={`p-3 w-[129px] cursor-pointer ${
                activeNav === "기업관"
                  ? "border-t-[3px] border-t-[#DB0153] border-b-0"
                  : "border"
              }`}
            >
              기업관
            </nav>

            <nav
              onClick={() => handleNavClick("지역자원")}
              className={`p-3 w-[129px] cursor-pointer ${
                activeNav === "지역자원"
                  ? "border-t-[3px] border-t-[#6E00FF] border-b-0"
                  : "border"
              }`}
            >
              지역자원
            </nav>

            <nav
              onClick={() => handleNavClick("커뮤니티")}
              className={`p-3 w-[129px] cursor-pointer ${
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

          <div className="mt-2 sm:w-[521px] w-[260.5px] h-[270px] sm:ml-[0px] ml-[10px] flex flex-wrap gap-4 text-white font-bold ">
            <Link to="/youth">
              <div className="text-2xl sm:w-[250px] w-[120px] h-[150px] bg-[linear-gradient(45deg,_#0130BC,_#6E00FF)]  flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
                청년관
              </div>
            </Link>

            <Link to="/enterprise">
              <div className="sm:w-[241.5px] w-[111px] h-[100px] bg-[linear-gradient(45deg,_#DB0153,_#0130BC)] sm:ml-[9px] ml-[7px] flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
                기업관
              </div>
            </Link>

<<<<<<< HEAD
            <Link to="/comunity">
              <div className="sm:w-[250px] w-[119px] h-[100px] bg-[linear-gradient(45deg,_#6E00FF,_#DB0153)] flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
=======
            <Link to="/community">
              <div className="w-[250px] h-[100px] bg-[linear-gradient(45deg,_#6E00FF,_#DB0153)] flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
>>>>>>> a2756e0da6640e82bed9309d982be114d26ff3aa
                커뮤니티
              </div>
            </Link>

            <Link to="/resources">
              <div className="sm:w-[241.5px] w-[111px] h-[150px] bg-[linear-gradient(45deg,_#DB0153,_#FB0138)] mt-[-50px] sm:ml-[9px] ml-[7px] flex justify-center items-center hover:text-gray-300 hover:scale-90 transition duration-500">
                지역자원
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
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
  );
}

export default MainPage;