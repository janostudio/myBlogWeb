var pool = require('../config');

function Single(){

}

//pool.getConnection(function(err,connection){
    //根据用户名得到用户信息
    Single.getSingle = function getSingle(paperId,callback) {
        var sql = "SELECT * FROM paper WHERE id = ?";
        pool.query(sql,[paperId], function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    };
    //增加阅读次数
    Single.addRead = function addRead(pid){
        var sql = "UPDATE paper SET readtimes=readtimes+1 WHERE id = ?";
        pool.query(sql,pid,function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            //connection.release();
        })
    };
    Single.getCommit = function getCommit(pid,callback){
        var sql = "SELECT * FROM papercommit WHERE paperid = ? ORDER BY creattime";
        pool.query(sql,pid,function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        })
    }
    
//});

module.exports = Single;