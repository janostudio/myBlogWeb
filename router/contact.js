/*
 * GET contact page.
 */
var dao = require('../dao/contact');
var mysql = require('mysql');
var ulogs = require('./logs');

exports.index = function (req, res) {
    ulogs.baseInfo(req,res);
    res.render('contact',{
        cmItem:'<li><a href="/">HOME</a></li>'
                +'<li><a href="/blog">BLOG</a></li>'
                +' <li><a href="/portfolio">WORK</a></li>'
                +' <li class="current-menu-item"><a href="/contact">CONTACT</a></li>'
    });
}
exports.communication = function(req , res){
    var sql = "INSERT INTO contact (name , email , content) VALUES ("+mysql.escape(req.body.name)+","+mysql.escape(req.body.email)+","+mysql.escape(req.body.comments)+");" ;
    var callback;
    dao.query(sql,callback);
}