/**
 * 路由控制模块
 */
var index = require('./index');
var blog = require('./blog');
var portfolio = require('./portfolio');
var single = require('./single');
var project = require('./project');
var contact = require('./contact');
var commit = require('./commit');
var upload = require('./upload');
var log = require('./logs');

exports.route = function(app){
    // 首页
    app.get('/', index.index);
    
    //博客集
    app.get('/blog',blog.index);

    //作品集
    app.get('/portfolio',portfolio.index);

    //联系
    app.get('/contact',contact.index);
    app.post('/contact',contact.communication);

    //单个博客
    app.get('/single',single.index);

    //一组作品
    app.get('/project',project.index);

    //提交评论
    app.post('/commit',commit.index);

    //提交文章或博客
    app.get('/letmewritesomething',upload.index);
    app.post('/letmewritesomething',upload.up);
    //编辑文章
    app.get('/pleaseeditsth',upload.edit);
    app.post('/pleaseeditsth',upload.editwp);
    app.post('/editsearch',upload.search);
    app.post('/removeimg',upload.removeimg);
    app.post('/removecover',upload.removecover);
    app.post('/lockedit',upload.lockoff);

    //INFO
    app.post('/logs',log.baseInfo);
    //404
    app.get('*',(req,res)=>{
        res.render("../view/404.html");
    });
}