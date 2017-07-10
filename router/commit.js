/*
 * GET blog page.
 */
var dao = require('../dao/commit');
var transfer = require('./paramstransfer');

exports.index = function(req,res){
    if(req.query.id != undefined){
        const id = req.query.id;
        const content = req.body.comment,author=req.body.author;
        dao.addCommit(id,author,content,function(err,results){
            res.redirect('/single?id='+id);
        });
    }
}