var pool = require('../config');

function Upload(){

}

//pool.getConnection(function(err,connection){
    //上传博客
    Upload.uploadwp = function Uploadwp(wp,title,content,fileaddr,cate1,cate2,callback){
        if(wp == "Y"){
            var sql = "INSERT INTO work (title, content,coverimg) VALUES (?, ?, ?)";
            var sqlinner = " SELECT max(id) as iid from work";
        }else{
            var sql = "INSERT INTO paper (title, content,coverimg) VALUES (?, ?, ?)";
            var sqlinner = " SELECT max(id) as iid from paper";
        }
        pool.query(sql,[title,content,fileaddr],function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            pool.query(sqlinner,function(err,result){
                if(err) {
                    console.log('Error' + err.message);
                    return;
                }
                var id = result[0].iid;
                if(cate1 != ''){
                    sql = "INSERT INTO categories (name,workorpaper,wpid) VALUES (?, ?, ?)"
                    pool.query(sql,[cate1,wp,id],function(err,result){
                        if(err) {
                            console.log('Error' + err.message);
                            return;
                        }
                    });
                }
                if(cate2 != ''){
                    sql = "INSERT INTO categories (name,workorpaper,wpid) VALUES (?, ?, ?)"
                    pool.query(sql,[cate2,wp,id],function(err,result){
                        if(err) {
                            console.log('Error' + err.message);
                            return;
                        }
                    });
                }
                callback(err, result);
            });
        });
    }
    //上传博客
    Upload.changewp = function Uploadwp(id,wp,title,content,fileaddr,cate1,cate2,callback){
        if(wp == "Y"){
            var sql = "UPDATE work SET title = ?, content = ?,coverimg = ? WHERE id = ?";
        }else{
            var sql = "UPDATE paper SET title = ?, content = ?,coverimg = ? WHERE id = ?";
        }
        pool.query(sql,[title,content,fileaddr,id],function(err,result){
            if(err) {
                console.log('Error' + err.message);
                return;
            }
            if(cate1 != ''){
                sql = "UPDATE categories SET name = ?,workorpaper = ? WHERE wpid = ? ORDER BY creattime LIMIT 1"
                //sql = "INSERT INTO categories (name,workorpaper,wpid) VALUES (?, ?, ?)"
                pool.query(sql,[cate1,wp,id],function(err,result){
                    if(err) {
                        console.log('Error' + err.message);
                        return;
                    }
                });
            }
            if(cate2 != ''){
                sql = "UPDATE categories SET name = ?,workorpaper = ? WHERE wpid = ? ORDER BY creattime DESC LIMIT 1"
                pool.query(sql,[cate2,wp,id],function(err,result){
                    if(err) {
                        console.log('Error' + err.message);
                        return;
                    }
                });
            }
            callback(err, result);
            //connection.release();
        });
    }
    //上传图片
    Upload.insertPhoto = function insertPhoto(id,addr,wp){
        if(wp == "Y"){
            var sql = "INSERT INTO workimage (workid, src) VALUES (?, ?)";
        }else{
            var sql = "INSERT INTO paperimage (paperid, src) VALUES (?, ?)";
        }
        pool.query(sql,[id,addr],function(err,result){
            console.log("Multi upload is success!");
            //connection.release();
        });
    }
    //删除单张图片
    Upload.removeImg = function removeImg(src){
        var sql = "DELETE FROM workimage where src = ?";
        pool.query(sql,[src],function(err,result){
            console.log("An image is deleted successfully!");
            //connection.release();
        });
    }
    //删除封面图片
    Upload.removeCover = function removeCover(id,wp){
        const defaltimg = "public/img/dummies/featured-1.jpg";
        if(wp == "Y"){
            var sql = "UPDATE work SET coverimg = ? WHERE id = ?";
        }else{
            var sql = "UPDATE paper SET coverimg = ? WHERE id = ?";
        }
        pool.query(sql,[defaltimg,id],function(err,result){
            console.log("CoverImg upload is successful!");
            //connection.release();
        });
    }
//});

module.exports = Upload;