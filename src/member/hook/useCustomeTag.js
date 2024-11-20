const useCustomTag = () => {
  const makeBtn = (name, onClick) => {
    const bgColor = {
      "중복 확인": "bg-red-500 hover:bg-red-300",
      "메일 전송": "bg-green-500 hover:bg-green-300",
      "인증 확인": "bg-blue-500 hover:bg-blue-300",
      "등록 확인": "bg-blue-500 hover:bg-blue-300",
    };

    return (
      <button
        className={`${bgColor[name]} w-1/6 h-full rounded-xl text-xs text-nowrap text-white hover:text-black transition duration-500`}
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  const makeAdd = (label, makeInput) => {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex justify-center items-stretch text-base font-bold">
          <div className="bg-sky-300 w-1/4 p-4 rounded text-nowrap flex justify-center items-center">
            {label}
          </div>
          <div className="w-3/4 ml-2 flex justify-center items-center">
            {makeInput}
          </div>
        </div>
      </div>
    );
  };

  const makeInput = (type, name, value, hint, onChange, isAuth, ref, width) => {
    return (
      <input
        className={`${
          width ?? "w-full"
        } p-4 border border-gray-500 rounded shadow-lg text-left tracking-wider ${
          isAuth || "bg-gray-400 border-none text-white placeholder-gray-300"
        }`}
        type={type}
        name={name}
        value={value ?? ""}
        placeholder={hint}
        minLength={name === "userPw" || name === "confirmPw" ? 8 : undefined}
        maxLength={
          name === "authCode"
            ? 6
            : name === "userPw" || name === "confirmPw"
            ? 16
            : name === "phoneNum"
            ? 11
            : undefined
        }
        autoComplete="off"
        onChange={onChange}
        disabled={!isAuth}
        ref={ref}
      />
    );
  };

  const makeSelect = (
    name,
    value,
    list,
    hint,
    onChange,
    isAuth,
    ref,
    width
  ) => {
    return (
      <select
        className={`${
          width ?? "w-full"
        } p-4 border border-gray-500 rounded shadow-lg text-center ${
          isAuth || "bg-gray-500 border-none text-gray-300"
        }`}
        name={name}
        value={value}
        onChange={onChange}
        disabled={!isAuth}
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
          <option key={data.key ?? data} value={data.name ?? data}>
            {data.name ?? data}
          </option>
        ))}
      </select>
    );
  };

  const makeRatio = (value, Icon, text, onClick, isAuth, width) => {
    return (
      <div
        className={`${
          width ?? "w-full"
        } p-4 border border-gray-500 rounded shadow-lg flex justify-center items-center space-x-4 ${
          isAuth
            ? value
              ? "text-black"
              : "text-gray-300 cursor-pointer hover:bg-sky-500 hover:text-white transition duration-500"
            : "bg-gray-400 border-none text-gray-300"
        }`}
        onClick={isAuth ? onClick : undefined}
      >
        <Icon className="w-6 h-6" />
        <div>{text}</div>
      </div>
    );
  };

  return { makeBtn, makeAdd, makeInput, makeSelect, makeRatio };
};

export default useCustomTag;
