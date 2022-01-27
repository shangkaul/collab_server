const User = require("../Models/user");

const getAll = async (req, res) => {
	const user = await User.find({});
  if (user) {
		res.status(200).json({
			message: "Found",
			items:user,
		});
	} else {
		res.status(400).json({
			message: "Bad request",
		});
	}
};

module.exports = { getAll };