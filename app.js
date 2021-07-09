//引入第三方模块express
var express = require('express');
//引入用户路由器
var userRouter = require('./router/list');
//引入path模块用于解析地址
var path = require('path');

//创建WEB服务器
var app = express();
//设置端口
app.listen(8080);
//将post请求的数据解析为对象
app.use(express.urlencoded({
  extended: false
}));

// 托管静态资源
app.use(express.static(path.join(__dirname, 'view')));

app.use(userRouter);

//错误处理中间件
app.use(function (err, req, res, next) {
  //查看得到的错误信息
  console.log(err);
  //响应500,返回值500和信息
  res.status(500).send({
    code: 500,
    msg: '服务器端错误'
  });
});