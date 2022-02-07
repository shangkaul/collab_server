const Task = require("../Models/task");
const mongoose = require("mongoose");


const fetchTask=async(req,res) =>{
  const id = mongoose.Types.ObjectId(req.body.ws_id);
  console.log(id)
  await Task.find({ workspace:id}).then(tasks => {
    if (!tasks) {
      return res.status(200).json({ taskList: [] });
    }
    else{
      return res.status(200).json({taskList:tasks});
    }
  });
}


const delTask=async(req,res) =>{
  await Task.deleteOne({ _id: req.body.id })
            .then(item=> res.status(200).json(item))
            .catch(err=>res.status(500).json(err));
}

const addTask=async(req,res) =>{
  const newTask = new Task({
    title:req.body.title,
    content:req.body.content,
    workspace: mongoose.Types.ObjectId(req.body.ws_id)
  });
  if(req.body.id=="")
  {
    newTask.save()
            .then(item => res.json(item))
            .catch(err => console.log(err));
  }
  else
  {
   await Task.findById(mongoose.Types.ObjectId(req.body.id), function (err, doc) {
  if (err) res.status(500).json(err);

  doc.title = req.body.title;
  doc.content = req.body.content;
  doc.save()
     .then(item => res.json(item))
     .catch(err => console.log(err));
}).clone();
  }
}

module.exports = { fetchTask,addTask, delTask };