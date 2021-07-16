const express = require('express');
var router = express.Router();
var pool = require("../util/pool");
router.post("/page",(req,res)=>{
  var obj = req.body;
  console.log(obj);
  var min = obj.min*1;
  var max = obj.max*1;
  var brand = obj.brand;
  if(!brand) brand = ""
  if(!min) min = 0
  if(!max) max = 10000000
  var brandName = `%${brand}%`
  var sql = `SELECT * FROM xz_laptop WHERE price between ? and ? and title LIKE ?`
  pool.query(sql,[min,max,brandName],(err,result)=>{
    console.log(sql);
    if(err) throw err;
    if(result.length>0)
    {res.send({code:200,result})}
    else{
      res.send({code:404,msg:"查询失败"})
    }
  })

})


module.exports = router;