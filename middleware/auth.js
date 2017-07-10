const User = require("../models/User");

module.exports = function(req,res,next){
  if (req.session.userId){
    User.find({"_id": req.session.userId})
    .then(function(user){
      req.user = user;
      next();
    })
  } else {
    res.redirect("/signin")
  }
}
