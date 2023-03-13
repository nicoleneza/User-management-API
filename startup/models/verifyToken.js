const config = require("config");
const jwt = require("jsonwebtoken");

const  auth= async(req, res, next) =>{
  const token = req.header("Authorization");
  console.log('Token......',token.split('Bearer ')[1])
  if (!token) return res.send("token missing..").status(401);
  try {
    const decoded =await jwt.verify(
      token.split("Bearer ")[1],
      '12345'
    );
    //add user to the request body
    req.user = decoded;
    next();
  } catch (err) {
    return res.send("invalid token").status(400);
  }
}
module.exports = auth;
