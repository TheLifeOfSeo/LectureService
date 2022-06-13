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

// 강의구분,수강학년,과목코드,과목명,교수명,수업시간,학점,,강의평점,수강인원,수강정원

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
                    "INSERT INTO lecture (전공구분, 학년, id, 과목명, 교수명, 수업시간, 학점, none, 강의평점, 수강인원, 수강정원) VALUES ? ;";
                connection.query(query, [csvData], (error, response) => {
                    console.log(error);
                });
            }
        });
    });
stream.pipe(csvStream);

console.log(csvData);

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