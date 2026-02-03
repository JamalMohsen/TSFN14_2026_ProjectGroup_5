import 'dotenv/config'; // auto-load .env

import express from "express";
import cors from "cors"; 
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import carModelRoutes from "./routes/carModelRoutes.js";
import carPartRoutes from "./routes/carPartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";


connectDB();

const app = express();

// Enable CORS for all routes (development)
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/carmodels", carModelRoutes);
app.use("/api/carparts", carPartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handler
// Error handler
app.use(notFound);
app.use(errorHandler);


// Test endpoints
app.get("/", (req, res) => res.send("Start page"));
app.get("/auth", (req, res) => res.send("Auth backend is running!"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
