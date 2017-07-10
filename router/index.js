/*
 * GET home page.
 */
var dao = require('../dao/index');
var transfer = require('./paramstransfer');
var ulogs = require('./logs');

exports.index = function (req, res) { 
    ulogs.baseInfo(req,res);
    const cmItem = '<li class="current-menu-item"><a href="/">HOME</a></li><li><a href="/blog">BLOG</a></li><li><a href="/portfolio">WORK</a></li><li><a href="/contact">CONTACT</a></li>';
    dao.getBlog(function(err,results){
        transfer.dateTransfer(results);
        dao.getProject(function(err,works){
            transfer.dateTransfer(works);
            //console.log(works);
            //console.log(results);
            res.render('index',{
                cmItem:cmItem,
                results:results,
                works:works
            });
        });
    });
}