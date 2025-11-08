const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { protect, authorize } = require('../middleware/auth');

function isOverlap(startA, endA, startB, endB) {
  return (startA <= endB) && (startB <= endA);
}

router.post('/', protect, async (req,res)=>{
  try {
    const { carId, startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if(start >= end) return res.status(400).json({msg:'Invalid dates'});

    const car = await Car.findById(carId);
    if(!car) return res.status(404).json({msg:'Car not found'});

    const existing = await Booking.find({ car:carId, status:'booked' });
    for(const b of existing){
      if(isOverlap(start, end, b.startDate, b.endDate)) {
        return res.status(400).json({msg:'Car not available for selected dates'});
      }
    }

    const msPerDay = 1000*60*60*24;
    const days = Math.ceil((end - start)/msPerDay);
    const totalPrice = days * car.pricePerDay;

    const booking = new Booking({
      user: req.user._id,
      car: carId,
      startDate: start,
      endDate: end,
      totalPrice
    });
    await booking.save();
    res.status(201).json(booking);

  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

router.get('/me', protect, async (req,res)=>{
  const bookings = await Booking.find({ user: req.user._id }).populate('car');
  res.json(bookings);
});

router.get('/', protect, authorize('admin'), async (req,res)=>{
  const bookings = await Booking.find().populate('car').populate('user','name email');
  res.json(bookings);
});

router.put('/:id/cancel', protect, async (req,res)=>{
  const booking = await Booking.findById(req.params.id);
  if(!booking) return res.status(404).json({msg:'Not found'});
  if(!booking.user.equals(req.user._id) && req.user.role !== 'admin') {
    return res.status(403).json({msg:'Forbidden'});
  }
  booking.status = 'cancelled';
  await booking.save();
  res.json(booking);
});

module.exports = router;
