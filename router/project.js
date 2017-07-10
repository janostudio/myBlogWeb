/*
 * GET project page.
 */
var dao = require('../dao/project');
var blog = require('../dao/blog');
var transfer = require('./paramstransfer');
var mysql = require('mysql'); 
var markdown = require( "markdown" ).markdown;
var ulogs = require('./logs');

exports.index = function (req, res) {
    ulogs.baseInfo(req,res);
    cmItem = '<li><a href="/">HOME</a></li>'
                +'<li><a href="/blog">BLOG</a></li>'
                +' <li class="current-menu-item"><a href="/portfolio">WORK</a></li>'
                +' <li><a href="/contact">CONTACT</a></li>';
    if(req.query.id != undefined){
        var wid = req.query.id;
    }else{
        var wid = 1;
    }
    var arr = [];
    dao.getSinglework(wid,function(err,results){
        transfer.dateTransfer(results);
        blog.getIdCate('Y',wid,function(err,cate){
            for(i=0;i<cate.length;i++){
                arr.push(cate[i].name);
            }
            results.cate = arr;
            dao.relatedWork(arr[0],arr[1],function(err,related){
                
                dao.getImg(wid,function(err,wimg){
                    var arr = [];
                    for(i=0;i<wimg.length;i++){
                        arr.push(wimg[i].src);
                    }
                    dao.addRead(wid);
                    results.img = arr;
                    //console.log(related);
                    //markdown笔记翻译
                    results[0].content = markdown.toHTML(results[0].content);
                    res.render('project',{
                        cmItem:cmItem,
                        results:results,
                        related:related
                    }); 
                });
            });
        });

    });
}