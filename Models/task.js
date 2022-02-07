const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  content: String,
  workspace: mongoose.Schema.Types.ObjectId,
},{collection:'task'});

module.exports = mongoose.model("task", taskSchema);