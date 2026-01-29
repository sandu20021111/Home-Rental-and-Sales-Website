import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProperties } from "../assets/data";
import { Currency, SearchCodeIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "Rs.";
  const navigate = useNavigate();
  const { user } = useUser();
  const [properties, setProperties] = useState([]);
  const [showAgencyReg,setshowAgencyReg] = useState(false)
  const [isOwner, setIsOwner] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")

  const getProperties = () => {
    setProperties(dummyProperties);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const value = {
    navigate,
    properties,
    currency,
    user,
    showAgencyReg,
    setshowAgencyReg,
    isOwner,
    setIsOwner,


    searchQuery,
    setSearchQuery,
    SearchedCities,
    setSearchedCities,
};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
