var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'PC123456',
    database:'jealand',
    port:'3306'
});
pool.getConnection(function(err,connection){
    //connection.query(function(err, result){
        if(err) {
            console.log('Error' + err.message);
            return;
        }else{
            console.log("connect success!");
        }
        //callback(err, result);
        //connection.release();
    //});
})

module.exports = pool;