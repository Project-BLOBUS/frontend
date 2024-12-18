import useMypageTag from "./useMypageTag";

const useInfoTag = () => {
  const { makeBtn2 } = useMypageTag();

  const makeRead = (name, info) => {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-1/3 px-10 py-3 text-left text-nowrap">{name}</div>
        <div className="w-2/3 px-10 py-3 text-right text-nowrap font-normal select-text">
          {info}
        </div>
      </div>
    );
  };

  const makeModify = (name, input, onlyRead) => {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-1/3 px-4 py-2 text-left text-nowrap">{name}</div>
        <div className={`${onlyRead && "p-4"} w-2/3 text-left text-nowrap`}>
          {input}
        </div>
      </div>
    );
  };

  const makeInput = (type, name, value, hint, ref, onChange, style) => {
    return (
      <input
        className={`${
          style ?? "w-full"
        } px-4 py-2 border-2 border-gray-300 rounded-full shadow-lg text-left tracking-wides ${
          name !== "userId" || "bg-gray-300 text-white placeholder-white"
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
        ref={ref}
        onChange={onChange}
        disabled={name === "userId"}
      />
    );
  };

  const makeSelect = (name, value, list, hint, ref, onChange) => {
    return (
      <select
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-full shadow-lg text-center tracking-widest cursor-pointer"
        name={name}
        value={value}
        ref={ref}
        onChange={onChange}
      >
        <option value="" disabled selected>
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
        className={`w-full px-4 py-2 border-2 border-gray-300 rounded-full shadow-lg text-center tracking-widest flex justify-center items-center ${
          value
            ? "text-black"
            : "text-gray-300 cursor-pointer transition duration-500"
        }`}
        onClick={onClick}
      >
        <Icon className="w-6 h-6" />
        <div>{text}</div>
      </div>
    );
  };

  return { makeBtn2, makeRead, makeModify, makeInput, makeSelect, makeRatio };
};

export default useInfoTag;
