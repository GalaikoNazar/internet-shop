const crypto = require("crypto");

module.exports.hashPass = password => {
  let hash = crypto
    .createHmac("sha1", "sombrero")
    .update(password)
    .digest("hex");
  return hash;
};
