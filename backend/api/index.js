// import express from 'express';
// import dotenv from 'dotenv';
// import { connectDB } from '../config/db.js';
// import authRoutes from '../routes/auth.js';

// dotenv.config();

// const PORT = process.env.PORT || 5000

// const app = express();

// app.use(express.json());

// app.use("/api/users", authRoutes)

// connectDB()

// app.listen(PORT, ()=>{
//     console.log(`server started at ${PORT}`)
// })



// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import { connectDB } from '../config/db.js';
// import authRoutes from '../routes/auth.js';

// dotenv.config();

// const app = express();

// // CORS Configuration - IMPORTANT for decoupled deployment
// // This allows requests from ANY origin. For production, you might want to restrict this.
// app.use(cors());

// // Body Parser Middleware
// app.use(express.json());

// // API Routes
// // The path here should NOT include /api if you want your frontend
// // to call "https://your-api.onrender.com/api/users/login"
// // Let's keep it simple for now.
// app.use("/api/users", authRoutes);


// // Define a simple root route for health checks
// app.get("/", (req, res) => {
//     res.send("API is running...");
// });


// // Connect to Database
// connectDB();

// // Listen for incoming requests
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'; // <-- 1. Import Helmet
import { connectDB } from '../config/db.js';
import authRoutes from '../routes/auth.js';

dotenv.config();

const app = express();

// --- Production Improvements ---

// 1. Set Security Headers
app.use(helmet());

// 2. Configure CORS for Production
const allowedOrigins = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};
app.use(cors(corsOptions));


// --- Standard Middleware ---

// Body Parser Middleware
app.use(express.json());


// --- API Routes ---

// API health check route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// User authentication routes
app.use("/api/users", authRoutes);


// --- Centralized Error Handling ---

// 3. Custom Error Handler Middleware (must be after all routes)
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Set a default status code if one isn't already set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    // In development, you might want to see the stack trace
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
app.use(errorHandler);


// --- Server Startup ---

// Connect to Database and Start Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});