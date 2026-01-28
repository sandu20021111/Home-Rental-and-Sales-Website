import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

await connectDB();

const app = express();
app.use(cors());

// Middleware Setup
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);

//Route Endpoint to check API status
app.get("/", (req, res) => {
  res.send("API sucessfully connected");
});

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`),
);
