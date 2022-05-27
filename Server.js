const express = require('express');
const app = express();
const fs = require("fs");

app.get('/', function(req, res) {
    fs.readFile('/HTML/main.html');
})

app.listen(8080, function () {
    console.log("Server Running at http://43.200.49.176:8080");
});