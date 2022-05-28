const express = require('express');
const app = express();
const fs = require("fs");
const http = require("http")
let server = http.createServer(app)

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('statics'));

app.get('/', function(req, res) { 
    res.render("main.ejs")
})

server.listen(8080, ()=> {
    let a = "sd"
})