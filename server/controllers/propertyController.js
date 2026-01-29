import { v2 as cloudinary } from "cloudinary";
import Agency from "../models/Agency.js";
import Property from "../models/Property.js";

// Create a new property [POST '/properties']
export const createNewProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      country,
      address,
      area,
      propertyType,
      priceRent,
      priceSale,
      bedrooms,
      bathrooms,
      garages,
      amenities,
    } = req.body;

    const agency = await Agency.findOne({ owner: req.auth.userId });

    if (!agency) {
      return res.json({ success: false, message: "Agency not found" });
    }

    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Property.create({
      agency: agency._id,
      title,
      description,
      city,
      country,
      address,
      area,
      propertyType,
      price: {
        rent: priceRent ? +priceRent : null,
        sale: priceSale ? +priceSale : null,
      },
      facilities: {
        bedrooms: +bedrooms,
        bathrooms: +bathrooms,
        garages: +garages,
      },
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: "Property created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all properties [GET '/properties']
export const getAllAvailableProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isAvailable: true }).populate({
      path: "agency",
      populate: {
        path: "owner",
        select: "image email",
      },
    });

    res.json({ success: true, properties });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get properties of the logged-in agency/owner [GET '/properties/owner']
export const getOwnerProperties = async (req, res) => {
  try {
    const agencyData = await Agency.findOne({ owner: req.auth.userId });

    const properties = await Property.find({
      agency: agencyData._id.toString(),
    }).populate("agency");

    res.json({ success: true, properties });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Toggle availability status of a property [POST '/properties/toggle-availability']
export const togglePropertyAvailability = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const propertyData = await Property.findById(propertyId);
    propertyData.isAvailable = !propertyData.isAvailable;
    await propertyData.save();

    res.json({
      success: true,
      message: "Property availability updated successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
