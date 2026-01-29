import User from "../models/User.js";

export const authUser = async (req, res, next) => {
  const { userId } = req.auth();
  if (!userId) {
    res.json({ success: false });
  } else {
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
};
