var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require("passport");
var cors = require('cors');
var app = express();
const port = process.env.PORT || 3000;

const server=require("http").Server(app);
// const io = require("socket.io")(server);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const dbURI = process.env['dbURI'];
var usersRouter = require('./Routes/users.routes');
var wsRouter = require('./Routes/ws.routes');
var taskRouter = require('./Routes/task.routes');
mongoose
	.connect(dbURI)
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./Config/passport")(passport);



app.use('/users', usersRouter);
app.use('/ws', wsRouter);
app.use('/task', taskRouter);







server.listen(8080,() => console.log("http server start"));

// app.listen(port);
// console.log('Express app started on port ' + port);
io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

    console.log('new client connected');
    socket.on("ws",(id)=>{
      console.log("ws")
      console.log(id);
});
socket.on("refresh_task",(id)=>{
      socket.broadcast.emit("client_refresh");
      console.log("client_refresh_called");

      });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err).json({
    message: "Error Message"
  })
});
module.exports = app;