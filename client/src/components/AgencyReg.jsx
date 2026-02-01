import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, cities } from "../assets/data";
import toast from "react-hot-toast";

const AgencyReg = () => {
  const { setShowAgencyReg, axios, getToken, setIsOwner } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // prevent page reload
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/agencies",
        { name, contact, email, address, city },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowAgencyReg(false); // close modal on success
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <div
      onClick={() => setShowAgencyReg(false)} // click outside closes modal
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/80"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
        className="flex flex-col md:flex-row bg-white rounded-xl max-w-4xl max-md:mx-2 relative"
      >
        {/* Left image */}
        <img
          src={assets.createPrp}
          alt="createPrp img"
          className="w-1/2 rounded-l-xl hidden md:block"
        />

        {/* Form */}
        <div className="flex flex-col md:w-1/2 p-8 md:p-10 relative">
          {/* Close button */}
          <img
            onClick={() => setShowAgencyReg(false)}
            src={assets.close}
            alt="Close"
            className="absolute top-4 right-4 h-6 w-6 p-1 cursor-pointer bg-secondary/50 rounded-full shadow-md"
          />

          <h3 className="h3 mb-6">Register Agency</h3>

          {/* Name & Contact */}
          <div className="flex gap-2 xl:gap-3">
            <div className="flex-1">
              <label htmlFor="name" className="medium-14">
                Agency Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                type="text"
                placeholder="Type here..."
                className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="contact" className="medium-14">
                Contact
              </label>
              <input
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                id="contact"
                type="text"
                placeholder="Type here..."
                className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="w-full mt-4">
            <label htmlFor="email" className="medium-14">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
              placeholder="Type here..."
              className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
              required
            />
          </div>

          {/* Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="medium-14">
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id="address"
              type="text"
              placeholder="Type here..."
              className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none"
              required
            />
          </div>

          {/* City */}
          <div className="w-full mt-4 max-w-60">
            <label htmlFor="city" className="medium-14">
              City
            </label>
            <select
              onChange={(e) => setCity(e.target.value)}
              value={city}
              id="city"
              className="regular-14 border bg-secondary/10 border-slate-900/10 rounded-lg w-full px-3 py-2.5 mt-1 outline-none"
              required
            >
              <option value="">Select City</option>
              {cities.map((cityItem) => (
                <option key={cityItem} value={cityItem}>
                  {cityItem}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button className="btn-dark py-2 rounded-lg w-32 mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgencyReg;
