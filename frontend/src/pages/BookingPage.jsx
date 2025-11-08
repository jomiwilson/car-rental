import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import API from '../api';

export default function BookingPage({user}){
  const { carId } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/bookings', {carId, startDate, endDate});
      navigate('/cars');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Error');
    }
  };

  if(!user) return <div className="p-6 bg-white rounded shadow">Please <a href="/login" className="text-blue-600">login</a> to book.</div>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-semibold mb-3">Book Car</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Start</label>
          <input type="date" className="border p-2 rounded w-full" value={startDate} onChange={e=>setStartDate(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">End</label>
          <input type="date" className="border p-2 rounded w-full" value={endDate} onChange={e=>setEndDate(e.target.value)} required />
        </div>
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Confirm Booking</button>
        </div>
        {msg && <div className="text-red-600">{msg}</div>}
      </form>
    </div>
  );
}
