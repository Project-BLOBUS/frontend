import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";
import { checkBookmark, changeBookmark } from "../../api/mypageAPI";
import Loading from "../../../etc/component/Loading";
import { getCookie } from "../../../etc/util/cookieUtil";

const BookBtn = ({ main, sub, targetId }) => {
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setLoading(true);

    checkBookmark(main, sub, targetId)
      .then((data) => setCheck(data))
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("서버연결에 실패했습니다.", { toastId: "e" });
        } else {
          toast.error("즐겨찾기에 실패했습니다.", { toastId: "e" });
        }
      });

    setLoading(false);
  }, [main, sub, targetId, check]);

  return (
    <>
      {loading && <Loading />}
      {getCookie("userRole") === "GENERAL" && (
        <button
          className={`p-2 text-2xl transition duration-500 ${
            check ? "text-yellow-500" : "text-gray-500"
          }`}
          onClick={() => {
            setLoading(true);

            changeBookmark(main, sub, targetId)
              .then((data) => {
                if (data.error) {
                  toast.error("즐겨찾기에 실패했습니다.", { toastId: "e" });
                } else {
                  setCheck(!check);
                }
              })
              .catch((error) => {
                if (error.code === "ERR_NETWORK") {
                  toast.error("서버연결에 실패했습니다.", { toastId: "e" });
                } else {
                  toast.error("즐겨찾기에 실패했습니다.", { toastId: "e" });
                }
              });

            setLoading(false);
          }}
        >
          {check ? <FaStar /> : <FaRegStar />}
        </button>
      )}
    </>
  );
};

export default BookBtn;
