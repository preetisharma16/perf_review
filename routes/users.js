var express = require('express');
var router = express.Router();
var addrate = require('./addRating');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/rate', (req, res) => {
  res.sendFile(__dirname + '/public/views/update1.html');
});
router.post('/rate', (req, res) => {});
module.exports = router;
