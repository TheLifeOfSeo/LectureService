const express = require('express');
const app = express();
const fs = require("fs");
const http = require("http");
const path = require("path");
const sass = require("node-sass");
const sql = require("sql");
const mysql = require('mysql');

let server = http.createServer(app)
let viewsRootPath = path.join(__dirname, "views")
let staticRootPath = path.join(viewsRootPath, "statics")
let cssRootPath = path.join(staticRootPath, "css")
let sassRootPath = path.join(staticRootPath, "scss")


let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'Service'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('statics'));

// app.use(sass.render({
//     src: sassRootPath,
//     dest: cssRootPath,
//     outputStyle: "compact",
//     debug: true,
//     force: true,
//     indentedSyntax: false,
// }))



app.get('/', function(req, res) { 
    let arr = new Array(); 

    arr[0] = ["오픈소스기초프로젝트", "강재구", "전공선택", 0.82, 81, "소프트웨어학과"];
    arr[1] = ["자료구조", "이의종", "전공필수", 0.5, 23, "소프트웨어학과"];
    arr[2] = ["인간과 기계문명", "김연순", "교양선택", 1, 62];
    arr[3] = ["오픈소스기초프로젝트", "강재구", "전공선택", 0.82, 81, "소프트웨어학과"];
    arr[4] = ["자료구조", "이의종", "전공필수", 0.5, 23, "소프트웨어학과"];
    arr[5] = ["인간과 기계문명", "김연순", "교양선택", 1, 62];
    arr[6] = ["오픈소스기초프로젝트", "강재구", "전공선택", 0.82, 81, "소프트웨어학과"];
    arr[7] = ["자료구조", "이의종", "전공필수", 0.5, 23, "소프트웨어학과"];
    arr[8] = ["인간과 기계문명", "김연순", "교양선택", 1, 62];
    arr[9] = ["오픈소스기초프로젝트", "강재구", "전공선택", 0.82, 81, "소프트웨어학과"];

    res.render("main.ejs", { arr : arr })
})

server.listen(8080, ()=> {

})