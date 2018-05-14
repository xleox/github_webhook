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
        severPull('D:\\MallApp\\www\\pull.bat',function (data) {
            if(data==null)
                res.send('Www pull success');
            else
                res.send('pull error');
        })
    }else if(req.body.repository.name == "MallApp"){
        severPull('D:\\MallApp\\app\\pull.bat',function (data) {
            if(data==null)
                res.send('App pull success');
            else
                res.send('pull error');
        })
    }else{
        res.send('we have not this repo name');
    }
});
function severPull(batPath,callback) {
    cmd.get(
        batPath,function(data){
            //console.log(data);
            callback(data)
        });
}
var server = app.listen(8848, function () {
    console.log('hot fix sever start at port:',server.address().port);
});