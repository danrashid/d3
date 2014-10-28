var express = require('express');
var router = express.Router();

/* GET stats. */
router.get('/', function(req, res) {
  var thisSecond = Math.floor(new Date() / 1000) * 1000,
    i = 60 - 1,
    data = [];

  while (i >= 0) {
    data.push([
      thisSecond - i * 1000,
      Math.round(Math.random() * 10)
    ]);
    i -= 1;
  }

  res.send(data);
});

module.exports = router;
