"use client";

import React, { createContext, useState, useEffect } from "react";
import { Investigation } from "@/api";

export const InvestigationsContext = createContext();

const investigationCtrl = new Investigation();

export const InvestigationsProvider = ({ children }) => {
  const [investigations, setInvestigations] = useState([]);
  const [pagination, setPagination] = useState({}); // [1, 2, 3, 4, 5

  const getInvestigations = async () => {
    try {
      const response = await investigationCtrl.getInvestigations();
      setInvestigations(response.data);
      setPagination(response.meta.pagination);

      return response;
    } catch (error) {
      console.log("error", error);
    }
  };

  const filterInvestigations = async (filters) => {
    try {
      const response = await investigationCtrl.filterInvestigations(filters);
      setInvestigations(response.data);
      setPagination(response.meta.pagination);

      return response;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <InvestigationsContext.Provider
      value={{
        investigations,
        getInvestigations,
        filterInvestigations,
        pagination,
      }}
    >
      {children}
    </InvestigationsContext.Provider>
  );
};
