import { useEffect, useState } from "react";
import Loading from "../../etc/Loading";

const Bookmark = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="w-full text-xl text-center font-bold flex flex-col justify-center items-center">
        <div className="w-full py-4 border-b-4 border-gray-500 text-3xl text-left flex justify-between items-center">
          즐겨찾기
        </div>
      </div>
    </>
  );
};

export default Bookmark;
