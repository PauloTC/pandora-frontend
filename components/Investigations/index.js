"use client";
import { useContext, useEffect, useState } from "react";
import { Project, Public, Researcher } from "@/api";
import { map } from "lodash";
import {
  libre_franklin600,
  libre_franklin500,
  libre_franklin700,
} from "@/app/fonts";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { format, addDays } from "date-fns";
import { InvestigationsContext } from "@/contexts";
import { get } from "http";

const projectCtrl = new Project();
const publicCtrl = new Public();
const researcherCtrl = new Researcher();

export default function InvestigationsComponent() {
  const {
    investigations,
    pagination,
    getInvestigations,
    filterInvestigations,
  } = useContext(InvestigationsContext);

  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState([
    { attributes: { name: "Todos", value: "Todos" } },
    { attributes: { name: "Por Iniciar", value: "por iniciar" } },
    { attributes: { name: "En Curso", value: "en curso" } },
    { attributes: { name: "Finalizado", value: "finalizado" } },
    { attributes: { name: "Bloqueado", value: "bloqueado" } },
  ]);
  const [filterPublics, setFilterPublics] = useState([]);
  const [filterResearchers, setFilterResearchers] = useState([]);
  const [filters, setFilters] = useState({
    project: "Todos",
    status: "Todos",
    objectivePublic: "Todos",
    objetiveResearcher: "Todos",
    sort: "desc",
  });

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllPublics, setShowAllPublics] = useState(false);

  const sortOptions = [
    { value: "desc", label: "Más Actual" },
    { value: "asc", label: "Más Antiguo" },
  ];

  const handleFilterClick = async (type, value) => {
    if (type === "reset") {
      setFilters({
        project: "Todos",
        status: "Todos",
        objectivePublic: "Todos",
        objetiveResearcher: "Todos",
        sort: "desc",
      });
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const responseProjects = await projectCtrl.getProjects();
        const responsePublics = await publicCtrl.getPublics();
        const responseResearchers = await researcherCtrl.getAllParticipants();
        const responseStatus = [
          { attributes: { name: "Todos", alias: "Todos" }, id: 1 },
          { attributes: { name: "por iniciar", alias: "por iniciar" }, id: 2 },
          { attributes: { name: "en curso", alias: "en curso" }, id: 3 },
          { attributes: { name: "finalizado", alias: "finalizado" }, id: 4 },
          { attributes: { name: "bloqueado", alias: "bloqueado" }, id: 5 },
        ];

        // Agregar la opción "Todos" al inicio del array de proyectos
        const projectsWithAllOption = [
          { attributes: { name: "Todos", alias: "Todos" } },
          ...responseProjects?.data,
        ];

        // Agregar la opción "Todos" al inicio del array de públicos
        const publicsWithAllOption = [
          { attributes: { name: "Todos", alias: "Todos" } },
          ...responsePublics?.data,
        ];

        const researchersWithAllOption = [
          { value: "Todos", label: "Todos" },
          ...responseResearchers?.data
            .filter(
              (researcher) =>
                researcher.attributes.role === "service" ||
                researcher.attributes.role === "researcher"
            )
            .map((researcher) => ({
              value: researcher.id,
              label: researcher.attributes.name,
            })),
        ];

        setProjects(projectsWithAllOption);
        setFilterPublics(publicsWithAllOption);
        setFilterResearchers(researchersWithAllOption);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (
        filters.project ||
        filters.status ||
        filters.objectivePublic ||
        filters.objetiveResearcher ||
        filters.sort ||
        filters.page
      ) {
        try {
          if (
            filters.project === "Todos" &&
            filters.status === "Todos" &&
            filters.objectivePublic === "Todos" &&
            filters.objetiveResearcher === "Todos" &&
            filters.sort === "desc" &&
            filters.page === 1
          ) {
            await getInvestigations();
          } else {
            const investigations = await filterInvestigations({
              project: filters.project === "Todos" ? "" : filters.project,
              status: filters.status === "Todos" ? "" : filters.status,
              objectivePublic:
                filters.objectivePublic === "Todos"
                  ? ""
                  : filters.objectivePublic,
              objetiveResearcher:
                filters.objetiveResearcher === "Todos"
                  ? ""
                  : filters.objetiveResearcher,
              sort: filters.sort,
              pagination: { page: filters.page || 1 },
            });
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    })();
  }, [filters]);

  //Setea la pagina a 1 cuando se cambia el proyecto o el publico objetivo
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
  }, [filters.project, filters.objectivePublic, filters.objetiveResearcher]);

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex items-center gap-6 mb-6">
          <h4 className="font-semibold text-slate-700 capitalize text-3xl">
            Investigaciones
          </h4>
          <ul className="flex flex-wrap gap-1">
            {status.map((state, index) => (
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
                    "me-2",
                    "px-3",
                    "py-1",
                    "rounded-full"
                  )}
                >
                  {state.attributes.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            href={"/investigaciones/create"}
            className="
              text-white flex 
              items-center gap-1 
              bg-blue-700 hover:bg-blue-800 
              font-medium rounded-full text-sm 
              px-5 py-2.5 text-center"
          >
            Agregar Investigación
          </Link>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4 self-start">
          {investigations.length === 0 && (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500 text-center gap-2">
              <Image
                height={70}
                width={70}
                alt="not_found"
                src="/investigations/not_found.svg"
              />

              <p className="text-md mt-2">
                No se encontraron <br /> investigaciones
              </p>
            </div>
          )}

          <ul className="grid grid-cols-3 gap-4 ">
            {map(investigations, (investigation) => {
              let locationNames =
                investigation.attributes?.materials?.data.flatMap((material) =>
                  material.attributes.locations.data.map(
                    (location) => location.attributes.name
                  )
                );

              let publics = investigation.attributes?.materials?.data.flatMap(
                (material) =>
                  material.attributes.publics.data.map(
                    (publicName) => publicName.attributes.name
                  )
              );

              //removing duplicates
              publics = [...new Set(publics)];

              locationNames = locationNames?.map((name) =>
                name === "Lima" ? "Lima" : "Provincia"
              );

              locationNames = [...new Set(locationNames)];

              locationNames.sort((a, b) =>
                a === "Lima" ? -1 : b === "Lima" ? 1 : 0
              );

              return (
                <li
                  className="
                      border border-gray-200 
                      rounded-lg p-5 box-border
                      self-start
                      justify-between 
                      hover:shadow-md transition-all 
                      duration-300 ease-in-out cursor-pointer"
                  key={investigation?.id}
                >
                  <Link
                    className="divide-y divide-gray-300 "
                    href={`/investigaciones/${investigation?.attributes?.slug}`}
                  >
                    <div>
                      <div className="mb-3 flex justify-between">
                        <h4
                          title={investigation?.attributes?.name}
                          className="font-semibold min-h-10 text-slate-800 text-sm w-4/5"
                        >
                          {investigation?.attributes?.name.length > 25
                            ? investigation?.attributes?.name.substring(0, 25) +
                              "..."
                            : investigation?.attributes?.name}
                        </h4>

                        {investigation?.attributes?.research_plan && (
                          <div className="border-solid rounded-full border-gray-300 border p-1 self-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-3 text-gray-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex mb-3 min-h-4 items-center">
                        <div className="flex gap-2 ">
                          {locationNames.length ? (
                            locationNames.map((name, index) => (
                              <p
                                key={index}
                                className="text-xs align-center flex border px-2 rounded-md"
                              >
                                {name}
                              </p>
                            ))
                          ) : (
                            <>
                              <p className="text-xs align-center flex border px-2 rounded-md">
                                Sin ubicación
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mb-3 min-h-4">
                        {publics?.length > 0 ? (
                          <>
                            {publics?.slice(0, 2).map((publicItem, index) => (
                              <span
                                key={index}
                                className="font-semibold text-xs capitalize"
                              >
                                {publicItem}
                              </span>
                            ))}
                            {publics?.length > 2 && (
                              <span className="font-semibold text-xs capitalize">
                                {`+ ${publics?.length - 2}`}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="font-semibold text-xs capitalize flex gap-1">
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
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                            Sin público
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <span
                          className={`${libre_franklin500.className} text-xs block mb-2`}
                        >
                          <strong>Inicio:{"  "}</strong>
                          {investigation?.attributes?.initial_date &&
                            format(
                              addDays(
                                new Date(
                                  investigation?.attributes?.initial_date
                                ),
                                1
                              ),
                              "dd/MM/yy"
                            )}
                        </span>
                        <span
                          className={classNames(
                            "rounded-lg",
                            "text-xs",
                            "block",
                            "mb-2",
                            "capitalize",
                            "text-white",
                            "px-2",
                            "py-1",
                            {
                              "bg-stone-600":
                                investigation?.attributes?.status ===
                                "finalizado",
                              "bg-teal-600":
                                investigation?.attributes?.status ===
                                "en curso",
                              "bg-rose-600":
                                investigation?.attributes?.status ===
                                "bloqueado",
                              "bg-sky-600":
                                investigation?.attributes?.status ===
                                "por iniciar",
                            }
                          )}
                        >
                          {investigation?.attributes?.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex pt-2 ">
                      <p
                        className={`${libre_franklin700.className} h-12 flex items-center capitalize text-md w-full`}
                      >
                        {
                          investigation?.attributes?.project?.data?.attributes
                            .name
                        }
                      </p>
                      <ul className="flex items-center justify-end grow relative w-40 h-12">
                        {investigation?.attributes?.researchers.data
                          .slice(0, 2)
                          .map((researcher, index) => {
                            return (
                              <li
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
                                key={index}
                              >
                                <Image
                                  src={
                                    researcher.attributes.photo.data.attributes
                                      .formats.thumbnail.url
                                  }
                                  alt={
                                    researcher.attributes.photo.data.attributes
                                      .formats.thumbnail.name
                                  }
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              </li>
                            );
                          })}
                        {investigation?.attributes?.researchers.data.length >
                          2 && (
                          <li className="absolute right-0 bottom-0 w-8">
                            <span
                              className={`${libre_franklin600.className} rounded-md text-xs flex justify-center bg-stone-600 text-white`}
                            >
                              +{" "}
                              {investigation?.attributes?.researchers.data
                                .length - 2}{" "}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </Link>
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
            <h3 className={`${libre_franklin600.className} block text-lg`}>
              Filtros
            </h3>
            <button
              className="text-xs underline text-blue-800"
              onClick={() => handleFilterClick("reset")}
            >
              Limpiar todo
            </button>
          </div>
          <div>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Ordenar por
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              {sortOptions.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleFilterClick("sort", option.value)}
                    className={classNames(
                      filters.sort === option.value
                        ? "bg-blue-100"
                        : "bg-gray-100",
                      filters.sort === option.value
                        ? "text-blue-800"
                        : "text-gray-800",
                      "text-xs",
                      "font-medium",
                      "me-2",
                      "px-3",
                      "py-1",
                      "rounded-full"
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Proyecto
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              {(showAllProjects ? projects : projects.slice(0, 5))?.map(
                (project, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        handleFilterClick("project", project.attributes.name)
                      }
                      className={classNames(
                        filters.project === project.attributes.name
                          ? "bg-blue-100"
                          : "bg-gray-100",
                        filters.project === project.attributes.name
                          ? "text-blue-800"
                          : "text-gray-800",
                        "text-xs",
                        "font-medium",
                        "me-2",
                        "px-3",
                        "py-1",
                        "rounded-full"
                      )}
                    >
                      {project.attributes.alias}
                    </button>
                  </li>
                )
              )}
              {projects.length > 5 && (
                <button
                  className="text-xs text-blue-800 underline leading-4"
                  onClick={() => setShowAllProjects(!showAllProjects)}
                >
                  {showAllProjects ? "Ocultar proyectos" : "Más proyectos"}
                </button>
              )}
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Público objetivo
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              {(showAllPublics
                ? filterPublics
                : filterPublics.slice(0, 5)
              )?.map((publicItem, index) => (
                <li key={index}>
                  <button
                    onClick={() =>
                      handleFilterClick(
                        "objectivePublic",
                        publicItem.attributes.name
                      )
                    }
                    className={classNames(
                      filters.objectivePublic === publicItem.attributes.name
                        ? "bg-blue-100"
                        : "bg-gray-100",
                      filters.objectivePublic === publicItem.attributes.name
                        ? "text-blue-800"
                        : "text-gray-800",
                      "text-xs",
                      "font-medium",
                      "me-2",
                      "px-3",
                      "py-1",
                      "rounded-full"
                    )}
                  >
                    {publicItem.attributes.name}
                  </button>
                </li>
              ))}
              {filterPublics.length > 5 && (
                <button
                  className="text-xs text-blue-800 underline leading-4"
                  onClick={() => setShowAllPublics(!showAllPublics)}
                >
                  {showAllPublics ? "Ocultar públicos" : "Más públicos"}
                </button>
              )}
            </ul>
            <h4 className={`${libre_franklin500.className} text-sm block mb-2`}>
              Personas
            </h4>
            <ul className="flex flex-wrap gap-1 mb-6">
              {filterResearchers.map((researcher, index) => (
                <li key={index}>
                  <button
                    onClick={() =>
                      handleFilterClick("objetiveResearcher", researcher.value)
                    }
                    className={classNames(
                      filters.objetiveResearcher === researcher.value
                        ? "bg-blue-100"
                        : "bg-gray-100",
                      filters.objetiveResearcher === researcher.value
                        ? "text-blue-800"
                        : "text-gray-800",
                      "text-xs",
                      "font-medium",
                      "me-2",
                      "px-3",
                      "py-1",
                      "rounded-full"
                    )}
                  >
                    {researcher.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
