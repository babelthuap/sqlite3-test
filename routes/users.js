'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');


var express = require('express');
var router = express.Router();


db.run("CREATE TABLE users (name, email)");


/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM users", function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

router.post('/', function(req, res) {
  var user = req.body;
  db.run("INSERT INTO users VALUES ($name, $email)", {
    $name: user.name,
    $email: user.email
  }, function(err) {
    res.status(err ? 400 : 200).send(err || 'INSERTED');
  });
});


module.exports = router;
