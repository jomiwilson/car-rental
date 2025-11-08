import React, {useState, useEffect} from 'react';
import API from '../api';

export default function AdminDashboard({user}){
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({make:'',model:'',year:2020,pricePerDay:1000,seats:4,transmission:'automatic',registrationNumber:''});

  useEffect(()=> { fetchCars(); }, []);
  const fetchCars = ()=> API.get('/cars').then(r=>setCars(r.data)).catch(console.error);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/cars', form);
      setForm({make:'',model:'',year:2020,pricePerDay:1000,seats:4,transmission:'automatic',registrationNumber:''});
      fetchCars();
    } catch (err) { alert(err.response?.data?.msg || 'Error'); }
  };

  if(!user || user.role !== 'admin') return <div className="p-6 bg-white rounded shadow">Admin access only</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add Car</h3>
        <form onSubmit={submit} className="space-y-2">
          <input className="w-full border p-2 rounded" placeholder="Make" value={form.make} onChange={e=>setForm({...form, make:e.target.value})} required />
          <input className="w-full border p-2 rounded" placeholder="Model" value={form.model} onChange={e=>setForm({...form, model:e.target.value})} required />
          <input type="number" className="w-full border p-2 rounded" placeholder="Year" value={form.year} onChange={e=>setForm({...form, year:parseInt(e.target.value||0)})} />
          <input type="number" className="w-full border p-2 rounded" placeholder="Price Per Day" value={form.pricePerDay} onChange={e=>setForm({...form, pricePerDay:parseInt(e.target.value||0)})} />
          <input className="w-full border p-2 rounded" placeholder="Registration Number" value={form.registrationNumber} onChange={e=>setForm({...form, registrationNumber:e.target.value})} />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Add Car</button>
        </form>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Fleet</h3>
        <div className="space-y-2">
          {cars.map(c=> (
            <div key={c._id} className="flex justify-between items-center border-b py-2">
              <div>
                <div className="font-semibold">{c.make} {c.model}</div>
                <div className="text-sm text-gray-600">₹{c.pricePerDay}/day • {c.registrationNumber}</div>
              </div>
              <button onClick={()=>{ if(confirm('Delete?')) API.delete(`/cars/${c._id}`).then(()=>fetchCars()) }} className="text-red-600">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
