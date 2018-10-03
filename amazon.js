var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cmd=require('node-cmd');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/updataAmazon', function (req, res) {
    //console.log(req.body.repository.name);
severPull(function (err,data) {
            if(data==null){
                console.log(data);
                res.send('app pull success');
            }
            else
                res.send('pull error');
        });
});
function severPull(callback) {
    cmd.get("git pull",function(err,data){
        console.log(data);
        callback(err,data)
    });
}
var server = app.listen(8848, function () {
    console.log('amazonRC hot fix sever start at port:',server.address().port);
});
