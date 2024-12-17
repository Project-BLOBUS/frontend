import { Outlet } from "react-router";
import Header from "../../main/Header";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Footer from "../../main/Footer";

const Community = () => {
  return (
    <div className="h-screen">
      <Header pageTitle="커뮤니티" titleBg="#DB0153" />

      <div className="min-h-[calc(100%-90px-141px)] mt-[-60px] mx-[15%] flex justify-center items-start">
        <Outlet />
      </div>

      <Footer />

      {/* <div className="text-base font-bold flex flex-col justify-center items-center space-y-4 fixed bottom-[7.5%] right-[7.5%]">
        <button
          className="bg-yellow-300 p-4 rounded-full hover:bg-yellow-500 hover:text-white transition duration-500"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </button>
        <button
          className="bg-yellow-300 p-4 rounded-full hover:bg-yellow-500 hover:text-white transition duration-500"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          <FaArrowDown />
        </button>
      </div> */}
    </div>
  );
};

export default Community;
