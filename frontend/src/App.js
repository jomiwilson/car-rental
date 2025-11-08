import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import API from './api';

function Nav({user, setUser}){
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); navigate('/'); };
  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center py-5 px-2 text-gray-700"> <span className="font-bold">CarRental</span></Link>
            <Link to="/cars" className="py-5 px-3 text-gray-700 hover:text-gray-900">Cars</Link>
          </div>
          <div className="flex items-center space-x-1">
            {user ? (
              <>
                <span className="py-2 px-3 text-sm">Hi, {user.name}</span>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-3">Login</Link>
                <Link to="/register" className="bg-blue-500 text-white px-3 py-2 rounded" >Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App(){
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });

  useEffect(()=> {
    const token = localStorage.getItem('token');
    if(token){
      API.get('/auth/me').then(res => { localStorage.setItem('user', JSON.stringify(res.data)); setUser(res.data); }).catch(()=>{});
    }
  }, []);

  return (
    <BrowserRouter>
      <Nav user={user} setUser={setUser} />
      <div className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/booking/:carId" element={<BookingPage user={user} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
