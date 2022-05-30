const express = require('express');
const app = express();
const fs = require("fs");
const http = require("http")
let server = http.createServer(app)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('statics'));

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