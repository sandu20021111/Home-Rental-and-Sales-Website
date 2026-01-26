import React, { useState } from "react";
import { assets } from "../../assets/data";
import { UploadIcon } from "lucide-react";

const AddProperty = () => {
const [images, setImages] = useState({
  1:null,
  2:null,
  3:null,
  4:null,
})
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




  return (
     <div className="">
      <form className="">
        <div className="w-full">

        <h5 className='h5'>Property Name</h5>
        <input
        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        value={inputs.title}
        type="text"
        className='px-3 py-2 border border-gray-300 rounded-md w-full'
        placeholder='Enter property name...'
        />

        </div>

        <div className="w-full">

        <h5 className='h5'>Property Description</h5>
        <textarea
        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        value={inputs.description}
        rows={5}
        type="text"
        className='px-3 py-2 border border-gray-300 rounded-md w-full'
        placeholder='Enter property description...'
        />

        </div>
    
        <div className="flex gap-4">
          <div className="w-full">
            <h5 className='h5'>City</h5>
            <input
            onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
            value={inputs.city}
            type="text"
            className='px-3 py-2 border border-gray-300 rounded-md w-full'
            placeholder='Enter city...'
            />
          </div>
          </div>

        <div className="flex gap-4">
          <div className="w-full">
            <h5 className='h5'>Country</h5>
            <input
            onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
            value={inputs.country}
            type="text"
            className='px-3 py-2 border border-gray-300 rounded-md w-full'
            placeholder='Enter country...'
            />
          </div>
          <div>
            <h5 className='h5'>Property Type</h5>
<select
            onChange={(e) => setInputs({ ...inputs, propertyType: e.target.value })}
            value={inputs.propertyType}
            type="text"
            className="w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1"
            placeholder="Enter property type..."
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
            <h5 className='h5'>Address</h5>
            <input
            onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
            value={inputs.address}
            type="text"
            className='w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
            placeholder='Enter address...'
            />
          </div>
          <div className="w-32">
            <h5 className='h5'>Area</h5>
            <input
            onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
            value={inputs.area}
            type="number"
            className='w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
            placeholder='Area in sqft...'
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-32">
            <h5 className='h5'>Price (Rent)<span className="text-xs">/night</span></h5>
            <input
              onChange={(e) => setInputs({ ...inputs, priceRent: e.target.value })}
              value={inputs.priceRent}
              type="number"
              min={99}
              className='w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
              placeholder="100"
            />
          </div>
          <div className="w-32">
            <h5 className='h5'>Price (Sale)</h5>
            <input
              onChange={(e) => setInputs({ ...inputs, priceSale: e.target.value })}
              value={inputs.priceSale}
              type="number"
              min={9999}
              className='w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
              placeholder="10000"
            />
          </div>
          <div className="w-32">
            <h5 className='h5'>Bedrooms</h5>
            <input
              onChange={(e) => setInputs({ ...inputs, bedrooms: e.target.value })}
              value={inputs.bedrooms}
              type="number"
              min={1}
              className='w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
              placeholder="0"
            />
        </div>
          <div className="w-32">
            <h5 className='h5'>Bathrooms</h5>
            <input
              onChange={(e) => setInputs({ ...inputs, bathrooms: e.target.value })}
              value={inputs.bathrooms}
              type="number"
              min={1}
              className='w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
              placeholder="0"
            />
            </div>
          <div className="w-32">
            <h5 className='h5'>Garages</h5> 
            <input
              onChange={(e) => setInputs({ ...inputs, garages: e.target.value })}
              value={inputs.garages}
              type="number"
              min={0}
              className='w-36 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-secondary/5 mt-1'
              placeholder="0"
            />
            </div>
        </div>

        {/* Amenities Section */}
        <div className="w-full">
          <h5 className='h5'>Amenities</h5>
          <div className="flex gap-3 flex-wrap mt-1">
            {Object.keys(inputs.amenities).map((amenity, index) => (
              <div key={index} className="flex gap-1 items-center">
                <input
                id={`amenities[${index + 1}]`}
                onChange={(e) => 
                  setInputs({...inputs, amenities: {...inputs.amenities, [amenity]: e.target.checked }})
                }
                checked={inputs.amenities[amenity]}
                type="checkbox"
                />
                <label htmlFor={`amenities[${index + 1}]`} className="text-sm">{amenity}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Images Upload Section */}
        <div className="flex gap-2 mt-2">
          {Object.keys(images).map((key) => (
            <label
            key={key}
            htmlFor={`propertyImage${key}`} 
            className="ring-1 ring-slate-900/10 overflow-hidden rounded-lg">
              <input
                onChange={(e) => 
                  setImages({ ...images, [key]: e.target.files[0] })}
                type="file"
                id={`propertyImage${key}`}
                accept="image/*"
                hidden
              />
              <div className="h-12 w-24 bg-secondary/5 flexCenter">
                <img src={images[key] ? URL.createObjectURL (images [key]): assets.
                  uploadIcon} alt="upload Area" className="overflow-hidden object-contain"/>
            </div>
            </label>
          ))}
        </div>
      </form>


  </div>
  )
};

export default AddProperty;
