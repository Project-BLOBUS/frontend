import { useState,useEffect } from "react";
import MainHeader from "./MainHeader";
import Footer from "./Footer";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLogo from "./MainLogo.jpg";
import { FaSearch } from "react-icons/fa";

const MainPage = () => {
  const [searchs, setSearchs] = useState(""); // 검색어 상태
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const [toastId, setToastId] = useState(null);

  // 검색어 입력 시 상태 업데이트
  const handleSearchChange = (e) => {
    setSearchs(e.target.value);
  };

  // 검색 아이콘 클릭 시 AllComponent로 이동
  const handleSearchClick = () => {
    if (searchs.trim() !== "") {
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

    // public 폴더에 있는 이미지 경로
    const images = [
      `${process.env.PUBLIC_URL}/house.png`, 
      `${process.env.PUBLIC_URL}/employ.png`,
      `${process.env.PUBLIC_URL}/mileage.png`, 
      `${process.env.PUBLIC_URL}/university.png`
    ];
  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // 자동으로 슬라이드를 3초마다 이동
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // 컴포넌트 언마운트 시 interval 클리어
    return () => clearInterval(interval);
  }, []);


  return (
    <div
      style={{
        width: "97.8vw", // 전체 화면 너비
        height: "100vh", // 전체 화면 높이
        backgroundImage: `url(${MainLogo})`, // import한 이미지 경로 사용
        backgroundSize: "cover", // 배경 이미지가 div를 채우도록
        backgroundPosition: "center", // 배경 이미지의 위치를 중앙으로
        backgroundRepeat: "no-repeat", // 배경 이미지가 반복되지 않도록
      }}
    >
      <div>
        <MainHeader />
      </div>

      <div className="w-[70%] h-[70%] ml-[15%] mt-[-2%] flex justify-center items-start font-bold text-sm bg-[#DEDEDE] bg-opacity-50 rounded-[25px] ">
        <div className="w-[610px] h-[50px] text-4xl mt-[3%]">
          <span className="text-[#0051E6]">청년 정책</span>의 모든 것,
          <span className="text-[#D70159]">부산</span>
          에서 한눈에

       


            <div className="relative">
              <input
                type="text"
                placeholder="통합검색"
                className="font-bold text-lg mt-4 rounded-[25px] border-2 w-[500px] h-[50px] ml-[7%] pl-[30px] focus:outline-none"
                value={searchs} // 상태값을 input에 바인딩
                onChange={handleSearchChange} // 검색어 입력 시 상태 업데이트
                onKeyDown={handleKeyDown} // 엔터 키 입력 시 검색 실행
              />

              <div className="cursor-pointer hover:text-gray-400 transition duration-500" onClick={handleSearchClick}>
                <FaSearch className="absolute top-[30px] transform-translate-y-1/2 ml-[82%] text-2xl"/>
              </div>
            </div>
            
            <div className="w-[1170px] h-[380px] ml-[-46%] text-4xl mt-[2%] border-2 bg-white">
                <img
                  src={images[currentImageIndex]}  // 현재 이미지를 표시
                  alt="슬라이드 이미지"
                  className="w-full h-[100%]"  // 이미지 크기 맞추기
                />
            </div>
            
            <div className="w-[951px] h-[80px] ml-[-28%] text-2xl mt-[2%] flex space-x-[49px]">
                <div className="w-[284px] h-[77px] border-2 border-[#5E07F5] text-[#5E07F5]  flex justify-center items-center bg-white rounded-[4px]">청년관</div>
                <div className="w-[284px] h-[77px] border-2 border-[#CF0095] text-[#CF0095] flex justify-center items-center bg-white rounded-[4px]">지역자원관</div>
                <div className="w-[284px] h-[77px] border-2 border-[#34B440] text-[#34B440] flex justify-center items-center bg-white rounded-[4px]">커뮤니티</div>
            </div>
        </div>
      </div>
     

      <div className="mt-[30px]"> 
          <Footer/>
      </div>

    </div>
  );
};

export default MainPage;
