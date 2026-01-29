import express from "express";
import { authUser } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  addRecentSearchedCity,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.get("/", authUser, getUserProfile);
userRoute.post("/store-recent-search", authUser, addRecentSearchedCity);
export default userRoute;
