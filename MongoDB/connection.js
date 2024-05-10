const { connect } = require("mongoose");

async function connectMongoDb(url) {
  return connect(url);
}

module.exports = { connectMongoDb };
