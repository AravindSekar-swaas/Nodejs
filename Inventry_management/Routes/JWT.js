const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("Token is required");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(401).send("Invalid Token");
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
