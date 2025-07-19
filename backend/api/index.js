import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import authRoutes from '../routes/auth.js';

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json());

app.use("/api/users", authRoutes)

connectDB()

app.listen(PORT, ()=>{
    console.log(`server started at ${PORT}`)
})



// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors'; // Keep cors
// import { connectDB } from '../config/db.js';
// import authRoutes from '../routes/auth.js';

// dotenv.config();

// // Initialize Express App
// const app = express();

// // Middleware
// app.use(cors()); // Use cors middleware
// app.use(express.json());

// // API Routes
// app.use("/api/users", authRoutes); // This is the correct version

// // Connect to Database
// connectDB();

// // This is the crucial part for Vercel.
// // We export the app instance. Vercel will take this
// // and automatically handle the server listening part.
// // We DO NOT call app.listen() ourselves.
// export default app;