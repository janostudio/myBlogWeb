var pool = require('../config');

function Commit(){

}

//pool.getConnection(function(err,connection){

    Commit.addCommit = function addCommit(pid,author,content,callback){
        var sql = "INSERT INTO papercommit (paperid,author,content) VALUES (?,?,?)"
        pool.query(sql,[pid,author,content],function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            callback(err, result);
            //connection.release();
        });
    }

//});

module.exports = Commit;