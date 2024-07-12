const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  //req will  be having the token generated
  const token = req.headers.authorization;
  if (!token && token.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  //get the token decoded
  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
