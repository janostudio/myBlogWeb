/*
 * GET single page.
 */
var dao = require('../dao/single');
var blog = require('../dao/blog');
var mysql = require('mysql'); 
var transfer = require('./paramstransfer');
var markdown = require( "markdown" ).markdown;
var ulogs = require('./logs');

exports.index = function (req, res) {
    ulogs.baseInfo(req,res);
    var cmItem = '<li><a href="/">HOME</a></li>'
                +'<li class="current-menu-item"><a href="/blog">BLOG</a></li>'
                +' <li><a href="/portfolio">WORK</a></li>'
                +' <li><a href="/contact">CONTACT</a></li>';
    if(req.query.id == undefined){
        var pid = 1;
    }else{
        var pid = req.query.id;
    }
    dao.getSingle(pid,function(err,results){
        transfer.stamptimeTransfer(results);
        console.log(results);
        blog.getIdCate('N',pid,function(err,scate){
            blog.getCate(function(err,cate){
                blog.getMonth(function(err,papermonth){
                    dao.addRead(pid);
                    //console.log(scate);
                    transfer.monthTransfer(papermonth);
                    dao.getCommit(pid,function(err,commit){
                        transfer.fromNowDay(commit);
                        //markdown笔记翻译
                        results[0].content = markdown.toHTML(results[0].content);
                        res.render('single',{
                            cmItem:cmItem,
                            results:results,
                            cate:cate,
                            papermonth:papermonth,
                            scate:scate,
                            commit:commit
                        });
                    });               
                });
            });
        });
    });
    
}