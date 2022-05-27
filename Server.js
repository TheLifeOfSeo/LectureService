const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.render('/rml/LectureService/HTML/main.html')
})

app.listen(52273, function () {
    console.log("Server Running at http://127.0.0.1:52273");
});