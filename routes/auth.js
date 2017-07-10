const express = require("express");
const router = express.Router();
const User = require("../models/User");
const randtoken = require('rand-token');

router.get("/signin", function(req, res){
  res.render("auth/signin")
})

router.post("/auth", function(req, res){
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }).then( function(user){
    if (user){
      req.session.userId = user._id;
      res.redirect("/")
    } else {
      res.render("auth/signin", {
        problem: true
      })
    }
  })
})

router.get("/signup", function(req, res){
  res.render("auth/signup")
})

router.post("/signup", function(req,res){
  const user = new User()
  user.username = req.body.username;
  user.password = req.body.password;
  user.token = randtoken.generate(16);
  user.save()
  .then( function(user){
    // sign in user
    req.session.userId = user._id;
    res.redirect("/")
  })
  .catch( function(validationError){
    res.render("auth/signup", {
      user: user,
      validationError: validationError
    })
  })
})

module.exports = router;
