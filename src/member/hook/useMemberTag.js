const useMemberTag = () => {
  const makeBtn = (name, onClick) => {
    return (
      <button
        className="bg-gray-50 w-[100px] h-full border-2 border-gray-300 rounded-full shadow-lg text-xs text-nowrap hover:bg-[#DDDDDD] transition duration-500"
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  const makeBtn2 = (name, onClick) => {
    return (
      <button
        className="w-full p-4 border-2 border-pink-500 rounded-full shadow-lg text-pink-500 hover:bg-pink-500 hover:text-white transition duration-500"
        onClick={onClick}
      >
        {name}
      </button>
    );
  };

  const makeAdd = (label, makeInput) => {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex justify-center items-stretch font-bold space-x-2">
          <div className="w-1/4 p-2 text-nowrap flex justify-start items-center">
            {label}
          </div>
          <div className="w-3/4 flex justify-center items-center">
            {makeInput}
          </div>
        </div>
      </div>
    );
  };

  const makeInput = (type, name, value, hint, ref, onChange, isAuth, style) => {
    return (
      <input
        className={`${
          style ?? "w-full"
        } px-6 py-4 border-2 border-gray-300 rounded-full shadow-lg text-left tracking-widest ${
          isAuth || "bg-gray-300 text-white placeholder-white"
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
        ref={ref}
        onChange={onChange}
        disabled={!isAuth}
      />
    );
  };

  const makeSelect = (name, value, list, hint, ref, onChange, isAuth) => {
    return (
      <select
        className={`w-full p-4 border-2 border-gray-300 rounded-full shadow-lg text-center tracking-widest cursor-pointer ${
          isAuth || "bg-gray-300 text-white placeholder-white"
        }`}
        name={name}
        value={value}
        ref={ref}
        onChange={onChange}
        disabled={!isAuth}
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

  const makeRatio = (value, Icon, text, onClick, isAuth) => {
    return (
      <div
        className={`w-full p-4 border-2 border-gray-300 rounded-full shadow-lg text-center tracking-widest flex justify-center items-center ${
          isAuth
            ? value
              ? "text-black"
              : "text-gray-300 cursor-pointer transition duration-500"
            : "bg-gray-300 text-white"
        }`}
        onClick={isAuth ? onClick : undefined}
      >
        <Icon className="w-6 h-6" />
        <div>{text}</div>
      </div>
    );
  };

  return { makeBtn, makeBtn2, makeAdd, makeInput, makeSelect, makeRatio };
};

export default useMemberTag;
