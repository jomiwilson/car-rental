const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { protect, authorize } = require('../middleware/auth');

router.get('/', async (req,res) => {
  try {
    const {q, minPrice, maxPrice, seats} = req.query;
    let filter = { isActive: true };
    if(q) filter.$or = [
      { make: new RegExp(q, 'i') },
      { model: new RegExp(q, 'i') },
    ];
    if(minPrice) filter.pricePerDay = { ...filter.pricePerDay, $gte: Number(minPrice) };
    if(maxPrice) filter.pricePerDay = { ...filter.pricePerDay, $lte: Number(maxPrice) };
    if(seats) filter.seats = Number(seats);

    const cars = await Car.find(filter);
    res.json(cars);
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

router.get('/:id', async (req,res)=>{
  try { const car = await Car.findById(req.params.id); res.json(car); }
  catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// ADMIN: create car
router.post('/', protect, authorize('admin'), async (req,res)=>{
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

router.put('/:id', protect, authorize('admin'), async (req,res)=>{
  try { const car = await Car.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json(car); }
  catch(err){ console.error(err); res.status(500).send('Server error'); }
});
router.delete('/:id', protect, authorize('admin'), async (req,res)=>{
  try { await Car.findByIdAndDelete(req.params.id); res.json({msg:'Deleted'}); }
  catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
