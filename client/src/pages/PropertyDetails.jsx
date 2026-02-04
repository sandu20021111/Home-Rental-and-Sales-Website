import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import PropertyImages from "../components/PropertyImages";
import { assets } from "../assets/data";
import toast from "react-hot-toast";

const PropertyDetails = () => {
  const { Currency, properties, navigate, axios, getToken } = useAppContext();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // Check availability API
  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      return toast.error("Please select check-in and check-out dates");
    }

    try {
      const token = await getToken(); // Get Clerk token
      const { data } = await axios.post(
        `/api/bookings/check-availability`,
        { propertyId: id, checkInDate, checkOutDate, guests },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success && data.isAvailable) {
        setIsAvailable(true);
        toast.success("Property is available for the selected dates");
      } else {
        setIsAvailable(false);
        toast.error("Property is not available for the selected dates");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Book property API
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isAvailable) return checkAvailability();

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `/api/bookings/book`,
        {
          property: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "pay at check_in",
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Load property from context
  useEffect(() => {
    const prop = properties.find((p) => p._id === id);
    if (prop) setProperty(prop);
  }, [properties, id]);

  if (!property) return null;

  return (
    <div className="bg-gradient-to-r from-[#fffbee] to-white py-16 pt-28">
      <div className="max-padd-container">
        {/* Property Images */}
        <PropertyImages property={property} />

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8 mt-6">
          {/* Left Column */}
          <div className="p-4 flex-2 rounded-xl border border-slate-900/10">
            <p className="flexStart gap-x-2">
              <img src={assets.pin} alt="" width={19} />
              <span>{property.address}</span>
            </p>

            <div className="flex justify-between flex-col sm:flex-row sm:items-end mt-3">
              <h3 className="h3">{property.title}</h3>
              <div className="bold-18">
                {Currency}
                {property.price.sale} | {Currency}
                {property.price.rent}.00/night
              </div>
            </div>
            <div className="flex justify-between items-start my-1">
              <h4 className="h4 text-secondary">{property.propertyType}</h4>
              <div className="flex items-baseline gap-2 text-secondary relative top-1.5">
                <h4 className="bold-18 relative bottom-0.5 text-black">5.0</h4>
                <img src={assets.star} alt="star icon" width={18} />
                <img src={assets.star} alt="star icon" width={18} />
                <img src={assets.star} alt="star icon" width={18} />
                <img src={assets.star} alt="star icon" width={18} />
                <img src={assets.star} alt="star icon" width={18} />
              </div>
            </div>
            <div className="flex gap-x-4 mt-3">
              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.bed} alt="" width={19} />
                {property.facilities.bedrooms}
              </p>

              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.bath} alt="" width={19} />
                {property.facilities.bathrooms}
              </p>

              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.car} alt="" width={19} />
                {property.facilities.garages}
              </p>

              <p className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
                <img src={assets.ruler} alt="" width={19} />
                400
              </p>
            </div>
            <div className="mt-6">
              <h4 className="h4 mt-4 mb-1">PropertyDetails</h4>
              <p className="mb-4">{property.description}</p>
            </div>
            <h4 className="h4 mt-6 mb-2">Amentities</h4>
            <div className=" flex gap-3">
              {property.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="p-3 py-1 rounded-lg bg-secondary/10 ring-1 ring-slate-900/10 text-sm"
                >
                  {amenity}
                </div>
              ))}
            </div>

            {/* Availability Form */}
            <form
              onSubmit={onSubmitHandler}
              className="text-gray-500 bg-secondary/10 rounded-lg px-6 py-4 flex flex-col lg:flex-row gap-4 lg:gap-x-8 lg:max-w-full ring-1 max-w-md ring-slate-900/5 relative mt-10"
            >
              {/* Check-in */}
              <div className="flex flex-col w-full">
                <label>Check-in</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  className="rounded bg-secondary/10 border border-gray-200 px-3 py-1.5 text-sm outline-none"
                />
              </div>

              {/* Check-out */}
              <div className="flex flex-col w-full">
                <label>Check-out</label>
                <input
                  type="date"
                  min={checkInDate || new Date().toISOString().split("T")[0]}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  disabled={!checkInDate}
                  className="rounded bg-secondary/10 border border-gray-200 px-3 py-1.5 text-sm outline-none"
                />
              </div>

              {/* Guests */}
              <div className="flex flex-col w-full">
                <label>Guests</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="rounded bg-secondary/10 border border-gray-200 px-3 py-1.5 text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="flexCenter gap-1 rounded-md btn-dark min-w-44"
              >
                <img
                  src={assets.search}
                  alt="searchIcon"
                  width={20}
                  className="invert"
                />
                <span>{isAvailable ? "Book Property" : "Check Dates"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
