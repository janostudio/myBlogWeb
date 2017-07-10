var pool = require('../config');

function Blog(){

}

//pool.getConnection(function(err,connection){
    //根据用户名得到用户信息
    Blog.getBlog = function getBlog(callback) {
        var sql = "SELECT * FROM paper ORDER BY creattime DESC LIMIT 3 ";        
        pool.query(sql, function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    };

    //根据paperid得到categories
    Blog.getIdCate = function getIdCate(or,wpid,callback){
        var sql = "SELECT wpid,name FROM categories WHERE workorpaper= ? AND wpid = ?"
        pool.query(sql,[or,wpid],function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    }

    Blog.getCate = function getCate(callback) {
        var sql = "SELECT DISTINCT name FROM categories ORDER BY creattime DESC LIMIT 5";
        pool.query(sql, function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    }

    Blog.getMonth = function getMonth(callback) {
        var sql = "SELECT DISTINCT date_format(creattime,'%Y-%m') AS creattime FROM paper ORDER BY creattime DESC LIMIT 3";
        pool.query(sql, function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release(); 
        });
    }

    //根据id及round获取id
    Blog.getBlogWithId = function getBlogWithId(id,round,callback) {
        if(round == 0){
            var sql = "SELECT * FROM paper WHERE id < ? ORDER BY creattime DESC LIMIT 3 "; 
        }else{
            var sql = "SELECT * FROM (SELECT * FROM paper WHERE id > ? ORDER BY creattime ASC LIMIT 3) a ORDER BY creattime DESC "; 
        }
        pool.query(sql,id, function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    };
    //获取最大最小id
    Blog.getNum = function getNum(callback){
        var sql = "SELECT max(id) AS top,min(id) AS bottom FROM paper";
        pool.query(sql,function(err,results){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, results);
            //connection.release();
        });
    }
//});

module.exports = Blog;