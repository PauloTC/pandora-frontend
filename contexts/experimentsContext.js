"use client";
import React, { createContext, useState, useEffect } from "react";
import { Experiment, Vp, ExecutionMethod, ExperimentType, Team } from "@/api";

export const ExperimentsContext = createContext();

const experimentCtrl = new Experiment();
const vpCtrl = new Vp();
const executionMethodCtrl = new ExecutionMethod();
const experimentTypeCtrl = new ExperimentType();
const teamCtrl = new Team();

export const ExperimentsProvider = ({ children }) => {
  const [experiments, setExperiments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [executionMethods, setExecutionMethods] = useState([]);
  const [experimentTypes, setExperimentTypes] = useState([]);
  const [teams, setTeams] = useState([]);
  const [vps, setVps] = useState([]);
  const [status, setStatus] = useState([
    { attributes: { label: "En Pausa", value: "en pausa" } },
    { attributes: { label: "En Curso", value: "en curso" } },
    { attributes: { label: "Finalizado", value: "finalizado" } },
    { attributes: { label: "Cancelado", value: "cancelado" } },
  ]);

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

  const filterExperiments = async (filters) => {
    try {
      const response = await experimentCtrl.filterExperiments(filters);
      setExperiments(response.data);
      setPagination(response.meta.pagination);

      return response;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    (async () => {
      const vps = await vpCtrl.getAllVps();
      const execution_methods =
        await executionMethodCtrl.getAllExecutionMethods();
      const experiment_types = await experimentTypeCtrl.getAllExperimentTypes();
      const teams = await teamCtrl.getTeams();

      setVps(
        vps.data.map((vp) => ({
          value: vp?.id,
          label: vp?.attributes?.name,
        }))
      );

      setExperimentTypes(
        experiment_types.data.map((type) => ({
          value: type?.id,
          label: type?.attributes?.name,
        }))
      );

      setExecutionMethods(
        execution_methods.data.map((method) => ({
          value: method?.id,
          label: method?.attributes?.name,
        }))
      );

      setTeams(
        teams.data.map((team) => ({
          value: team?.id,
          label: team?.attributes?.name,
        }))
      );
    })();
  }, []);

  return (
    <ExperimentsContext.Provider
      value={{
        experiments,
        getExperiments,
        filterExperiments,
        pagination,
        vps,
        teams,
        executionMethods,
        experimentTypes,
        status,
      }}
    >
      {children}
    </ExperimentsContext.Provider>
  );
};
