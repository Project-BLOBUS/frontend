const useInfoTag = () => {
  const makeRead = (name, info) => {
    return (
      <div className="w-full text-base flex justify-center items-center">
        <div className="bg-gray-200 w-1/4 p-4 border-b-2 border-gray-300 text-nowrap">
          {name}
        </div>
        <div className="w-3/4 p-4 border-b-2 border-gray-300 text-left text-nowrap select-text">
          {info}
        </div>
      </div>
    );
  };

  const makeModify = (name, input, onlyRead) => {
    return (
      <div className="w-full text-base flex justify-center items-center">
        <div className="bg-gray-200 w-1/4 p-4 border-b-2 border-gray-300 text-nowrap">
          {name}
        </div>
        <div
          className={`${
            onlyRead && "p-4"
          } w-3/4 border-b-2 border-gray-300 text-left text-nowrap`}
        >
          {input}
        </div>
      </div>
    );
  };

  const makeInput = (type, name, value, hint, onChange, ref, width) => {
    return (
      <input
        className={`${width ?? "w-full"} p-4 text-left tracking-widest ${
          name !== "userId" || "bg-gray-400 text-white placeholder-gray-300"
        }`}
        type={type}
        name={name}
        value={value ?? ""}
        placeholder={hint}
        minLength={name === "userPw" || name === "confirmPw" ? 8 : undefined}
        maxLength={
          name === "userPw" || name === "confirmPw"
            ? 16
            : name === "phoneNum"
            ? 11
            : undefined
        }
        autoComplete="off"
        onChange={onChange}
        disabled={name === "userId"}
        ref={ref}
      />
    );
  };

  const makeSelect = (name, value, list, hint, onChange, ref) => {
    return (
      <select
        className="w-full p-4 text-center"
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
      >
        <option
          className="bg-sky-500 text-white font-bold"
          value=""
          disabled
          selected
        >
          {hint}
        </option>
        {list.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    );
  };

  const makeRatio = (value, Icon, text, onClick) => {
    return (
      <div
        className={`w-full p-4 flex justify-center items-center space-x-4 ${
          value
            ? "text-black"
            : "text-gray-300 cursor-pointer hover:bg-sky-500 hover:text-white transition duration-500"
        }`}
        onClick={onClick}
      >
        <Icon className="w-6 h-6" />
        <div>{text}</div>
      </div>
    );
  };

  return { makeRead, makeModify, makeInput, makeSelect, makeRatio };
};

export default useInfoTag;
