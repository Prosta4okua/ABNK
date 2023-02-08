var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo' });
});
router.get('/error', function(req, res, next) {
  res.render('error', { message: 'message' });
});
router.get("/version")

module.exports = router;
