var pool = require('../config');

function Index(){

}

//pool.getConnection(function(err,connection){
    Index.getBlog = function getBlog(callback) {
        var sql = "SELECT * FROM paper ORDER BY creattime DESC LIMIT 6 ";        
        pool.query(sql, function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    };

    Index.getProject = function getProject(callback) {
        var sql = "SELECT * FROM work ORDER BY creattime DESC LIMIT 4 ";
        pool.query(sql, function(err, result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    }

//});

module.exports = Index;