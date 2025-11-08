Car Rental Booking & Fleet Manager - Full stack
=================================================

Quick start (after downloading and unzipping):

1) Install dependencies
   At project root run:
     npm run install-all

2) Create env file for backend
   cd backend
   cp .env.example .env
   Edit .env and set MONGO_URI and JWT_SECRET

3) Seed database (creates admin user admin@rent.com / admin123 and sample cars)
   cd backend
   npm run seed

4) Start both servers:
   At project root:
     npm run dev

Frontend will open at http://localhost:3000
Backend API runs at http://localhost:5000

Admin credentials (seed): admin@rent.com / admin123
