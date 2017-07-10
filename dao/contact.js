var pool = require('../config');

exports.query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            //callback(err,null,null);
            console.log("err");
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                //conn.release();
                //事件驱动回调
                //callback(qerr,vals,fields);
                //console.log(sql)
                //connection.release();
            });
        }
    });
};