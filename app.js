var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/refreshApp', function (req, res) {
    console.log(req.body);
    res.send('rev hook');
});

var server = app.listen(8848, function () {
    console.log('hot fix sever start at port:',server.address().port);
});