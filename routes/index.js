var express = require('express');
var router = express.Router();
const mindustry = require('../logic/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo' });
});
router.get('/error', function(req, res, next) {
  res.render('error', { message: 'message' });
});
router.get("/version", (req, res, next) => {
  let version =  mindustry.sendToConsole("version");
  console.log(mindustry.stack.length)


  let strs = mindustry.stack.toString().split(",")
  console.log("111",strs)
  console.log(strs[strs.length - 1])
  //

  if (mindustry.isConnected === true)
    res.render('version', {version: version , hehe: mindustry.stack, var1: mindustry.stack.pop()})
  else
    res.render('error', {message: "Mindustry server is not running.", message2: version})
})

module.exports = router;
