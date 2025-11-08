require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Car = require('./models/Car');

connectDB();

async function seed(){
  await User.deleteMany({});
  await Car.deleteMany({});
  const pwd = await bcrypt.hash('admin123', 10);
  const admin = new User({name:'Admin', email:'admin@rent.com', password:pwd, role:'admin'});
  await admin.save();

 const cars = [
  {
    name: "Toyota Innova",
    type: "SUV",
    pricePerDay: 3500,
    registrationNumber: "KA01AB1234",
    images: [
      "https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.webp?s=2048x2048&w=is&k=20&c=u_vqLBX3koM67osQVXrWogzYtvgpx__mORzyfBLXo6U="
    ]
  },
  {
    name: "Honda City",
    type: "Sedan",
    pricePerDay: 2800,
    registrationNumber: "KA01AB1235",
    images: [
      "https://media.istockphoto.com/id/907671134/photo/new-red-metallic-sedan-car-in-spotlight-modern-desing-brandless.jpg?s=2048x2048&w=is&k=20&c=0nJElJsLTVqLDdh1zuENoao6CkFB0ogoKBP6wAWINyQ="
    ]
  },
  {
    name: "Maruti Swift",
    type: "Hatchback",
    pricePerDay: 1800,
    registrationNumber: "KA01AB1236",
    images: [
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/swift-exterior-right-front-three-quarter-31.png?isig=0&q=80"
    ]
  },
  {
    name: "Mahindra XUV700",
    type: "SUV",
    pricePerDay: 4200,
    registrationNumber: "KA01AB1237",
    images: [
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/42355/xuv700-exterior-right-front-three-quarter-2.png?isig=0&q=80"
    ]
  }
];






  await Car.insertMany(cars);
  console.log('Seed done. Admin: admin@rent.com / admin123');
  process.exit();
}
seed();
