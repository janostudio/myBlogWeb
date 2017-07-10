/*
 * GET blog page.
 */
var dao = require('../dao/blog');
var transfer = require('./paramstransfer');
var ulogs = require('./logs');
var markdown = require( "markdown" ).markdown;

exports.index = function(req,res){
    ulogs.baseInfo(req,res);
    var cmItem = '<li><a href="/">HOME</a></li>'
            +'<li class="current-menu-item"><a href="/blog">BLOG</a></li>'
            +' <li><a href="/portfolio">WORK</a></li>'
            +' <li><a href="/contact">CONTACT</a></li>';
    var maix=[];
    dao.getNum(function(err,num){
        maix[0] = num[0].top;
        maix[1] = num[0].bottom;
    });
    if(req.query.id == undefined){
        //获取blog表最近三条数据，若不满三条，则取现有的条数
        dao.getBlog(function(err, results){
            transfer.stamptimeTransfer(results);
            var arr =[];
            for(i=0;i<results.length;i++){
                dao.getIdCate('N',results[i].id,function(err,papercate){
                    for(j=0;j<results.length;j++){
                        arr =[];
                        for(k=0;k<papercate.length;k++){
                            if(results[j].id == papercate[k].wpid){
                                arr.push(papercate[k].name);
                            }
                        }
                        if(arr != ""){
                            results[j].scate = arr;
                        }     
                    }
                    
                });
            }
            dao.getCate(function(err,cate){
                dao.getMonth(function(err,papermonth){
                    transfer.monthTransfer(papermonth);
                    //console.log(results);
                    //markdown笔记翻译
                    results[0].content = markdown.toHTML(results[0].content)
                    res.render('blog',{
                        cmItem:cmItem,
                        results:results,
                        cate:cate,
                        papermonth:papermonth,
                        maix:maix
                    });
                });
            });
        })
    }else{
        //根据得到的id及round获取文章,round=0查之前的，round=1查之后的
        dao.getBlogWithId(req.query.id,req.query.round,function(err, results){
            transfer.stamptimeTransfer(results);
            var arr =[];
            for(i=0;i<results.length;i++){
                dao.getIdCate('N',results[i].id,function(err,papercate){
                    for(j=0;j<results.length;j++){
                        arr =[];
                        for(k=0;k<papercate.length;k++){
                            if(results[j].id == papercate[k].wpid){
                                arr.push(papercate[k].name);
                            }
                        }
                        if(arr != ""){
                            results[j].scate = arr;
                        }     
                    }
                    
                });
            }
            dao.getCate(function(err,cate){
                dao.getMonth(function(err,papermonth){
                    transfer.monthTransfer(papermonth);
                    //console.log(results);
                    //markdown笔记翻译
                    results[0].content = markdown.toHTML(results[0].content)
                    res.render('blog',{
                        cmItem:cmItem,
                        results:results,
                        cate:cate,
                        papermonth:papermonth,
                        maix:maix
                    });
                });
            });            
        });
    }
}