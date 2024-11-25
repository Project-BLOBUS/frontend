import React, { useEffect, useState } from "react";
import InfoListComponent from "../components/InfoListComponent";

const InfoListPage = () => {
  // ***************************** 화면 로딩시 초기값 설정 *****************************
  // 1.검색어입력 초기값
  const [searchKeyword, setSearchKeyword] = useState("");
  // 2.지역 초기값
  const [selectedRegion, setSelectedRegion] = useState({
    city: "부산", // 시는 "부산"으로 고정
    district: "전체", // 기본값은 "전체"
  });
  // 3.직종직무 초기값
  const [selectedJob, setSelectedJob] = useState({
    category1: "",
    category2: "",
    category3: "",
  });
  // 4.선택키워드 초기값
  const [keywords, setKeywords] = useState([
    { label: "행정구역", value: "부산시 전체" }, // 초기값 추가
  ]);

  // 5.지역구 데이터
  const district = [
    "전체",
    "강서구",
    "금정구",
    "기장군",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
  ];

  // 6. 직종직무 데이터
  const jobCategories = {
    전체보기: {},
    "IT/개발": {
      전체: [],
      프론트엔드: ["전체", "React", "Vue"],
      백엔드: ["전체", "Node.js", "Spring"],
    },
    디자인: {
      전체: [],
      "UI/UX 디자인": ["전체", "Figma", "Sketch"],
      "그래픽 디자인": ["전체", "Photoshop", "Illustrator"],
    },
  };
  // ***********************************************************************************

  useEffect(() => {
    // // keywords 배열을 반복하여 "행정구역"이라는 label이 있는지 확인
    // const hasRegionLabel = keywords.some(
    //   (keyword) => keyword.label === "행정구역"
    // );

    // // "행정구역" label이 없는 경우 추가
    // if (!hasRegionLabel) {
    //   addKeyword("행정구역", "부산시 전체");
    // }

    // keywords 배열을 반복하여 "행정구역"이라는 label이 있는지 확인
    if (!keywords.some((keyword) => keyword.label === "행정구역")) {
      // "행정구역" label이 없는 경우 추가
      addKeyword("행정구역", "부산시 전체");
    }
  }, [keywords]);

  // 키워드추가
  // const addKeyword = (label, value) => {
  //   if (
  //     value &&
  //     !keywords.some((k) => k.label === label && k.value === value)
  //   ) {
  //     setKeywords([...keywords, { label, value }]);
  //   }
  // };

  // // 키워드삭제
  // const removeKeyword = (index) => {
  //   setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  // };

  // 키워드 추가
  const addKeyword = (label, value) => {
    if (!keywords.some((k) => k.label === label && k.value === value)) {
      setKeywords([...keywords, { label, value }]);
    }
  };

  // 키워드삭제
  const removeKeyword = (index) => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  // 키워드 삭제
  // const removeKeywordValue = (label, value) => {
  //   setKeywords((prevKeywords) =>
  //     prevKeywords.filter((k) => k.label !== label)
  //   );
  // };

  // ***************************** 이벤트 영역 *****************************
  // [초기화] 버튼 클릭시 실행이벤트
  const resetFilters = () => {
    setSearchKeyword("");
    setSelectedRegion({ city: "부산", district: "전체" });
    setSelectedJob({ category1: "", category2: "", category3: "" });
    setKeywords([{ label: "행정구역", value: "부산시 전체" }]);
  };

  // [검색] 버튼 클릭시 실행이벤트
  const handleSearch = () => {
    console.log("검색 실행:", { searchKeyword, selectedRegion, selectedJob });
  };

  // [지역] Select 옵션선택 이벤트
  const handleRegionChange = (e) => {
    const selectedDistrict = e.target.value;

    setSelectedRegion((prev) => {
      const updatedRegion = {
        ...prev,
        district: selectedDistrict,
      };

      setKeywords((prevKeywords) => {
        let updatedKeywords = [...prevKeywords];

        if (selectedDistrict === "전체") {
          // "부산시 전체" 관련 키워드 삭제
          updatedKeywords = updatedKeywords.filter(
            (keyword) => keyword.label !== "행정구역"
          );

          // "부산시 전체" 추가 (중복 방지)
          if (
            !updatedKeywords.some((keyword) => keyword.value === "부산시 전체")
          ) {
            updatedKeywords.push({ label: "행정구역", value: "부산시 전체" });
          }
        } else {
          // "부산시 전체" 키워드 삭제
          updatedKeywords = updatedKeywords.filter(
            (keyword) => keyword.value !== "부산시 전체"
          );

          // 선택된 구/군에 대한 키워드 추가
          if (
            !updatedKeywords.some(
              (keyword) => keyword.value === `부산시 > ${selectedDistrict}`
            )
          ) {
            updatedKeywords.push({
              label: "행정구역",
              value: `부산시 > ${selectedDistrict}`,
            });
          }
        }

        return updatedKeywords;
      });

      return updatedRegion;
    });
  };

  // [직종·직무 선택] Select 옵션선택 이벤트
  // // 1차 분류 변경 이벤트
  // const handleCategory1Change = (e) => {
  //   const value = e.target.value;
  //   console.log(e);
  //   console.log(e.target);
  //   console.log(e.target.value);

  //   if (value === "전체보기") {
  //     // 1차 > 전체보기: 관련 키워드 모두 제거 후 기본 키워드 추가
  //     setKeywords((prev) =>
  //       prev
  //         .filter((k) => k.label !== "직종·직무")
  //         .concat({
  //           label: "직종·직무",
  //           value: "직종전체",
  //         })
  //     );
  //     setSelectedJob({ category1: "", category2: "", category3: "" });
  //   } else {
  //     console.log("keywords", keywords);
  //     // 1차 > 특정 선택: 기본 키워드 추가
  //     removeKeywordValue("직종·직무", "직종전체");
  //     addKeyword("직종·직무", `${value} > 전체`);
  //     // setKeywords((prev) =>
  //     //   prev
  //     //     .filter((k) => k.label !== "직종·직무")
  //     //     .concat({
  //     //       label: "직종·직무",
  //     //       value: `${value} > 전체`,
  //     //     })
  //     // );
  //     setSelectedJob({ category1: value, category2: "", category3: "" });
  //   }
  // };

  // // 2차 분류 변경 이벤트
  // const handleCategory2Change = (e) => {
  //   const value = e.target.value;

  //   if (value === "전체보기") {
  //     // 2차 > 전체보기 선택 시 기존 키워드 유지
  //     setSelectedJob((prev) => ({ ...prev, category2: value, category3: "" }));
  //   } else {
  //     // 2차 > 특정 선택 시 상위 전체 키워드 제거 및 새로운 키워드 추가
  //     const category1 = selectedJob.category1;
  //     removeKeywordValue("직종·직무", `${category1} > 전체`);
  //     setKeywords((prev) =>
  //       prev
  //         .filter((k) => k.label !== "직종·직무")
  //         .concat({
  //           label: "직종·직무",
  //           value: `${category1} > ${value}`,
  //         })
  //     );
  //     setSelectedJob((prev) => ({ ...prev, category2: value, category3: "" }));
  //   }
  // };

  // // 3차 분류 변경 이벤트
  // const handleCategory3Change = (e) => {
  //   const value = e.target.value;

  //   if (value === "전체보기") {
  //     // 3차 > 전체보기 선택 시 기존 키워드 유지
  //     setSelectedJob((prev) => ({ ...prev, category3: value }));
  //   } else {
  //     // 3차 > 특정 선택 시 상위 키워드 제거 및 새로운 키워드 추가
  //     const category1 = selectedJob.category1;
  //     const category2 = selectedJob.category2;
  //     removeKeywordValue("직종·직무", `${category1} > ${category2}`);
  //     setKeywords((prev) =>
  //       prev
  //         .filter((k) => k.label !== "직종·직무")
  //         .concat({
  //           label: "직종·직무",
  //           value: `${category1} > ${category2} > ${value}`,
  //         })
  //     );
  //     setSelectedJob((prev) => ({ ...prev, category3: value }));
  //   }
  // };
  const handleCategory1Change = (e) => {
    const value = e.target.value;

    if (value === "전체보기") {
      setKeywords((prev) =>
        prev
          .filter((k) => k.label !== "직종·직무")
          .concat({
            label: "직종·직무",
            value: "직종전체",
          })
      );
    } else {
      setKeywords((prev) => {
        // 1. prev 배열에서 "직종전체" 또는 중복 데이터를 포함한 항목을 제외합니다.
        const filteredKeywords = prev.filter((k) => {
          return !(
            k.value.includes("직종전체") || k.value.includes(`${value} > 전체`)
          );
        });

        // 2. filteredKeywords 배열에 새로운 항목을 추가합니다.
        filteredKeywords.push({
          label: "직종·직무",
          value: `${value} > 전체`,
        });

        // 3. 업데이트된 filteredKeywords 배열을 반환하여 setKeywords가 상태를 변경하도록 합니다.
        return filteredKeywords;
      });
    }
    setSelectedJob({ category1: value, category2: "전체", category3: "" });
  };

  const handleCategory2Change = (e) => {
    const value = e.target.value;
    const category1 = selectedJob.category1;
    let filteredKeywords = null;
    if (value === "전체") {
      // setSelectedJob((prev) => ({ ...prev, category2: value, category3: "" }));
      setKeywords((prev) => {
        // 1. prev 배열에서 동일카테고리의 1차분류 선택 데이터를 포함한 항목을 제외합니다.
        filteredKeywords = prev.filter((k) => {
          return !k.value.includes(category1);
        });

        // 2. filteredKeywords 배열에 새로운 항목을 추가합니다.
        filteredKeywords.push({
          label: "직종·직무",
          value: `${category1} > ${value}`,
        });
        setSelectedJob((prev) => ({
          ...prev,
          category2: value,
          category3: "",
        }));
        // 3. 업데이트된 filteredKeywords 배열을 반환하여 setKeywords가 상태를 변경하도록 합니다.
        return filteredKeywords;
      });
    } else {
      // const category1 = selectedJob.category1;
      // addKeyword("직종·직무", `${category1} > ${value}`);
      // setSelectedJob((prev) => ({ ...prev, category2: value, category3: "" }));

      setKeywords((prev) => {
        // 1. prev 배열에서 "직종전체" 또는 중복 데이터를 포함한 항목을 제외합니다.
        filteredKeywords = prev.filter((k) => {
          return !(
            k.value.includes(`${category1} > 전체`) ||
            k.value.includes(`${category1} > ${value}`)
          );
        });

        // 2. filteredKeywords 배열에 새로운 항목을 추가합니다.
        filteredKeywords.push({
          label: "직종·직무",
          value: `${category1} > ${value} > 전체`,
        });
        setSelectedJob((prev) => ({
          ...prev,
          category2: value,
          category3: "전체",
        }));

        // 3. 업데이트된 filteredKeywords 배열을 반환하여 setKeywords가 상태를 변경하도록 합니다.
        return filteredKeywords;
      });
    }
    setSelectedJob((prev) => ({
      ...prev,
      category2: value,
      category3: "전체",
    }));
  };

  const handleCategory3Change = (e) => {
    // const value = e.target.value;

    // if (value === "전체보기") {
    //   setSelectedJob((prev) => ({ ...prev, category3: value }));
    // } else {
    //   const category1 = selectedJob.category1;
    //   const category2 = selectedJob.category2;
    //   setKeywords((prev) => {
    //     const filteredKeywords = prev.filter((k) => {
    //       return !(k.value.includes(category2) || k.value.includes("전체"));
    //     });

    //     filteredKeywords.push({
    //       label: "직종·직무",
    //       value: `${category1} > ${category2} > ${value}`,
    //     });

    //     return filteredKeywords;
    //   });

    //   setSelectedJob((prev) => ({ ...prev, category3: value }));
    // }
    const value = e.target.value;
    const category1 = selectedJob.category1;
    const category2 = selectedJob.category2;
    let filteredKeywords = null;

    if (value === "전체") {
      setKeywords((prev) => {
        console.log(prev);
        console.log(category2);
        // 1. prev 배열에서 동일카테고리의 1차분류 선택 데이터를 포함한 항목을 제외합니다.
        filteredKeywords = prev.filter((k) => {
          return !k.value.includes(`${category2}`);
        });

        // 2. filteredKeywords 배열에 새로운 항목을 추가합니다.
        filteredKeywords.push({
          label: "직종·직무",
          value: `${category1} > ${category2} > ${value}`,
        });
        setSelectedJob((prev) => ({
          ...prev,
          category3: value,
        }));
        // 3. 업데이트된 filteredKeywords 배열을 반환하여 setKeywords가 상태를 변경하도록 합니다.
        return filteredKeywords;
      });
    } else {
      // const category1 = selectedJob.category1;
      // addKeyword("직종·직무", `${category1} > ${value}`);
      // setSelectedJob((prev) => ({ ...prev, category2: value, category3: "" }));

      setKeywords((prev) => {
        // 1. prev 배열에서 중복 데이터를 포함한 항목을 제외합니다.
        filteredKeywords = prev.filter((k) => {
          return !k.value.includes(`${category2} > 전체`);
        });

        // 2. filteredKeywords 배열에 새로운 항목을 추가합니다.
        filteredKeywords.push({
          label: "직종·직무",
          value: `${category1} > ${category2} > ${value}`,
        });
        setSelectedJob((prev) => ({
          ...prev,
          category3: value,
        }));

        // 3. 업데이트된 filteredKeywords 배열을 반환하여 setKeywords가 상태를 변경하도록 합니다.
        return filteredKeywords;
      });
    }
  };

  // ***********************************************************************************

  return (
    <>
      <div>
        <div className="border-2 border-gray-200 rounded-md p-4 bg-white mb-5">
          {/* 검색어 입력 */}
          <div className="flex items-center space-x-4 mb-4">
            <p className="w-32 text-base font-semibold text-gray-700">
              검색어 입력
            </p>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="h-10 flex-grow border border-gray-300 p-2 text-sm bg-inherit focus:outline-none rounded-md"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value); // 텍스트 입력 상태만 업데이트
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchKeyword.trim() !== "") {
                  addKeyword("검색어", searchKeyword.trim()); // 키워드 추가
                  setSearchKeyword(""); // 입력창 초기화
                  e.preventDefault(); // 기본 Enter 동작(폼 제출 등) 방지
                }
              }}
            />
          </div>

          {/* 지역 선택 */}
          <div className="flex items-center space-x-4 mb-4">
            <p className="w-32 text-base font-semibold text-gray-700">지역</p>
            <div className="flex flex-grow space-x-4">
              <select
                className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                value={selectedRegion.city}
                readOnly
              >
                <option>부산</option>
              </select>
              <select
                className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                value={selectedRegion.district}
                onChange={handleRegionChange}
              >
                {district.map((districtName, index) => (
                  <option key={index} value={districtName}>
                    {districtName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 직종·직무 선택 */}
          {/* <div className="flex items-center space-x-4">
            <p className="w-32 text-base font-semibold text-gray-700">
              직종·직무선택
            </p>
            <div className="flex flex-grow space-x-4">
              <select
                className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                value={selectedJob.category1}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedJob({
                    category1: value,
                    category2: "",
                    category3: "",
                  });
                  addKeyword("1차 분류", value);
                }}
              >
                <option>1차분류</option>
                {Object.keys(jobCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                value={selectedJob.category2}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedJob((prev) => ({
                    ...prev,
                    category2: value,
                    category3: "",
                  }));
                  addKeyword("2차 분류", value);
                }}
              >
                <option>2차분류</option>
                {selectedJob.category1 &&
                  Object.keys(jobCategories[selectedJob.category1] || {}).map(
                    (subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    )
                  )}
              </select>
              <select
                className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                value={selectedJob.category3}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedJob((prev) => ({ ...prev, category3: value }));
                  addKeyword("3차 분류", value);
                }}
              >
                <option>3차분류</option>
                {selectedJob.category2 &&
                  (
                    jobCategories[selectedJob.category1]?.[
                      selectedJob.category2
                    ] || []
                  ).map((subSubCategory) => (
                    <option key={subSubCategory} value={subSubCategory}>
                      {subSubCategory}
                    </option>
                  ))}
              </select>
            </div>
          </div> */}
          {/* 직종·직무 선택 ver2 */}
          <div>
            <div className="flex items-center space-x-4">
              <p className="w-32 text-base font-semibold text-gray-700">
                직종·직무선택
              </p>
              <div className="flex flex-grow space-x-4">
                <select
                  className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                  value={selectedJob.category1}
                  onChange={handleCategory1Change}
                >
                  <option>1차분류</option>
                  {Object.keys(jobCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                  value={selectedJob.category2}
                  onChange={handleCategory2Change}
                >
                  <option>2차분류</option>
                  {selectedJob.category1 &&
                    Object.keys(jobCategories[selectedJob.category1] || {}).map(
                      (subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      )
                    )}
                </select>
                <select
                  className="flex-grow h-10 border border-gray-300 rounded-md p-2 text-sm focus:outline-none"
                  value={selectedJob.category3}
                  onChange={handleCategory3Change}
                >
                  <option>3차분류</option>
                  {selectedJob.category2 &&
                    (
                      jobCategories[selectedJob.category1]?.[
                        selectedJob.category2
                      ] || []
                    ).map((subSubCategory) => (
                      <option key={subSubCategory} value={subSubCategory}>
                        {subSubCategory}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 선택 키워드 */}
        <div className="border-2 border-gray-200 rounded-md p-4 bg-white mb-5">
          <div className="flex space-x-4">
            <p className="w-32 text-base font-semibold text-gray-700">
              선택 키워드
            </p>
            <div className="flex flex-grow space-x-4">
              <div className="flex-grow h-24 border border-gray-300 rounded-sm p-2 text-sm focus:outline-none flex-wrap overflow-y-scroll box-size">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block m-1 bg-gray-200 p-1 rounded-md"
                  >
                    {keyword.label}: {keyword.value}
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-col space-y-3">
                <button
                  className="w-24 py-2 bg-white text-gray-600 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors duration-500"
                  onClick={resetFilters}
                >
                  초기화
                </button>
                <button
                  className="w-24 py-2 bg-[#6F00FF] text-white rounded-md hover:bg-[#420099] transition-colors duration-500"
                  onClick={handleSearch}
                >
                  검색
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 검색건수 및 결과 */}
        <div className="text-xl font-bold mb-3">
          검색건수 <span className="text-2xl text-[#6F00FF]">123,456</span> 건
        </div>
        <div className="grid grid-cols-1">
          <InfoListComponent />
        </div>
      </div>
    </>
  );
};

export default InfoListPage;
