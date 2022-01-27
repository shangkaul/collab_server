const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
  name: String
},{collection:'user'});

module.exports = mongoose.model("User", userSchema);