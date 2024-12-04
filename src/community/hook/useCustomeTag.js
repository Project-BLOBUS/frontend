const useCustomTag = () => {
  const makeBtn = (name, color, onClick) => {
    const bgColor = {
      none: "bg-none text-black hover:bg-gray-500 hover:text-gray-300",
      red: "bg-red-500 text-white hover:bg-red-300",
      orange: "bg-orange-500 text-white hover:bg-orange-300",
      green: "bg-green-500 text-white hover:bg-green-300",
      blue: "bg-blue-500 text-white hover:bg-blue-300",
      pink: "bg-pink-500 text-white hover:bg-pink-300",
    };

    return (
      <button
        className={`${bgColor[color]} w-[60px] h-[40px] p-2 rounded text-base text-center flex justify-center items-center hover:text-black transition duration-500`}
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  return { makeBtn };
};

export default useCustomTag;
