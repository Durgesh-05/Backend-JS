const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${new Date().toLocaleDateString()} : ${req.method} ${req.path}`,
      (err) => {
        if (!err) next();
      }
    );
  };
}

module.exports = { logReqRes };
