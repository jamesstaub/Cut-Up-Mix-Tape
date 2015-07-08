var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
      if(err) {
        return res.render('register', {account: account});
      }

      req.login(account, function(err) {
        res.redirect('/');
      });
    })
  })


router.route('/login')
  .get(function(req, res, next){
    res.render('login', {user: req.user});
  })
  .post(passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});




router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
