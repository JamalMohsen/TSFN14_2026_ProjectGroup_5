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


// Connect to MongoDB
connectDB();

const app = express();


// Enable CORS (allow frontend)
app.use(cors({
  origin: "http://localhost:3000",
}));


// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// ==========================
// TEST ROUTES (put BEFORE error handlers)
// ==========================
app.get("/", (req, res) => {
  res.send("Start page");
});

app.get("/auth", (req, res) => {
  res.send("Auth backend is running!");
});


// ==========================
// API ROUTES
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/carmodels", carModelRoutes);
app.use("/api/carparts", carPartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);


// ==========================
// ERROR HANDLERS (MUST BE LAST)
// ==========================
app.use(notFound);
app.use(errorHandler);


// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
