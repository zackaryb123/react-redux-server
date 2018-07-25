'use strict';
const {router: authRouter} = require('./auth');
const {router: userRouter} = require('./user');
const {router: dataRouter} = require('./data');

module.exports = {authRouter, userRouter, dataRouter};