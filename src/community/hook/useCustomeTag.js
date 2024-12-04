const useCustomTag = () => {
  const makeBtn = (name, color, onClick) => {
    const bgColor = {
      red: "bg-red-500 hover:bg-red-300",
      orange: "bg-orange-500 hover:bg-orange-300",
      green: "bg-green-500 hover:bg-green-300",
      blue: "bg-blue-500 hover:bg-blue-300",
      pink: "bg-pink-500 hover:bg-pink-300",
    };

    return (
      <button
        className={`${bgColor[color]} w-[60px] h-[40px] p-2 rounded text-base text-center text-white flex justify-center items-center hover:text-black transition duration-500`}
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  return { makeBtn };
};

export default useCustomTag;
