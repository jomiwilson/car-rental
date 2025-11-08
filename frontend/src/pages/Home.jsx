import React from 'react';
export default function Home(){
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Rent a Car, Anywhere</h1>
      <p className="text-gray-600 mb-6">Simple, fast booking and an easy fleet manager for admins.</p>
      <div className="flex justify-center">
        <a href="/cars" className="bg-blue-600 text-white px-6 py-3 rounded">Browse Cars</a>
      </div>
    </div>
  );
}
