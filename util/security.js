var jwt = require("jsonwebtoken");

module.exports = {
  createJWT,
  getExpiry,
  verifyJWT,
};

function createJWT(payload) {
  return jwt.sign(
    // data payload
    { payload },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

function getExpiry(token) {
  const payloadBase64 = token.split(".")[1];
  const decodedJson = Buffer.from(payloadBase64, "base64").toString();
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  return exp;
}

function verifyJWT(token) {
  const payload = jwt.verify(
    token,
    process.env.SECRET,
    function (err, decoded) {
      // If valid token, decoded will be the token's entire payload
      // If invalid token, err will be set
      if (err) {
        return null;
      }
      return decoded;
    }
  );
  return payload;
}
