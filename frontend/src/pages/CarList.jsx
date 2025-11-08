import React, {useState, useEffect} from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function CarList(){
  const [cars, setCars] = useState([]);
  useEffect(()=> {
    API.get('/cars').then(res => setCars(res.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map(c=> (
          <div key={c._id} className="bg-white shadow rounded p-4">
            <img src={c.images?.[0] || 'https://via.placeholder.com/600x300'} alt="" className="w-full h-40 object-cover rounded mb-3" />
            <h3 className="font-bold">{c.make} {c.model}</h3>
            <p className="text-sm text-gray-600">Seats: {c.seats} • {c.transmission}</p>
            <div className="flex justify-between items-center mt-3">
              <div className="text-lg font-semibold">₹{c.pricePerDay}/day</div>
              <Link to={`/cars/${c._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
