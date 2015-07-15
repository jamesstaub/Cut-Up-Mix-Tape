var express = require('express');
var router = express.Router();
var env = require('node-env-file');
var CutUp = require('../models/cutup');
var Account = require('../models/account');

router.get('/', function(req, res) {
  CutUp.findById(req.user._id, function(err, cutups) {
    res.json(cutups);
  })
});

// router.post('/', function(req, res) {
//     new CutUp({
//       title: req.body.title,
//       content: req.body.content
//     }).save(function(err, cutup) {
//       if(err) {
//         res.status(400).send('Error saving new cutup: ' + err);
//       } else {
//         console.log("next we'll find by id and update");
//         Account.findByIdAndUpdate(req.user._id, {$push: {cutups : cutup._id}}, function(err, user){
//           if(err){
//             console.error(err);
//           }else{
//             console.log("found and added cutup to user");
//             console.log(user)
//           }
//         })
//         res.send(cutup);
//       }
//     })
// });

router.post('/', function(req, res) {
  CutUp.create({
    title: req.body.title,
    content: req.body.content
  }, function(err, cutup) {
    if(err) {
      res.status(400).send('Error saving new cutup: ' + err);
    } else {
      console.log("next we'll find by id and update");
      Account.findByIdAndUpdate(req.user._id, {$push: {cutups : cutup._id}}, function(err, user){
        if(err){
          console.error(err);
        }else{
          console.log("found and added cutup to user");
          console.log(user)
        }
      })
    }
  });
});









router.route('/:cutup_id')
  .all(function(req, res, next) {
    cutup_id = req.params.cutup_id;
    cutup = {};
    CutUp.findById(cutup_id, function(err, c) {
      cutup = c;
      next();
    });
  })

  .get(function(req, res) {
    res.json({cutup: cutup});
  })

  .put(function(req, res) {
    cutup.title = req.body.title;
    cutup.content = req.body.content;

    cutup.save(function(err, cutup) {
      if(err) {
        res.status(400).send('Error saving cutup: ' + err);
      } else {
        res.send('CutUp saved');
      }
    });
  })

  .delete(function(req, res) {
    cutup.remove(function(err, cutup) {
      if(err) {
        res.status(400).send("Error removing cutup: " + err);
      } else {
        res.send('CutUp removed');
      }
    });
  });


module.exports = router;
