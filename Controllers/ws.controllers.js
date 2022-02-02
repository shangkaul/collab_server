const ws = require("../Models/workspace");
const mongoose = require("mongoose");


const getAll = async (req, res) => {
	const workspaces = await ws.find({});
  if (workspaces) {
		res.status(200).json({
			message: "Found",
			items:workspaces,
		});
	} else {
		res.status(400).json({
			message: "Bad request",
		});
	}
};

const findWs=async(req,res) =>{
  const id = mongoose.Types.ObjectId(req.body.user_id);
  console.log(id)
  ws.find({ memberList:{$in:[id]} }).then(ws => {
    // Check if user exists
    if (!ws) {
      return res.status(200).json({ wsList: [] });
    }
    else{
      return res.status(200).json({wsList:ws});
    }
  });
}


module.exports = { getAll,findWs };