import CarPart from "../models/CarPart.js";
import { sendEmail } from "../utils/emailService.js";
import User from "../models/User.js";
import Wishlist from "../models/Wishlist.js";

// @desc    Get all car parts (with optional filters + search)
// @route   GET /api/carparts
// @access  Public
export const getCarParts = async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.modelId) filters.carModel = req.query.modelId;
    if (req.query.inStock) filters.stock = { $gt: 0 };

    if (req.query.search) {
      filters.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { category: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const parts = await CarPart.find(filters).populate("carModel");

    console.log(`[INFO] getCarParts -> returned ${parts.length} items`);
    res.json(parts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get car part by ID
// @route   GET /api/carparts/:id
// @access  Public
export const getCarPartById = async (req, res, next) => {
  try {
    const part = await CarPart.findById(req.params.id).populate("carModel");

    if (!part) {
      res.status(404);
      throw new Error("Car part not found");
    }

    res.json(part);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new car part
// @route   POST /api/carparts
// @access  Public (or Admin if you add auth)
export const createCarPart = async (req, res, next) => {
  try {
    const { name, description, price, stock, carModel, category, image } = req.body;

    const part = new CarPart({
      name,
      description,
      price,
      stock,
      carModel,
      category,
      image,
    });

    const createdPart = await part.save();

    console.log(`[INFO] createCarPart -> created ${createdPart._id}`);

    // Notify all customers via email (external dependency)
    try {
      const customers = await User.find({ role: "customer" });
      const emails = customers.map((u) => u.email);

      if (emails.length > 0) {
        await sendEmail(
          emails,
          "🆕 New Car Part Added!",
          `A new car part "${createdPart.name}" has just been added to MMJAuto. Check it out!`
        );
        console.log(`[INFO] createCarPart -> email sent to ${emails.length} customers`);
      }
    } catch (emailErr) {
      // We log but do not crash the request (fault-tolerance improvement)
      console.error(`[WARN] createCarPart email failed: ${emailErr.message}`);
    }

    res.status(201).json(createdPart);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing car part
// @route   PUT /api/carparts/:id
// @access  Public (or Admin if you add auth)
export const updateCarPart = async (req, res, next) => {
  try {
    const oldPart = await CarPart.findById(req.params.id);
    if (!oldPart) {
      res.status(404);
      throw new Error("Car part not found");
    }

    const updatedPart = await CarPart.findByIdAndUpdate(req.params.id, req.body, { new: true });

    console.log(`[INFO] updateCarPart -> updated ${req.params.id}`);

    // Restock notification: if stock was 0 (or less) and now > 0
    if (oldPart.stock <= 0 && updatedPart.stock > 0) {
      try {
        const wishlists = await Wishlist.find({ carParts: updatedPart._id }).populate("user");
        const emails = wishlists.map((w) => w.user?.email).filter(Boolean);

        if (emails.length > 0) {
          await sendEmail(
            emails,
            "✅ Car Part Back in Stock!",
            `Good news! "${updatedPart.name}" is now back in stock at MMJAuto. Check your wishlist!`
          );
          console.log(`[INFO] updateCarPart -> restock email sent to ${emails.length} users`);
        }
      } catch (emailErr) {
        console.error(`[WARN] updateCarPart restock email failed: ${emailErr.message}`);
      }
    }

    res.json(updatedPart);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a car part
// @route   DELETE /api/carparts/:id
// @access  Public (or Admin if you add auth)
export const deleteCarPart = async (req, res, next) => {
  try {
    const part = await CarPart.findById(req.params.id);
    if (!part) {
      res.status(404);
      throw new Error("Car part not found");
    }

    await part.deleteOne();
    console.log(`[INFO] deleteCarPart -> deleted ${req.params.id}`);

    res.json({ message: "Car part removed" });
  } catch (error) {
    next(error);
  }
};
