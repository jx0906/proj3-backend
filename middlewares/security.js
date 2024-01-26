const utilSecurity = require("../util/security");

module.exports = {
  checkJWT,
  checkLogin,
  checkIfOwner,
};

function checkJWT(req, res, next) {
  let token = req.get("Authorization") || req.query.token;
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
    try {
      const jwt = utilSecurity.verifyJWT(token);
      req.user = jwt.payload;
    } catch (err) {
      console.log(err);
      req.user = null;
    }
  }
  next();
}

function checkLogin(req, res, next) {
  if (!req.user) return res.status(401).json("Unauthorized");
  next();
}

function checkIfOwner(req, res, next) {
  if (!req.user) return res.status(401).json("Unauthorized");
  if (!req.user.isOwner) return res.status(401).json("Unauthorized");
  next();
}
