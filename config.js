'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL ||
  //`mongodb://localhost:${process.env.PORT || 27017}/react-redux-server`;
  'mongodb://react-redux-reusable-user:Digger123!@ds253831.mlab.com:53831/react-redux-reusable';

exports.PORT = process.env.PORT || 27017;
exports.JWT_SECRET = process.env.JWT_SECRET || 'zackaryb123';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

exports.CLIENT_ORIGIN = '*';