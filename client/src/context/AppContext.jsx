import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProperties } from "../assets/data";
import { Currency } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "Rs.";
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]);
  const [showAgencyReg, setshowAgencyReg] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  //CLERK
  const { user } = useUser();
  const { getToken } = useAuth();



  const getProperties = async () => {
    try {
      const { data } = await axios.get("/api/properties");
      if (data.success) {
        setProperties(data.properties);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setIsOwner(data.role == "agencyOwner");
        setSearchedCities(data.recentSearchedCities);
      } else {
        //retry fetch user details after 5 seconds
        setTimeout(() => {
          getUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

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
    axios,
    getToken,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
