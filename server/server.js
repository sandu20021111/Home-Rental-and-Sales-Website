import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from "@clerk/express";

import connectCloudinary from "./config/cloudinary.js";

import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoute.js";
import agencyRouter from "./routes/agencyRoute.js";
import propertyRouter from "./routes/propertyRoute.js";
import bookingRouter from "./routes/bookingRoute.js";

await connectDB();
await connectCloudinary();

const app = express();
app.use(cors());

// ✅ IMPORTANT: Clerk Webhook must use RAW body
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks,
);

// ✅ Other routes can use JSON parser
app.use(express.json());

// Clerk middleware (for protected routes)
app.use(clerkMiddleware());

app.use("/api/users", userRouter);
app.use("/api/agencies", agencyRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/bookings", bookingRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API successfully connected");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
