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
import helmet from 'helmet';
import { connectDB } from '../config/db.js';
import authRoutes from '../routes/auth.js';

dotenv.config();

const app = express();

// --- Production Improvements ---

// 1. Set Security Headers
app.use(helmet());

// 2. Configure CORS for Production (Simplified and Corrected)
// This single block of code is enough to handle all requests,
// including the preflight OPTIONS requests.
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));


// --- Standard Middleware ---
app.use(express.json());


// --- API Routes ---
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/users", authRoutes);


// --- Centralized Error Handling ---
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
app.use(errorHandler);


// --- Server Startup ---
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});