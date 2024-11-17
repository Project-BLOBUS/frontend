import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="bg-black bg-opacity-50 flex flex-col justify-center items-center fixed inset-0 z-50">
      <FaSpinner className="text-9xl text-orange-300 animate-spin" />
      <div className="text-9xl text-orange-300 font-extrabold ">Loading...</div>
    </div>
  );
};

export default Loading;
