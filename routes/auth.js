var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();


var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    console.log("not logged in ");
    // res.status(401);
    res.end();
  }
}


router.get('/user', isAuthenticated, function(req, res) {
  res.send(req.user);
});


router.route('/register')
  .post(function(req, res, next) {
    Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
      if(err) {
        return res.json({account: account});
      }

      req.login(account, function(err) {
        if(err){
          console.error(err)
        }
        res.json(account);
      });
    })
  })

router.route('/login')
  .get(function(req, res, next){
    res.json(req.user);
  })
  .post(passport.authenticate('local'), function(req, res) {
    console.log(req.user);
    res.json(req.user)
  // res.redirect('/');
});


router.all('/logout', function(req, res, next) {
  req.logout();

  res.json({user: "logged out"});
  // res.redirect('/');
});

// JADE TEMPLATE AUTH ROUTES
// router.route('/register')
//   .get(function(req, res, next) {
//     res.render('register', {});
//   })
//   .post(function(req, res, next) {
//     Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
//       if(err) {
//         return res.render('register', {account: account});
//       }

//       req.login(account, function(err) {
//         res.redirect('/');
//       });
//     })
//   })



// router.route('/login')
//   .get(function(req, res, next){
//     res.render('login', {user: req.user});
//   })
//   .post(passport.authenticate('local'), function(req, res) {
//   res.redirect('/');
// });


// router.all('/logout', function(req, res, next) {
//   req.logout();
//   res.redirect('/');
// });



module.exports = router;
