const TermsList = () => {
  return [
    {
      title: "BLOBUS 이용약관",
      content: layout(content1),
      required: true,
    },
    {
      title: "개인정보 수집 및 이용 동의",
      content: "",
      required: true,
    },
    {
      title: "마케팅 정보 수신 동의",
      content: "",
      required: false,
    },
  ];
};

const layout = (content) => {
  const articleList = content().article;

  return (
    <div className="h-80 m-4 p-4 border border-gray-500 rounded text-base flex flex-col justify-start items-start space-y-4 overflow-y-scroll">
      {articleList.map((article, index) => (
        <div key={index}>
          <div className="mb-1 font-bold select-text">{article}</div>
          <div className="ml-2 text-xs flex flex-col justify-center items-start space-y-1">
            {content()[article.replace(/ /g, "").split("(")[0]].map(
              (text, i) => (
                <span key={i} className="select-text">
                  {text}
                </span>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const content1 = () => {
  return {
    article: [
      "제 1조 (목적)",
      "제 2조 (정의)",
      "제 3조 (서비스의 제공)",
      "제 4조",
      "제 5조",
    ],
    제1조: [
      '본 약관은 BLOBUS 서비스(이하 "서비스"라 합니다)의 이용 조건 및 절차,',
      "기타 필요한 사항을 규정하는 것을 목적으로 합니다.",
    ],
    제2조: [
      '1. "회원"이란 서비스를 제공받기 위해 가입한 자를 의미합니다.',
      '2. "운영자"란 서비스를 관리 및 운영하는 책임자를 의미합니다',
    ],
    제3조: [
      "회사는 본 약관에 따라 회원에게 서비스를 제공합니다.",
      "서비스의 구체적인 내용은 회사가 별도로 정합니다.",
    ],
    제4조: ["내용 추가 예정입니다."],
    제5조: ["내용 추가 예정입니다."],
  };
};

export default TermsList;
