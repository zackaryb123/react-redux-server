'use strict';
const {Data} = require('./data');
const {User} = require('./user');
const {localStrategy, jwtStrategy} = require('./auth');

module.exports = {Data, User, localStrategy, jwtStrategy};