const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
  name: String,
  memberList: [mongoose.Schema.Types.ObjectId],
  taskList: [mongoose.Schema.Types.ObjectId]
},{collection:'workspace'});

module.exports = mongoose.model("ws", workspaceSchema);