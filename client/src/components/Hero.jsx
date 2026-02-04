import React, { useState } from "react";
import { assets } from "../assets/data";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Hero = () => {
  const { navigate, getToken, axios, searchedCities, setSearchedCities } =
    useAppContext();

  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();

    if (!destination.trim()) {
      return toast.error("Please enter a destination");
    }

    // Navigate to listing page with query
    navigate(`/listing?destination=${destination}`);

    try {
      const token = await getToken();

      // ✅ Correct API endpoint (backend route)
      await axios.post(
        "/api/users/store-recent-search",
        { recentSearchedCity: destination },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Add destination to searchedCities max 3 recent search city
      setSearchedCities((prevSearchedCities = []) => {
        const updated = [...prevSearchedCities, destination];

        // remove duplicates (optional but good)
        const unique = [...new Set(updated)];

        // keep only last 3
        while (unique.length > 3) {
          unique.shift();
        }

        return unique;
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to save recent search",
      );
    }
  };

  return (
    <section className="h-screen w-screen bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="max-padd-container h-screen w-screen">
        <div className="absolute inset-0 bg-black/10 z-0"></div>

        <div className="relative flex justify-end mx-auto flex-col gap-4 h-full py-6 sm:pt-18 z-10">
          <div className="flex flex-col mt-12 text-white">
            <button className="max-w-80 flex items-center space-x-3 border border-white medium-13 rounded-full px-4 pr-0.5 py-1 cursor-pointer">
              <span>Explore how we simplify stays and spaces</span>
              <span className="flexCenter size-6 p-1 rounded-full bg-white">
                <img src={assets.right} alt="rightIcon" width={20} />
              </span>
            </button>

            <h2 className="h2 capitalize leading-tight mt-3 my-2 text-white max-w-lg">
              Explore
              <span className="bg-gradient-to-r from-secondary to-white bg-clip-text text-transparent">
                {" "}
                exceptional properties{" "}
              </span>{" "}
              located in stunning surroundings.
            </h2>
          </div>

          <form
            onSubmit={onSearch}
            className="bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col lg:flex-row gap-4 lg:gap-x-8 lg:max-w-full ring-1 max-w-md ring-slate-900/5 relative"
          >
            {/* Destination */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.pin} alt="pinIcon" width={20} />
                <label htmlFor="destinationInput">Destination</label>
              </div>

              <input
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                list="destinations"
                type="text"
                id="destinationInput"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                placeholder="Type here..."
                required
              />

              <datalist id="destinations">
                {(searchedCities || []).map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>

            {/* Check-in */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.calendar} alt="calendarIcon" width={20} />
                <label htmlFor="checkIn" className="ml-2">
                  Check-in
                </label>
              </div>

              <input
                type="date"
                id="checkIn"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                required
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.calendar} alt="calendarIcon" width={20} />
                <label htmlFor="checkOut" className="ml-2">
                  Check-out
                </label>
              </div>

              <input
                type="date"
                id="checkOut"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.user} alt="userIcon" width={20} />
                <label htmlFor="guests" className="ml-2">
                  Guests
                </label>
              </div>

              <input
                min={1}
                max={5}
                type="number"
                id="guests"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                placeholder="0"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-6 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"
            >
              <img
                src={assets.search}
                alt="searchIcon"
                width={20}
                className="invert"
              />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
