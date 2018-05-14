var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cmd=require('node-cmd');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.post('/refreshApp', function (req, res) {
    //console.log(req.body.repository.name);
    if(req.body.repository==undefined){
        res.send('read repository error');return;
    }
    if(req.body.repository.name==undefined){
        res.send('read repository.name error');return;
    }
    if(req.body.repository.name == "MallWeb"){
        severPull(function (err,data) {
            if(err==null){
                console.log(data);
                res.send('www pull success');
            }
            else
                res.send('pull error');
        })
    }else if(req.body.repository.name == "MallApp"){
        severPull(function (err,data) {
            if(data==null){
                console.log(data);
                res.send('app pull success');
            }
            else
                res.send('pull error');
        })
    }else{
        res.send('we have not this repo name');
    }
});
function severPull(batPath,callback) {
    cmd.get(
        "git pull " + batPath,function(err,data){
            //console.log(data);
            callback(err,data)
        });
}
var server = app.listen(8848, function () {
    console.log('hot fix sever start at port:',server.address().port);
});