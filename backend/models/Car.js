const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  seats: Number,
  transmission: {type: String, enum: ['automatic','manual'], default:'automatic'},
  pricePerDay: {type: Number, required:true},
  registrationNumber: {type:String, unique:true},
  images: [String],
  features: [String],
  isActive: {type:Boolean, default:true},
}, {timestamps:true});

module.exports = mongoose.model('Car', CarSchema);
