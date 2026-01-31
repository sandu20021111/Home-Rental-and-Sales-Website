import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ RAW payload (important)
    const payload = req.body.toString("utf8");

    // ✅ Verify webhook + get event
    const event = whook.verify(payload, headers);

    const { data, type } = event;

    console.log("Webhook received:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
        };

        await User.create(userData);
        console.log("User saved to DB:", data.id);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
        };

        await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log("User updated in DB:", data.id);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("User deleted from DB:", data.id);
        break;
      }

      default:
        console.log("Unhandled event type:", type);
        break;
    }

    return res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.log("Webhook error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
