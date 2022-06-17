const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const path = require("path");
const sass = require("sass");
const mysql = require("mysql");
const ejs = require("ejs");
const fastcsv = require("fast-csv");
const { response } = require("express");

let server = http.createServer(app);
let viewsRootPath = path.join(__dirname, "views");
let staticRootPath = path.join(__dirname, "statics");
let cssRootPath = path.join(staticRootPath, "css");
let sassRootPath = path.join(staticRootPath, "scss");
let dataRootPath = path.join(__dirname, "datas");

let majorKey;
let majorValue;
let majorDetailKey;
let majorDetailValue;
let ageKey;
let ageValue;

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
                connection.query(query, [csvData], (error, response) => {});
            }
        });
    });

// 전공: 강의구분,수강학년,과목코드,과목명,교수명,수업시간,학점,단과대학,학과,수강인원,수강정원,강의평점
// 교양: 강의구분,수강학년,과목코드,과목명,교수명,수업시간,학점,,,수강인원,수강정원,강의평점


stream.pipe(csvStream);

//1. sql 모듈 통해서 MySQL에 저장되어있는 뽑아올 수 있음
//2. 셀렉트박스로 학과 선택시 -> MySQL에서 특정 학과 값 가진 Row만 출력
//3. 강의 평가수, 강의 점수 따라

const style = sass.compile(sassRootPath + "/style.scss");
fs.writeFileSync(cssRootPath + "/style.css", style.css, "utf-8");

let connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "2580",
    database: "Service",
});


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("statics"));

app.get("/", function(req, res) {
    connection.query("SELECT * FROM lecture", function(error, results) {
        res.render("main.ejs", { arr: results });
    });
});

app.get("/major", function(req, res) {
    connection.query("SELECT * FROM lecture WHERE 전공구분 IN ('전공필수','전공선택')", function(error, results) {
        res.render("1-major.ejs", { arr: results });
    });
});

app.get("/general", function(req, res) {
    connection.query("SELECT * FROM lecture WHERE 전공구분 = '교양선택'", function(error, results) {
        res.render("2-general", { arr: results });
    });
});
app.get("/edu", function(req, res) {
    connection.query("SELECT * FROM lecture WHERE 전공구분 = '교직필수'", function(error, results) {
        res.render("3-edu.ejs", { arr: results });
    });
});

app.get("/etc", function(req, res) {
    connection.query("SELECT * FROM lecture WHERE 전공구분 = '일반선택'", function(error, results) {
        res.render("4-etc.ejs", { arr: results });
    });
});

app.get("/sortdefault", (req, res) => {
    valueKey = req.query.valueKey;
    let query = `select * from lecture where 전공구분= "${valueKey}"`;
    connection.query(
        query,
        (err, result) => {
            if (err) {
                console.error(err);
            }

            res.json(result);
            return;
        }
    );
});

app.get("/sortasc", (req, res) => {
    valueKey = req.query.valueKey;
    sortKey = req.query.sortKey;
    let query = `select * from lecture where 전공구분= "${valueKey}" AND 강의평점 != "0" ORDER BY 강의평점 ASC`;
    connection.query(
        query,
        (err, result) => {
            if (err) {
                console.error(err);
            }

            res.json(result);
            return;
        }
    );
});

app.get("/sortdec", (req, res) => {
    valueKey = req.query.valueKey;
    sortKey = req.query.sortKey;
    let query = `select * from lecture where 전공구분= "${valueKey}" ORDER BY 강의평점 DESC`;
    connection.query(
        query,
        (err, result) => {
            if (err) {
                console.error(err);
            }

            res.json(result);
            return;
        }
    );
});


// /stats?major=농업생명&align=true
// => req.query = {major : "농업생명"}
app.get("/majorstats", (req, res) => {
    majorKey = req.query.majorKey;
    majorValue = req.query.majorValue;
    ageValue = req.query.ageValue;
    checkValue = req.query.disableZero;

    let query = `select * from lecture where ${majorKey}= "${majorValue}" AND ${checkValue ? "강의평점 != 0" : "강의평점 >= 0"}`;
    connection.query(
        query,
        (err, result) => {
            if (err) {
                console.error(err);
            }

            res.json(result);
            return;
        }
    );
});

app.get("/stats", function(req, res) {
    let lecCode= req.query.lecCode;
    console.log(lecCode);
    connection.query(`SELECT * FROM lecture WHERE id= "${lecCode}"`, function(error, results) {
        if(error){
            res.render("stat.ejs", {target : []})
            return
        }

        if (results){
            return res.render("stat.ejs", {target : results[0]})
        }
    });
});

//http://localhost:8080/stats/5118001-02
//https://github.com/TheLifeOfSeo/LectureService

// app.get("/product", (req, res) => {
//     let target_product = PRODUCTS.getProduct(req.query["code"])

//     if (!target_product) {
//         res.status(400).send("잘못된 접근입니다.")
//         return
//     }

//     res.render("product-detail", {
//         product: target_product
//     })
// })

server.listen(8080, () => {});