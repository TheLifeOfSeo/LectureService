const PORT = 8000;
const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const path = require("path");
const sass = require("sass");
const mysql = require("mysql");
const ejs = require("ejs");
const fastcsv = require("fast-csv");
<<<<<<< HEAD
const { response } = require("express");
=======
const { response } = require('express');

let server = http.createServer(app)
let viewsRootPath = path.join(__dirname, "views")
let staticRootPath = path.join(__dirname, "statics")
let cssRootPath = path.join(staticRootPath, "css")
let sassRootPath = path.join(staticRootPath, "scss")
let dataRootPath = path.join(__dirname, "datas")
>>>>>>> f1d9d1520333de7d1fc7b1905273c90c966ea7eb

let server = http.createServer(app);
let viewsRootPath = path.join(__dirname, "views");
let staticRootPath = path.join(__dirname, "statics");
let cssRootPath = path.join(staticRootPath, "css");
let sassRootPath = path.join(staticRootPath, "scss");
let dataRootPath = path.join(__dirname, "datas");

//강의구분,수강학년,과목코드,과목명,교수명,수업시간,학점,단과대학,학과,수강인원,수강정원,강의평점
let stream = fs.createReadStream(dataRootPath + "/lecturelist_select.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
        csvData.push(data);
    })
    .on("end", function() {
        // remove the first line: header
        csvData.shift();
        // connect to the MySQL database
        // save csvData
        connection.connect((error) => {
            if (error) {
                console.error(error);
            } else {
                let query =
                    "INSERT INTO lecture (전공구분,학년,id,과목명,교수명,수업시간,학점,단과대학,학과,수강인원,수강정원,강의평점) VALUES ? ;";
                connection.query(query, [csvData], (error, response) => {
                    console.log(error);
                });
            }
        });
    });
stream.pipe(csvStream);
//1. sql 모듈 통해서 MySQL에 저장되어있는 뽑아올 수 있음
//2. 셀렉트박스로 학과 선택시 -> MySQL에서 특정 학과 값 가진 Row만 출력
//3. 강의 평가수, 강의 점수 따라

const style = sass.compile(sassRootPath + "/style.scss");
fs.writeFileSync(cssRootPath + "/style.css", style.css, "utf-8");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "kmckshkmc",
    database: "lectureservice",
});

// const STATS = connection.query('SELECT * FROM lecture');

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("statics"));

// app.use(sass.render({
//     src: sassRootPath,
//     dest: cssRootPath,
//     outputStyle: "compact",
//     debug: true,
//     force: true,
//     indentedSyntax: false,
// }))

app.get("/", function(req, res) {
    let arr = new Array();

    connection.query("SELECT * FROM lecture", function(error, results) {
        res.render("main.ejs", { arr: results });
    });
});

app.get("/", function(req, res) {
    let arr = new Array();
    let major = ["학과"];
    major[1] = ["경영대학", "경영정보학과", "경영학부", " 국제경영학과"];
    major[2] = [
        "공과대학",
        "건축공학과",
        "건축학과",
        "공업화학과",
        "기계공학부",
        "도시공학과",
        "신소재공학과",
        "안전공학과",
        "테크노산업공학과",
        "토목공학부",
        "화학공학과",
        "환경공학과",
    ];
    major[3] = [
        "농업생명환경대학",
        "농업경제학과",
        "목재종이과학과",
        "바이오시스템공학과",
        "산림학과",
        "식물의학과",
        "식물자원학과",
        "식품생명공학과",
        "원예과학과",
        "지역건설공학과",
        "축산학과",
        "특용식물학과",
        "환경생명화학과",
    ];
    major[4] = [
        "바이오헬스공유대학",
        "방사광융합학과",
        "제약바이오학과",
        "천연물소재학과",
        "화장품산업학과",
    ];
    major[5] = [
        "사범대학",
        "교육학과",
        "국어교육과",
        "물리교육과",
        "사회교육과",
        "생물교육과",
        "수학교육과",
        "역사교육과",
        "영어교육과",
        "윤리교육과",
        "지구과학교육과",
        "지리교육과",
        "체육교육과",
        "화학교육과",
    ];
    major[6] = [
        "사회과학대학",
        "경제학과",
        "사회학과",
        "심리학과",
        "정치외교학과",
        "행정학과",
    ];
    major[7] = [
        "생활과학대학",
        "소비자학과",
        "식품영양학과",
        "아동복지학과",
        "의류학과",
        "주거환경학과",
    ];
    major[8] = ["수의과대학", "수의예과", "수의학과"];
    major[9] = ["약학대학", "약학과", "제약학과"];
    major[10] = [
        "연계전공",
        "공통과학교육전공",
        "통합과학교육전공",
        "통합사회교육전공",
    ];
    major[11] = [
        "융합전공",
        "과학커뮤니케이션",
        "국제개발협력과거버넌스",
        "노인복지",
        "농촌관광개발",
        "문화유산의공간정보학",
        "문화콘텐츠",
        "박물관전문인력",
        "번역출판전공",
        "벤처비즈니스전공",
        "보안컨설팅전공",
        "빅데이터",
        "사회적기업",
        "스마트자동차공학",
        "언론정보전공",
        "영한통역",
        "위기관리",
        "해외농업개발ㆍ협력전공",
        "지식재산스마트융합",
    ];
    major[12] = ["융합학과군", "디자인학과", "조형예술학과"];
    major[13] = ["의과대학", "간호학과", "의예과", "의학과"];
    major[14] = [
        "인문대학",
        "고고미술사학과",
        "국어국문학과",
        "독일언어문화학과",
        "러시아언어문화학과",
        "사학과",
        "영어영문학과",
        "중어중문학과",
        "철학과",
        "프랑스언어문화학과",
    ];
    major[15] = [
        "자연과학대학",
        "물리학과",
        "미생물학과",
        "생명과학과",
        "생화학과",
        "수학과",
        "정보통계학과",
        "지구환경과학과",
        "천문우주학과",
        "화학과",
    ];
    major[16] = [
        "전자정보대학",
        "SW융합부전공",
        "소프트웨어학과",
        "소프트웨어학부",
        "전기공학부",
        "전자공학부",
        "정보통신공학부",
        "지능로봇공학과",
        "컴퓨터공학과",
    ];

    connection.query("SELECT * FROM lecture", function(error, results) {
        let i = 1;
        res.render("main.ejs", { arr: results, major: major, i });
    });
});

app.get("/stats/:id", function(req, res) {
    let target = new Array();
    connection.query(
        "SELECT * FROM lecture WHERE id = ?",
        req.params.id,
        function(error, results) {
            res.render("stat.ejs", { target: results[0] });
            return;
        }
    );
});

server.listen(PORT, () => {
    console.log(`server listening on port : ${PORT}`);
});