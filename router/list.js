const pool = require('../util/pool');
const express = require('express');
const router = express.Router();

//用户列表（get /list）
//地址:http://127.0.0.1:8080/list
router.get('/list', (req, res, next) => {
  var obj = req.query;
  var start = (obj.pno-1)*obj.count*1;
  var end = obj.count*1;
  console.log(obj);
  var sql = 'select * from xz_laptop'
  pool.query(sql,(err, result) => {
    if (err) {
      next(err);
      return;
    } 
     var sum = result.length;
    var sql = 'select lid,title,price,memory,is_onsale from xz_laptop limit ?,?';
    pool.query(sql,[start,end], (err, result) => {
      if (err) {
        next(err);
        return;
      }     
      console.log(sum);
      res.send({
        code: 1,
        msg: '返回所有数据',
        sum,
        data: result
      });
  })    
  })

})

//导出路由
module.exports = router;