'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DataSchema = mongoose.Schema({
  id: {type: String, unique: true},
  data: {type: Array, default: []},
  status: {type: Number, default: 0},
  message: {type: String, default: 'none'},
  points: {type: Number, default: 0},
  admin: {type: Boolean, default: false},
  time_stamp: {type: Date}
});

DataSchema.methods.apiRepr = function () {
  return {
    id: this.id,
    data: this.data,
    status: this.status,
    message: this.message,
    points: this.points,
    admin: this.admin,
    time_stamp: this.time_stamp
  };
};

const Data = mongoose.model('Data', DataSchema);

module.exports = {Data};