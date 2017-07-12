const User = require("../models/User");
module.exports = function(req,res,next){
  console.log("req.headers", req.headers)
  console.log("req.session", req.session)

  if (req.session.userId){
    User.find({"_id": req.session.userId})
    .then(function(user){
      req.user = user;
      next();
    })
  } else if (req.headers.authorization){
    const token = (req.headers.authorization || "").replace("Bearer ", "")
    User.find({"token": token})
    .then(function(user){
      req.user = user;
      next();
    })
  } else {
    res.status(401).json({status: "Unauthorized"})
  }
}
