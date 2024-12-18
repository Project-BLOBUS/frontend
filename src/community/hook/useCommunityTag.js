const useCommunityTag = () => {
  const makeBtn = (name, onClick) => {
    return (
      <button
        className="bg-[#DB0153] w-24 py-2 rounded text-base text-nowrap text-white hover:bg-[#B50044] transition duration-500"
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  const makeTab = (name, value, filter, setFilter, isType, moveToList) => {
    return (
      <div
        className={`w-20 p-2 border-2 rounded-full ${
          (isType ? value === filter.type : value === filter.category)
            ? "border-[#DB0153]"
            : "border-gray-300 cursor-pointer hover:border-[#DB0153] transition duration-500"
        }`}
        onClick={() => {
          isType
            ? value === filter.type
              ? setFilter({ ...filter, type: "" })
              : setFilter({ ...filter, type: value })
            : value === filter.category
            ? setFilter({ ...filter, category: "" })
            : setFilter({ ...filter, category: value });
          moveToList({ page: 1, size: 10 });
        }}
      >
        {name}
      </div>
    );
  };

  return { makeBtn, makeTab };
};

export default useCommunityTag;
