const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Message = require('./models/Message');
const User = require('./models/User');

const api = require('./routes/api');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

mongoose.Promise = bluebird;
const db = 'mongodb://localhost/lancehub';
mongoose.connect(db);

app.use(express.static('./client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Socket.io server connection
io.on('connection', (socket) => {
  console.log('made socket connection');

  socket.on('load messages', () => {
    Message.find({}, (err, docs) => {
      if (err) throw err;
      socket.emit('load messages', docs);
    });
  });

  socket.on('message', (message) => {
    const newMessage = new Message(message);
    newMessage.save((err) => {
      if (err) throw err;
      console.log('message saved');
      socket.broadcast.emit('message', message);
    });
  });
});

http.listen(3001, () => {
  console.log('Listening on port 3001');
});
