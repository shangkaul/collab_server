var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require("passport");
var cors = require('cors');
var app = express();
const port = process.env.PORT || 3000;
// const socketIo = require("socket.io");
// var http=require('https');


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

// const server = http.createServer(app);
// const io = socketIo(server); 

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

app.listen(port);
console.log('Express app started on port ' + port);


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