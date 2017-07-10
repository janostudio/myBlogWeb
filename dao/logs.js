var pool = require('../config');

function Log(){

}

//pool.getConnection(function(err,connection){

    Log.insertLog = function insertLog(serv,client){
        var sql = "INSERT INTO logs (host,port,deviceX,deviceY,screenH,screenW,ip,lang,url,useragent,method,cookie) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
        //console.log(serv,client);
        pool.query(sql,[client.host,client.port,client.dX,client.dY,client.sH,client.sW,serv.cip,serv.lang,serv.aurl,serv.uagent,serv.method,serv.cookie],function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            //connection.release();
        });
    }

//});

module.exports = Log;