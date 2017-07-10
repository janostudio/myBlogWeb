var pool = require('../config');

function Portfolio(){

}

//pool.getConnection(function(err,connection){
    Portfolio.getWork = function getWork(page,callback) {
        var sql = "SELECT * FROM (SELECT * FROM (SELECT * FROM work ORDER BY creattime DESC LIMIT ?) a ORDER BY creattime ASC LIMIT 9) b ORDER BY creattime DESC ";
        pool.query(sql,[page*9],function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    };
    Portfolio.getPagesum = function getPagesum(callback) {
        var sql = "SELECT count(id) as num FROM work";
        pool.query(sql,function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    }
//});

module.exports = Portfolio;