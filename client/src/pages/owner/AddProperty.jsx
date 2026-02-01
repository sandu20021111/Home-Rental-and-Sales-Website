import React, { useState } from "react";
import { assets } from "../../assets/data";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddProperty = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    address: "",
    area: "",
    propertyType: "",
    priceRent: "",
    priceSale: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    amenities: {
      Parking: false,
      Wifi: false,
      Backyard: false,
      Terrace: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // check required fields
    if (
      !inputs.title ||
      !inputs.description ||
      !inputs.city ||
      !inputs.country ||
      !inputs.address ||
      !inputs.area ||
      !inputs.propertyType ||
      (!inputs.priceRent && !inputs.priceSale) ||
      !inputs.bedrooms ||
      !inputs.bathrooms
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    // check at least 1 image
    const hasImage = Object.values(images).some((img) => img !== null);
    if (!hasImage) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("city", inputs.city);
      formData.append("country", inputs.country);
      formData.append("address", inputs.address);
      formData.append("area", inputs.area);
      formData.append("propertyType", inputs.propertyType);

      formData.append("bedrooms", Number(inputs.bedrooms));
      formData.append("bathrooms", Number(inputs.bathrooms));
      formData.append("garages", Number(inputs.garages));

      formData.append(
        "priceRent",
        inputs.priceRent ? Number(inputs.priceRent) : "",
      );
      formData.append(
        "priceSale",
        inputs.priceSale ? Number(inputs.priceSale) : "",
      );

      // amenities -> array
      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key],
      );
      formData.append("amenities", JSON.stringify(amenities));

      // images
      Object.keys(images).forEach((key) => {
        if (images[key]) formData.append("images", images[key]);
      });

      // ✅ get token correctly
      const token = await getToken();

      if (!token) {
        toast.error("Login required. Token not found!");
        setLoading(false);
        return;
      }

      // ✅ FIXED Authorization header (use backticks)
      const { data } = await axios.post("/api/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);

        // reset form
        setInputs({
          title: "",
          description: "",
          city: "",
          country: "",
          address: "",
          area: "",
          propertyType: "",
          priceRent: "",
          priceSale: "",
          bedrooms: "",
          bathrooms: "",
          garages: "",
          amenities: {
            Parking: false,
            Wifi: false,
            Backyard: false,
            Terrace: false,
          },
        });

        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-3.5 px-2 text-sm xl:max-w-3xl"
      >
        <div className="w-full">
          <h5 className="h5">Property Name</h5>
          <input
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            value={inputs.title}
            type="text"
            placeholder="Type here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full"
          />
        </div>

        <div className="w-full">
          <h5 className="h5">Property Description</h5>
          <textarea
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
            value={inputs.description}
            rows={5}
            placeholder="Type here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <h5 className="h5">City</h5>
            <input
              onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
              value={inputs.city}
              type="text"
              placeholder="Type here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <h5 className="h5">Country</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, country: e.target.value })
              }
              value={inputs.country}
              type="text"
              placeholder="Type here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full"
            />
          </div>

          <div>
            <h5 className="h5">Property Type</h5>
            <select
              onChange={(e) =>
                setInputs({ ...inputs, propertyType: e.target.value })
              }
              value={inputs.propertyType}
              className="w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1"
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Commercial">Commercial</option>
              <option value="Studio">Studio</option>
              <option value="Land Plot">Land Plot</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap w-full">
          <div className="flex-1">
            <h5 className="h5">Address</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, address: e.target.value })
              }
              value={inputs.address}
              type="text"
              placeholder="Type here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full"
            />
          </div>

          <div className="w-32">
            <h5 className="h5">Area</h5>
            <input
              onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
              value={inputs.area}
              type="number"
              placeholder="Type here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1 w-full"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-32">
            <h5 className="h5">
              Price (Rent)<span className="text-xs">/night</span>
            </h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, priceRent: e.target.value })
              }
              value={inputs.priceRent}
              type="number"
              min={99}
              className="w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1"
              placeholder="100"
            />
          </div>

          <div className="w-32">
            <h5 className="h5">Price (Sale)</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, priceSale: e.target.value })
              }
              value={inputs.priceSale}
              type="number"
              min={9999}
              className="w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1"
              placeholder="10000"
            />
          </div>

          <div className="w-32">
            <h5 className="h5">Bedrooms</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, bedrooms: e.target.value })
              }
              value={inputs.bedrooms}
              type="number"
              min={1}
              className="w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1"
              placeholder="0"
            />
          </div>

          <div className="w-32">
            <h5 className="h5">Bathrooms</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, bathrooms: e.target.value })
              }
              value={inputs.bathrooms}
              type="number"
              min={1}
              className="w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1"
              placeholder="0"
            />
          </div>

          <div className="w-32">
            <h5 className="h5">Garages</h5>
            <input
              onChange={(e) =>
                setInputs({ ...inputs, garages: e.target.value })
              }
              value={inputs.garages}
              type="number"
              min={0}
              className="w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1"
              placeholder="0"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="w-full">
          <h5 className="h5">Amenities</h5>
          <div className="flex gap-3 flex-wrap mt-1">
            {Object.keys(inputs.amenities).map((amenity, index) => (
              <div key={index} className="flex gap-1 items-center">
                <input
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      amenities: {
                        ...inputs.amenities,
                        [amenity]: e.target.checked,
                      },
                    })
                  }
                  id={`amenities-${index}`}
                  type="checkbox"
                  checked={inputs.amenities[amenity]}
                />
                <label htmlFor={`amenities-${index}`} className="text-sm">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="flex gap-2 mt-2">
          {Object.keys(images).map((key) => (
            <label
              key={key}
              htmlFor={`propertyImage${key}`}
              className="ring-1 ring-slate-900/10 overflow-hidden rounded-lg"
            >
              <input
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
                type="file"
                id={`propertyImage${key}`}
                accept="image/*"
                hidden
              />
              <div className="h-12 w-24 bg-secondary/5 flexCenter">
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadIcon
                  }
                  alt="upload Area"
                  className="overflow-hidden object-contain"
                />
              </div>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-secondary text-black font-semibold mt-3 p-2 max-w-36 sm:w-full rounded-xl"
        >
          {loading ? "Submitting..." : "Add property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
