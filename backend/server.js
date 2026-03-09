import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import carModelRoutes from "./routes/carModelRoutes.js";
import carPartRoutes from "./routes/carPartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

// Enable CORS (allow frontend)
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging 
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

// TEST ROUTES
app.get("/", (req, res) => {
  res.send("Start page");
});

app.get("/auth", (req, res) => {
  res.send("Auth backend is running!");
});


// HEALTH CHECKS FOR KUBERNETES
app.get("/health/startup", (req, res) => {
  res.status(200).send("Startup OK");
});

app.get("/health/ready", (req, res) => {
  res.status(200).send("Ready");
});

app.get("/health/live", (req, res) => {
  res.status(200).send("Alive");
});


// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/carmodels", carModelRoutes);
app.use("/api/carparts", carPartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notifications", notificationRoutes);

// ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

//  Export app for tests
export default app;

// Only connect DB + start server if NOT running tests
if (process.env.NODE_ENV !== "test") {
  connectDB().catch((err) => {
    console.error("Database connection failed:", err.message);
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}