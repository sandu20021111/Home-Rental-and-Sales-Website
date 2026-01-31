import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProperties } from "../assets/data";
import { Currency } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "Rs.";
  const navigate = useNavigate();
  const { user } = useUser();
  const [properties, setProperties] = useState([]);
  const [showAgencyReg,setshowAgencyReg] = useState(false)
  const [isOwner, setIsOwner] = useState(true);

  const getProperties = async () => {
    try {
      const { data } = await axios.get('/api/properties')
      if(data.success){
        setProperties(data.properties)
      }else{
        toast.error(data.message)
      }
    }catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const value = {
    navigate,
    properties,
    setProperties,
    currency,
    user,
    showAgencyReg,
    setshowAgencyReg,
    isOwner,
    setIsOwner,
};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
