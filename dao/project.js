var pool = require('../config');

function Project(){

}

//pool.getConnection(function(err,connection){

    //根据id取得访问的work
    Project.getSinglework = function getSinglework(wid,callback){
        var sql = "SELECT * FROM work WHERE id = ?"
        pool.query(sql,wid,function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    }
    //根据id取得work图片
    Project.getImg = function getImg(wid,callback){
        var sql = "SELECT src FROM workimage WHERE workid = ?"
        pool.query(sql,wid,function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    }
    //增加阅读次数
    Project.addRead = function addRead(wid){
        var sql = "UPDATE work SET readtimes=readtimes+1 WHERE id = ?";
        pool.query(sql,wid,function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            //connection.release();
        })
    }
    //获取相关的project
    Project.relatedWork = function relatedWork(cate1,cate2,callback){
        var sql = "SELECT DISTINCT a.title,a.coverimg,a.id FROM work a,categories b WHERE b.workorpaper = 'Y' AND b.wpid = a.id AND (b.name = ? OR b.name = ?) LIMIT 4";
        pool.query(sql,[cate1,cate2],function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        })
    }    

//});

module.exports = Project;