const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
  token: { type: String, required: true },
  createdAt: {type: Date, default: Date.now}
});

const BlackListModel = mongoose.model("BlackListUser", blackListSchema);

module.exports = BlackListModel;
