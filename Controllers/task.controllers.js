const task = require("../Models/task");
const mongoose = require("mongoose");


const fetchTask=async(req,res) =>{
  const id = mongoose.Types.ObjectId(req.body.ws_id);
  console.log(id)
  task.find({ workspace:id}).then(tasks => {
    if (!tasks) {
      return res.status(200).json({ taskList: [] });
    }
    else{
      return res.status(200).json({taskList:tasks});
    }
  });
}


module.exports = { fetchTask };