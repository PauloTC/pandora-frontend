"use client";
import React, { createContext, useState } from "react";
import { Experiment } from "@/api";

export const ExperimentsContext = createContext();

const experimentCtrl = new Experiment();

export const ExperimentsProvider = ({ children }) => {
  const [experiments, setExperiments] = useState([]);
  const [pagination, setPagination] = useState({});

  const getExperiments = async () => {
    try {
      const response = await experimentCtrl.getExperiments();
      setExperiments(response.data);
      setPagination(response.meta.pagination);

      return response;
    } catch (error) {
      console.log("error", error);
    }
  };

  // const filterExperiments = async (filters) => {
  //   try {
  //     const response = await experimentCtrl.filterExperiments(filters);
  //     setExperiments(response.data);
  //     setPagination(response.meta.pagination);

  //     return response;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <ExperimentsContext.Provider
      value={{
        experiments,
        getExperiments,
        // filterExperiments,
        // pagination,
      }}
    >
      {children}
    </ExperimentsContext.Provider>
  );
};
