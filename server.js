require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const {authRouter, userRouter, dataRouter } = require('./routes/index');
const { localStrategy, jwtStrategy } = require('./models/index');

mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');

const server = express();

server.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);

//server.use(bodyParser.json());
//server.use(bodyParser.urlencoded({ extended: true }));

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/user', userRouter);
server.use('/data', dataRouter);
server.use('/auth', authRouter);


server.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

function runServer() {
  return new Promise((res, rej) => {
    mongoose.connect(DATABASE_URL, {useNewUrlParser: true}, err => {
      if(err) {
        return rej(err);
      }
      server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        res();
      }).on('error', err => {
        mongoose.disconnect();
        rej(err);
      })
    }).catch(err => console.log(err) && rej(err))
  })
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((res, rej) => {
      console.log('Closing Server');
      server.close(err => {
        if (err) {
          return rej(err)
        }
        res();
      }).catch(err => console.log(err) && rej(err))
    });
  });
}

if(require.main === module) {{
  runServer().catch(err => console.log(err));
}}

module.exports = {server ,runServer, closeServer};
