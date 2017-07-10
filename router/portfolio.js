/*
 * GET portfolio page.
 */
var dao = require('../dao/portfolio');
var transfer = require('./paramstransfer');
var ulogs = require('./logs');

exports.index = function (req, res) {
    ulogs.baseInfo(req,res);
    //获取最多9个作品首张图片展示，不足则取全部
    if(typeof req.query.page != "undefined"){
        page = req.query.page;
    }else{
        page = 1;
    }
    const cmItem = '<li><a href="/">HOME</a></li>'
            +'<li><a href="/blog">BLOG</a></li>'
            +' <li class="current-menu-item"><a href="/portfolio">WORK</a></li>'
            +' <li><a href="/contact">CONTACT</a></li>';
    dao.getWork(page,function(err, results){
        transfer.dateTransfer(results);
        dao.getPagesum(function(err,sum){
            var pagenum = Math.ceil(sum[0].num/9);
            res.render('portfolio',{
                cmItem:cmItem,
                results:results,
                pagenum:pagenum,
                page:page
            });
        }); 
    });
}