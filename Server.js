const express = require('express');
const app = express();

app.use(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<h1>hello express</h1>');
});

app.listen(52273, function () {
    console.log("Server Running at http://127.0.0.1:52273");
});