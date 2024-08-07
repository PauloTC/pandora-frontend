"use client";
import { useEffect, useState } from "react";
import DateRangePicker from "react-datepicker";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  libre_franklin600,
  libre_franklin500,
  libre_franklin700,
} from "@/app/fonts";

export default function ExperimentDetail({
  isOpen,
  onClose,
  sidebarMode,
  children,
}: any) {
  const [title, setTitle] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (sidebarMode === "create") {
      setTitle("Nuevo experimento");
    }

    if (sidebarMode === "read") {
      setTitle("Detalles del experimento");
    }

    console.log("sidebarMode", sidebarMode);
  }, [sidebarMode]);

  if (!isOpen) {
    return null;
  }

  const status = [
    { value: "en curso", label: "En curso" },
    { value: "finalizado", label: "Finalizado" },
    { value: "por iniciar", label: "Por iniciar" },
    { value: "bloqueado", label: "Bloqueado" },
  ];

  return (
    <div className="fixed inset-0 flex z-40 justify-end">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>
      <div className="relative flex-1 flex flex-col max-w-xl w-full bg-white">
        <div className="absolute top-0 left-0 -ml-12 pt-2">
          <button
            onClick={onClose}
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 h-0 py-10 px-4 overflow-y-auto">
          <div className="flex-shrink-0 flex justify-between items-center px-6">
            <h3 className="text-2xl font-semibold">{title}</h3>
            {sidebarMode === "read" && (
              <button
                className="
                    text-white flex 
                    items-center gap-1 
                    bg-blue-700 hover:bg-blue-800 
                    font-medium rounded-full text-sm 
                    px-5 py-2.5 text-center w-32 justify-center"
              >
                Editar
              </button>
            )}

            {sidebarMode === "create" && (
              <button
                className="
                    text-white flex 
                    items-center gap-1 
                    bg-blue-700 hover:bg-blue-800 
                    font-medium rounded-full text-sm 
                    px-5 py-2.5 text-center w-32 justify-center"
              >
                Guardar
              </button>
            )}
          </div>
          <div className="mt-8 px-6 space-y-1">
            {sidebarMode === "create" && (
              <form className="flex flex-col gap-y-6">
                <li className="flex justify-end">
                  <span className="cursor-pointer text-xs font-medium gap-1 flex items-center relative text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </svg>
                    <input
                      type="file"
                      id="research_plan"
                      className="absolute opacity-0"
                    />
                    <em className="not-italic">Agregar Referencia</em>
                  </span>
                </li>

                <li className="flex gap-4">
                  <label htmlFor="name" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Título*
                    </span>
                    <span className="text-xs font-regular">
                      Máximo 40 caracteres
                    </span>
                  </label>

                  <input
                    type="text"
                    id="name"
                    className="
                          self-start h-10 border border-gray-300 
                          text-gray-900 text-sm rounded
                          outline-blue-500 block w-64 p-2.5"
                    placeholder="Titulo del experimento"
                    required
                  />
                </li>

                <li className="flex items-center gap-4">
                  <label htmlFor="status" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Estado*
                    </span>
                    <span className="text-xs font-regular">
                      Estado de la investigación
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      id="status"
                      className="
                            border appearance-none
                            border-gray-300 
                            text-gray-900 
                            text-sm rounded
                            block w-64 p-2.5 h-10
                            outline-blue-500"
                    >
                      {status.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dropdown-heading-dropdown-arrow gray size-5 pointer-events-none absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <path d="M6 9L12 15 18 9"></path>
                    </svg>
                  </div>
                </li>

                <li className="flex items-center">
                  <label htmlFor="initial_date" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Fecha de inicio*
                    </span>
                    <span className="text-xs font-regular">
                      Elige una fecha de inicio
                    </span>
                  </label>

                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona una fecha inicial"
                    className="
                          placeholder-gray-150
                          border border-gray-300 
                          text-sm block p-2 w-64 
                          rounded h-10 outline-blue-500
    
                        "
                    required
                  />
                </li>

                <li className="flex flex-col  gap-4">
                  <label
                    className="flex items-center justify-between grow"
                    htmlFor="specific_goals"
                  >
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Planteamiento de la problematica
                    </span>
                    <span className="text-xs font-regular">
                      Máximo 200 caracteres
                    </span>
                  </label>
                  <textarea
                    id="specific_goals"
                    rows={4}
                    maxLength={200}
                    className={`grow text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500`}
                    placeholder="Objetivos específicos"
                  ></textarea>
                </li>

                <li className="flex flex-col  gap-4">
                  <label
                    className="flex items-center justify-between grow"
                    htmlFor="specific_goals"
                  >
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Planteamiento de hipótesis
                    </span>
                    <span className="text-xs font-regular">
                      Máximo 200 caracteres
                    </span>
                  </label>

                  <textarea
                    id="specific_goals"
                    rows={4}
                    maxLength={200}
                    className={`grow text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500`}
                    placeholder="Objetivos específicos"
                  ></textarea>
                </li>

                <li className="flex flex-col  gap-4">
                  <label
                    className="flex items-center justify-between grow"
                    htmlFor="specific_goals"
                  >
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Descripción de la solución
                    </span>
                    <span className="text-xs font-regular">
                      Máximo 200 caracteres
                    </span>
                  </label>

                  <textarea
                    id="specific_goals"
                    rows={4}
                    maxLength={200}
                    className={`grow text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500`}
                    placeholder="Objetivos específicos"
                  ></textarea>
                </li>

                <li className="flex items-center gap-4">
                  <label htmlFor="project" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      VP*
                    </span>
                    <span className="text-xs font-regular">
                      Selecciona a que VP pertenece
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      required
                      name="project"
                      id="project"
                      className={`
                            appearance-none
                            text-sm 
                            rounded block 
                            w-64 p-2.5
                            border border-gray-300
                            outline-blue-500
                          
                          `}
                    >
                      <option value="">Selecciona una VP</option>
                      <option value="fyt">Finanzas y transformacion</option>
                      <option value="vtp">Vita pro</option>
                      <option value="business">Negocios Internacionales</option>
                    </select>

                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dropdown-heading-dropdown-arrow gray size-5 pointer-events-none absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <path d="M6 9L12 15 18 9"></path>
                    </svg>
                  </div>
                </li>

                <li className="flex items-center gap-4">
                  <label htmlFor="area" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Area Estrategica*
                    </span>
                    <span className="text-xs font-regular">
                      Selecciona a que VP pertenece
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      required
                      name="area"
                      id="area"
                      className={`
                            appearance-none
                            text-sm 
                            rounded block 
                            w-64 p-2.5
                            border border-gray-300
                            outline-blue-500
                          
                          `}
                    >
                      <option value="">Selecciona un area</option>
                      <option value="fyt">Finanzas y transformacion</option>
                      <option value="vtp">Vita pro</option>
                      <option value="business">Negocios Internacionales</option>
                    </select>

                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dropdown-heading-dropdown-arrow gray size-5 pointer-events-none absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <path d="M6 9L12 15 18 9"></path>
                    </svg>
                  </div>
                </li>

                <li className="flex items-center gap-4">
                  <label htmlFor="area" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Tipo*
                    </span>
                    <span className="text-xs font-regular">
                      Selecciona un tipo de experimento
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      required
                      name="area"
                      id="area"
                      className={`
                            appearance-none
                            text-sm 
                            rounded block 
                            w-64 p-2.5
                            border border-gray-300
                            outline-blue-500
                          
                          `}
                    >
                      <option value="">Selecciona un tipo</option>
                      <option value="exp">Experimento</option>
                      <option value="fix">Fix</option>
                      <option value="report">Reporte</option>
                      <option value="updagrade">
                        Iniciativa / Mejora continua
                      </option>
                      <option value="test">Prueba</option>
                    </select>

                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dropdown-heading-dropdown-arrow gray size-5 pointer-events-none absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <path d="M6 9L12 15 18 9"></path>
                    </svg>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="area" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Medio de Ejecucion*
                    </span>
                    <span className="text-xs font-regular">
                      Selecciona un medio de Ejecucion
                    </span>
                  </label>

                  <div className="relative">
                    <select
                      required
                      name="area"
                      id="area"
                      className={`
                            appearance-none
                            text-sm 
                            rounded block 
                            w-64 p-2.5
                            border border-gray-300
                            outline-blue-500
                          
                          `}
                    >
                      <option value="">Selecciona un medio</option>
                      <option value="fyt">Finanzas y transformacion</option>
                      <option value="vtp">Vita pro</option>
                      <option value="business">Negocios Internacionales</option>
                    </select>

                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="dropdown-heading-dropdown-arrow gray size-5 pointer-events-none absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <path d="M6 9L12 15 18 9"></path>
                    </svg>
                  </div>
                </li>
              </form>
            )}

            {children}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0"></div>
    </div>
  );
}
