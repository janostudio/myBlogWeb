var express = require('express');
var http = require('http');
var router = require('./router/route');
var ejs = require('ejs');
var path = require('path');
var log4js = require('./log4js');
var logger = log4js.getLogger('server');
var bodyParser = require("body-parser");
var https = require('https');
var fs = require('fs');

logger.setLevel('INFO');

var app = express();

//静态文件配置
app.use('/public', express.static('public'));
app.use('/ssl', express.static('ssl'));
//app.use(express.bodyParser({uploadDir: '../public/uploads'}))
// log4j相关配置
log4js.use(app, logger);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// 路由配置
router.route(app);

//ejs模板文件扩展为html文件
app.set('views', './view');
app.engine(".html", ejs.__express);
app.set("view engine", 'html');
// 启动及端口
exports.start = function(){
    // var httpsserver = https.createServer({
    //     key: fs.readFileSync('ssl/private.key'),        //这里是私钥
    //     cert: fs.readFileSync('ssl/certificate.crt'),    //这里是证书
    //     ca: fs.readFileSync('ssl/ca_bundle.crt')        //链,必要,有些浏览器少了会报不安全
    // },app).listen(443,function(){
    //     console.log('https server has started');
    // });
    // var server = http.createServer(function(req, res){
    //     // res.redirect('https://jealand.win'+req.url)
    //     res.writeHead(301, {'Location' :  'https://' + req.headers.host + req.url});
    //     res.end();
    //     console.log(req.headers.host);
    // }).listen(80,function () {
    //     console.log('http server has started');
    // });
    var server = app.listen(3000, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
}