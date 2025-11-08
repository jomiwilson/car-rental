import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

export default function CarDetail(){
  const { id } = useParams();
  const [car, setCar] = useState(null);
  useEffect(()=> { API.get(`/cars/${id}`).then(r=>setCar(r.data)).catch(console.error); }, [id]);
  if(!car) return <div>Loading...</div>;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <img src={car.images?.[0] || 'https://via.placeholder.com/800x400'} alt="" className="rounded shadow w-full" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{car.make} {car.model} ({car.year})</h2>
        <p className="text-gray-600 mb-4">Seats: {car.seats} • {car.transmission}</p>
        <p className="text-xl font-semibold mb-4">₹{car.pricePerDay}/day</p>
        <Link to={`/booking/${car._id}`} className="bg-green-600 text-white px-4 py-2 rounded">Book Now</Link>
      </div>
    </div>
  );
}
