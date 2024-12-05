const fs = require("fs"); // 파일 시스템 모듈
const convert = require("xml-js"); // XML → JSON 변환 라이브러리

// XML 파일 읽기
const xmlFilePath = "../Response-dan.xml"; // XML 파일 경로
const xmlData = fs.readFileSync(xmlFilePath, "utf8"); // XML 파일 읽기

// XML → JSON 변환
const jsonData = JSON.parse(
  convert.xml2json(xmlData, { compact: true, spaces: 2 })
);

// JSON 데이터 수정 (예: numOfRows 값을 200으로 변경)
jsonData.response.numOfRows = "200";

// JSON 파일 저장
const jsonFilePath = "./response-dan.json"; // 저장할 JSON 파일 경로
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8");

console.log("XML 데이터를 JSON으로 변환하고 수정 후 저장했습니다.");
console.log("변환된 JSON 데이터:", jsonData);
