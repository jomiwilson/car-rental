const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  car: {type: mongoose.Schema.Types.ObjectId, ref:'Car', required:true},
  startDate: {type: Date, required:true},
  endDate: {type: Date, required:true},
  totalPrice: {type: Number, required:true},
  status: {type: String, enum:['booked','cancelled','completed'], default:'booked'},
  createdAt: {type: Date, default: Date.now}
});

BookingSchema.index({car:1, startDate:1, endDate:1});

module.exports = mongoose.model('Booking', BookingSchema);
