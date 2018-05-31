var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var annoucement = new Schema ({
  title: String,
  description: String,
  note: String,
  key: String
});

//don't forget :
//in the actual db in mongodb
//is 'annoucements'
module.exports = mongoose.model('Annoucement', annoucement);
