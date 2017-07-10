/*
 * GET blog page.
 */
var dao = require('../dao/upload');
var single = require('../dao/single');
var project = require('../dao/project');
var blog = require('../dao/blog');
var multer = require('../dao/multerutil');
var ulogs = require('./logs');

//新增文章页面
exports.index = function(req,res){
    res.render('write');
}
//编辑文章页面
exports.edit = function(req,res){
    res.render('edit');
}

//multer有single()中的名称必须是表单上传字段的name名称。
var upload = multer.fields([{ name: 'img', maxCount: 1 }, { name: 'multi', maxCount: 9 }]);  
exports.up = function(req,res){
    ulogs.baseInfo(req,res);
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return  console.log(err);
        } 

        //文章存储
        //封面图存储
        if(typeof req.files['img'] != "undefined"){
            if(req.body.wp == "Y"){
                var frontaddr = "/public/uploads/work/";
                var fileaddr = frontaddr+req.files['img'][0].filename;
            }else{
                var frontaddr = "/public/uploads/paper/";
                var fileaddr = frontaddr+req.files['img'][0].filename;
            }
        }else{
            var fileaddr = "public/img/dummies/featured-1.jpg";
            if(req.body.wp == "Y"){
                var frontaddr = "/public/uploads/work/";
            }else{
                var frontaddr = "/public/uploads/paper/";
            }
        }
        dao.uploadwp(req.body.wp,req.body.title,req.body.content,fileaddr,req.body.cate1,req.body.cate2,function(err,result){
            //图片存储
            if(typeof req.files['multi'] != "undefined"){
                for(i in req.files['multi']){
                    var multiaddr = frontaddr+req.files['multi'][i].filename;
                    dao.insertPhoto(result[0].iid,multiaddr,req.body.wp);
                }
            }
            if(req.body.wp == 'Y'){
                setTimeout(function() {
                    res.redirect("/project?id="+result[0].iid);
                }, 3000);           
            }else{
                setTimeout(function() {
                    res.redirect("/single?id="+result[0].iid);
                }, 3000);
            }

        });

    });
    
}
//得到文章作品的内容
exports.search = function(req,res){
    const id = req.body.iid;
    if(req.body.wp == 'N'){
        single.getSingle(id,function(err,results){
            blog.getIdCate('N',id,function(err,cate){
                if(cate.length >0 ){
                    results[0].cate1 = cate[0].name;
                    if(cate.length >1 ){
                        results[0].cate2 = cate[1].name;
                    }
                }
                res.json(results[0]);
            });
        });
    }else{
        project.getSinglework(id,function(err,results){
            blog.getIdCate('Y',id,function(err,cate){
                results[0].cate1 = cate[0].name;
                results[0].cate2 = cate[1].name;
                project.getImg(id,function(err,wimg){
                    var temp = {};
                    for(i in wimg){
                        temp[i] = wimg[i].src;
                    }
                    results[0].img = temp;
                    res.json(results[0]);
                })
            });
        })
    }
}
//删除作品的图片（单张）
exports.removeimg = function(req,res){
    dao.removeImg(req.body.src);
}
//删除封面图片
exports.removecover = function(req,res){
    dao.removeCover(req.body.id,req.body.wp);
}
//上传修改的文章或作品
exports.editwp = function(req,res){
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return  console.log(err);
        } 

        //文章存储
        //封面图存储
        if(typeof req.files['img'] != "undefined"){
            if(req.body.wp == "Y"){
                var frontaddr = "/public/uploads/work/";
                var fileaddr = frontaddr+req.files['img'][0].filename;
            }else{
                var frontaddr = "/public/uploads/paper/";
                var fileaddr = frontaddr+req.files['img'][0].filename;
            }
        }else{
            var fileaddr = "public/img/dummies/featured-1.jpg"
            if(req.body.wp == "Y"){
                var frontaddr = "/public/uploads/work/";
            }else{
                var frontaddr = "/public/uploads/paper/";
            }
        }
        var id = req.body.id;
        dao.changewp(req.body.id,req.body.wp,req.body.title,req.body.content,fileaddr,req.body.cate1,req.body.cate2,function(err,result){
            //图片存储
            if(typeof req.files['multi'] != "undefined"){
                for(i in req.files['multi']){
                    var multiaddr = frontaddr+req.files['multi'][i].filename;
                    dao.insertPhoto(id,multiaddr,req.body.wp);
                }
            }

            if(req.body.wp == 'Y'){
                setTimeout(function() {
                    res.redirect("/project?id="+id);
                }, 3000);           
            }else{
                setTimeout(function() {
                    res.redirect("/single?id="+id);
                }, 3000);
            }

        });

    });
} 
//解锁编辑页面
exports.lockoff = function(req,res){
    if(req.body.pwd = "pleaseeditsth"){
        res.json({lo:"lo"});
        console.log("lockoff successful");
    }
}