# Introduce
> **Time:20170109**  
> **Author:jiang**
## 网页框架
* app.js是整个应用的启动入口。
* server.js是系统服务配置和创建的地方。   
* config.js中存放着系统的配置信息。
* router中是应用路由控制跳转(Router)和请求分发处理的模块，根据对象信息进行模块化。
* views是系统展现给用户的ejs前端页面。
* daos中封装了所有对数据库的操作。
* public中是一些静态元素，如js，css，images，JQuery,Bootstrap都在其中。
* package.json中定义了系统需要的其他的第三方模块，如express,ejs等。
* node_modules中则是存放通过npm安装的第三方依赖包,如express,mongoose,log4js等。
* logs中存放了系统日志
* 后台的各个模块中其实有一个基于express和ejs的MVC模式，对应的三个模块为：models(M)-views(V)-routes(C).
## 视图文件
* home：博客、作品展示。
* blog：所有博文展示。
* single：单个博文有图片展示。
* page: 单个博文无图片展示，有右侧栏
* page-full: 单个博文无图片，无侧边栏
* portfolio：图片展示。
* contact：个人联系。
* project：一组图片展示。
* header：头部文件。
* footer：脚步文件。

目前已废弃此项目，改为HEXO。