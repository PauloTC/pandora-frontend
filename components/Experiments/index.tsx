"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import ModalImage from "@/components/Common/ModalImage";
import ExperimentDetail from "@/components/Experiments/ExperimentDetail";
import { Experiment } from "@/api";
import { format, addDays } from "date-fns";
import { ExperimentCardIcon } from "@/components/Experiments/ExperimentCard/ExperimentCardIcon";
import { StatusBadge, FilterSection } from "@/components/Common";
import { ExperimentsContext } from "@/contexts";
import classNames from "classnames";

interface ExperimentData {
  id: string;
  attributes: {
    title: string;
    status: string;
    initial_date: Date;
    end_date: Date;
    strategic_area: string;
    reference: string;
    experiment_type: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
    vp: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
    execution_methods: {
      data: [];
    };
    participants: {
      data: [];
    };
  };
}

export default function ExperimentsComponent() {
  const {
    experiments,
    vps,
    executionMethods,
    getExperiments,
    filterExperiments,
    experimentTypes,
    status,
    pagination,
  } = useContext(ExperimentsContext);

  const experimentCtrl = new Experiment();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [actionMode, setSidebarMode] = useState("read");
  // const [experiments, setExperiments] = useState([]);
  const [experiment, setExperiment] = useState<ExperimentData | null>(null);
  const [reference, setReference] = useState("");
  const [filters, setFilters] = useState({
    sort: "desc",
    vp: "Todos",
    execution_methods: "Todos",
    experiment_type: "Todos",
    status: "Todos",
    page: 1,
  });

  const sortOptions = [
    { value: "desc", label: "Más Actual" },
    { value: "asc", label: "Más Antiguo" },
  ];

  const handleOpen = (data: string) => {
    setIsOpen(true);
    setReference(data);
  };

  const handleClose = () => setIsOpen(false);

  const handleOpenSidebar = async (mode: any, id: string | null) => {
    try {
      if (id) {
        const response = await experimentCtrl.getExperiment(id);
        setExperiment(response.data);
        console.log("response", response);
      }

      document.body.style.overflow = "hidden";

      setSidebarMode(mode);
      setIsOpenSidebar(true);
    } catch (error) {
      console.error("Error al obtener los datos del experimento", error);
    }
  };

  const handleCloseSidebar = () => {
    setIsOpenSidebar(false);
    document.body.style.overflow = "auto";
  };

  const handleFilterClick = async (type: any, value: any) => {
    if (type === "reset") {
      setFilters({
        sort: "desc",
        vp: "Todos",
        execution_methods: "Todos",
        experiment_type: "Todos",
        status: "Todos",
        page: 1,
      });
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    }
  };

  useEffect(() => {
    console.log("filters", filters);
    console.log("executionMethods", executionMethods);

    (async () => {
      if (filters.sort || filters.vp || filters.execution_methods) {
        try {
          if (
            filters.sort === "desc" &&
            filters.vp === "Todos" &&
            filters.execution_methods === "Todos" &&
            filters.experiment_type === "Todos" &&
            filters.status === "Todos" &&
            filters.page === 1
          ) {
            await getExperiments();
          } else {
            await filterExperiments({
              sort: filters.sort,
              vp: filters.vp === "Todos" ? "" : filters.vp,
              execution_methods:
                filters.execution_methods === "Todos"
                  ? ""
                  : filters.execution_methods,
              experiment_type:
                filters.experiment_type === "Todos"
                  ? ""
                  : filters.experiment_type,
              status: filters.status === "Todos" ? "" : filters.status,
              pagination: { page: filters.page || 1 },
            });
          }
        } catch (error) {
          console.error("Error al obtener los datos del experimento", error);
        }
      }
    })();
  }, [filters]);

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex items-center gap-6 mb-6">
          <h4 className="font-semibold text-slate-700 capitalize text-3xl">
            Experimentación
          </h4>
          <ul className="flex flex-wrap gap-1">
            {[
              { attributes: { value: "Todos", label: "Todos" } },
              ...status,
            ].map((state: any, index: number) => (
              <li key={index}>
                <button
                  onClick={() =>
                    handleFilterClick("status", state.attributes.value)
                  }
                  className={classNames(
                    filters.status === state.attributes.value
                      ? "bg-blue-100"
                      : "bg-gray-100",
                    filters.status === state.attributes.value
                      ? "text-blue-800"
                      : "text-gray-800",
                    "text-xs",
                    "font-medium",
                    "px-3",
                    "py-1",
                    "rounded-full"
                  )}
                >
                  {state.attributes.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            onClick={() => handleOpenSidebar("create", null)}
            className="
                text-white flex 
                items-center gap-1 
                bg-blue-700 hover:bg-blue-800 
                font-medium rounded-full text-sm 
                px-5 py-2.5 text-center"
          >
            Agregar Experimento
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4 self-start">
          <ul className="grid grid-cols-3 gap-4">
            {experiments.map((experiment: ExperimentData, index: number) => {
              const { id } = experiment;

              const {
                title,
                status,
                initial_date,
                end_date,
                strategic_area,
                reference,
              } = experiment.attributes;

              let type = "";
              let vp = "";
              let execution_methods = [];

              let participants = [];

              if (
                experiment.attributes.experiment_type &&
                experiment.attributes.experiment_type.data
              ) {
                type =
                  experiment.attributes.experiment_type.data.attributes.name;
              }

              vp = experiment.attributes.vp
                ? experiment.attributes.vp.data?.attributes.name
                : "";

              execution_methods = experiment.attributes.execution_methods
                ? experiment.attributes.execution_methods.data
                : [];

              participants = experiment.attributes.participants
                ? experiment.attributes.participants.data
                : [];

              return (
                <li
                  key={index}
                  className="border border-gray-200 
                    rounded-lg p-5 box-border
                    self-start justify-between transition-all 
                    duration-300 ease-in-out cursor-pointer
                    relative overflow-hidden divide-y divide-gray-300"
                >
                  <div className="pb-3">
                    <div className="relative z-10">
                      <div className="flex mb-3">
                        <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                          {title}
                        </h4>
                      </div>

                      <div className="flex mb-3 min-h-4 items-center">
                        <div className="flex gap-2 ">
                          {execution_methods.map(
                            (method: any, index: number) => {
                              return (
                                <p
                                  key={index}
                                  className="text-xs align-center flex border px-2 rounded-md"
                                >
                                  {method.attributes.name}
                                </p>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center gap-2 mb-3 min-h-8 mb-2">
                        <span className="max-w-32 font-semibold text-xs capitalize">
                          {vp}
                        </span>
                        <StatusBadge status={status} />
                      </div>

                      <div className="flex items-center mb-1 justify-between">
                        <p className="text-xs flex gap-2 font-semibold grow">
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
                              d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                            />
                          </svg>

                          <span>
                            {initial_date &&
                              format(
                                addDays(new Date(initial_date), 1),
                                "dd/MM/yy"
                              )}
                          </span>
                        </p>
                        {end_date && (
                          <>
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
                                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                              />
                            </svg>

                            <p className="text-xs flex gap-2 font-semibold grow justify-end">
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
                                  d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                                />
                              </svg>

                              <span>
                                {end_date &&
                                  format(
                                    addDays(new Date(end_date), 1),
                                    "dd/MM/yy"
                                  )}
                              </span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="relative z-10 flex pt-2">
                      <p
                        className={`font-semibold h-12 flex items-center capitalize text-md w-full`}
                      >
                        {strategic_area}
                      </p>
                      <ul className="flex items-center justify-end grow relative w-40">
                        {participants.map((participant: any, index: number) => {
                          return (
                            <li
                              key={index}
                              // prettier-ignore
                              className={classNames(
                                  {
                                    "absolute": index === 1,
                                    "right-7": index === 1
                                  },
                                  "border-2",
                                  "border-white",
                                  "rounded-full"
                                )}
                            >
                              <Image
                                src={
                                  participant.attributes.photo.data.attributes
                                    .url
                                }
                                alt={
                                  participant.attributes.photo.data.attributes
                                    .name
                                }
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            </li>
                          );
                        })}

                        {/* <li
                          // prettier-ignore
                          className="absolute right-7 border-2 border-white rounded-full"
                        >
                          <Image
                            src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                            alt="person"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </li> */}
                      </ul>
                    </div>

                    <ExperimentCardIcon type={type} />
                  </div>

                  <div className="flex justify-between gap-x-2 pt-3 relative">
                    <button
                      onClick={() => handleOpenSidebar("read", id)}
                      className="flex flex-1 justify-center gap-2 bg-blue-100 hover:bg-blue-200 px-2.5 py-2.5 rounded-full text-xs text-blueGray-900 transition-colors duration-200"
                    >
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
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                      Detalles
                    </button>
                    <button
                      onClick={() => handleOpen(reference)}
                      className={`flex-1 flex justify-center gap-2 px-2.5 py-2.5 rounded-full text-xs text-white transition-colors duration-200 
                      ${
                        reference
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
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
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      Imagen
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          {pagination?.pageCount > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <ul>
                {
                  <ul className="flex gap-2">
                    {Array.from(
                      { length: pagination?.pageCount },
                      (_, index) => index + 1
                    ).map((page) => (
                      <li key={page}>
                        <button
                          onClick={() => handleFilterClick("page", page)}
                          className={classNames(
                            pagination?.page === page
                              ? "bg-blue-100"
                              : "bg-gray-100",
                            pagination?.page === page
                              ? "text-blue-800"
                              : "text-gray-800",
                            "text-xs",
                            "font-medium",
                            "h-7",
                            "w-7",
                            "rounded-lg"
                          )}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  </ul>
                }
              </ul>
              <p className="text-xs">
                Muestra{" "}
                {pagination?.page * pagination?.pageSize -
                  pagination?.pageSize +
                  1}{" "}
                a{" "}
                {Math.min(
                  pagination?.page * pagination?.pageSize,
                  pagination?.total
                )}{" "}
                de {pagination?.total} resultados
              </p>
            </div>
          )}
        </div>
        <div className="w-1/4 border border-gray-200 rounded-xl p-4 self-start">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold block text-lg">Filtros</h3>
            <button
              className="text-xs underline text-blue-800"
              onClick={() => handleFilterClick("reset", null)}
            >
              Limpiar todo
            </button>
          </div>
          <div>
            <FilterSection
              title="Ordenar por"
              items={sortOptions}
              handleFilterClick={handleFilterClick}
              filterType="sort"
              filterValue={filters.sort}
            />

            <FilterSection
              title="Vicepresidencia"
              items={[{ value: "Todos", label: "Todos" }, ...vps]}
              handleFilterClick={handleFilterClick}
              filterType="vp"
              filterValue={filters.vp}
            />

            <FilterSection
              title="Medios de ejecución"
              items={[{ value: "Todos", label: "Todos" }, ...executionMethods]}
              handleFilterClick={handleFilterClick}
              filterType="execution_methods"
              filterValue={filters.execution_methods}
            />

            <FilterSection
              title="Tipo de experimento"
              items={[{ value: "Todos", label: "Todos" }, ...experimentTypes]}
              handleFilterClick={handleFilterClick}
              filterType="experiment_type"
              filterValue={filters.experiment_type}
            />
          </div>
        </div>
      </div>
      <ModalImage isOpen={isOpen} onClose={handleClose}>
        <figure className="w-96 h-96 mx-auto relative">
          <a href={reference} target="_blank">
            <Image
              alt="image"
              layout="fill"
              objectFit="contain"
              src={reference}
            />
          </a>
        </figure>
      </ModalImage>
      <ExperimentDetail
        experiment={experiment}
        sidebarMode={actionMode}
        isOpen={isOpenSidebar}
        onClose={handleCloseSidebar}
      ></ExperimentDetail>
    </section>
  );
}
