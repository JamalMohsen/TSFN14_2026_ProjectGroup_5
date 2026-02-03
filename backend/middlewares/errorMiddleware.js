// backend/middlewares/errorMiddleware.js

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  // Om ingen status är satt: 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // ✅ Basic error logging (Task 2)
  console.error(
    `[ERROR] ${new Date().toISOString()} ${req.method} ${req.originalUrl} -> ${statusCode} | ${err.message}`
  );

  let message = err.message;

  // Mongoose: invalid ObjectId
  if (err.name === "CastError") {
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose: validation errors
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongo duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} already exists` : "Duplicate key error";
  }

  res.status(statusCode).json({
    message,
    // visa stack bara i development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
