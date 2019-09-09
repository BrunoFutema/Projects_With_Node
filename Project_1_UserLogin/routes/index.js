var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/userslist', function (req, res) {
  var db = require('../db');
  var Users = db.Mongoose.model('users', db.UserSchema, 'users');
  Users.find({}).lean().exec(
    function (e, docs) {
      res.render('userslist', { 'userslist': docs });
    }
  );
});

router.post('/login', function (req, res) {
  var db = require('../db');
  var userEmail = req.body.email;
  var userPass = req.body.senha;

  var Users = db.Mongoose.model('users', db.UserSchema, 'users');

  Users.find({ email: userEmail, senha: userPass }).lean().exec(
    function (e, docs) {
      if (docs != null) {
        res.redirect("userslist");
      } else {
        return e;
      }
    }
  );
});

router.post('/addlogin', function (req, res) {
  var db = require('../db');
  var userEmail = req.body.email;
  var userPass = req.body.senha;

  var Users = db.Mongoose.model('users', db.UserSchema, 'users');
  var user = new Users({ email: userEmail, senha: userPass });

  user.save(function (err) {
    if (err) {
      console.log('Erro! ' + err.message);
      return err;
    } else {
      console.log('Post saved');
      res.redirect('');
    }
  });
});

module.exports = router;
