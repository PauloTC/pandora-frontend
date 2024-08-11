"use client";
import Link from "next/link";
import Image from "next/image";
import { Investigation } from "@/api";
import { useEffect, useState } from "react";
import { format, parse, isValid } from "date-fns";
import { LabelDetail } from "@/components/Common/index";

export function InvestigationSlugComponent({ params }) {
  const investigationCtrl = new Investigation();

  const [investigation, setInvestigation] = useState(null);
  const [serviceTeam, setServiceTeam] = useState(null);
  const [researchTeam, setResearchTeam] = useState(null);
  const [extendedTeam, setExtendedTeam] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await investigationCtrl.getInvestigation(params.slug);
        setInvestigation(response.attributes);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    const filterServiceTeam = investigation?.researchers?.data?.filter(
      (researcher) => researcher.attributes.role === "service"
    );

    const filterResearcherTeam = investigation?.researchers?.data.filter(
      (researcher) => researcher.attributes.role === "researcher"
    );

    setResearchTeam(filterResearcherTeam);
    setServiceTeam(filterServiceTeam);
    setExtendedTeam(investigation?.team_extended?.data);
  }, [investigation]);

  let formattedPresentedDate = "";
  let formattedInitialDate = "";
  let formattedEndDate = "";

  if (investigation?.presented_date) {
    try {
      const parsedDate = parse(
        investigation.presented_date,
        "yyyy-MM-dd",
        new Date()
      );

      if (isValid(parsedDate)) {
        formattedPresentedDate = format(parsedDate, "dd/MM/yy");
      } else {
        console.error("parsedDate is not a valid date:", parsedDate);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }
  }

  if (investigation?.initial_date) {
    try {
      const parsedDate = parse(
        investigation.initial_date,
        "yyyy-MM-dd",
        new Date()
      );

      if (isValid(parsedDate)) {
        formattedInitialDate = format(parsedDate, "dd/MM/yy");
      } else {
        console.error("parsedDate is not a valid date:", parsedDate);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }
  }

  if (investigation?.end_date) {
    try {
      const parsedDate = parse(
        investigation.end_date,
        "yyyy-MM-dd",
        new Date()
      );

      if (isValid(parsedDate)) {
        formattedEndDate = format(parsedDate, "dd/MM/yy");
      } else {
        console.error("parsedDate is not a valid date:", parsedDate);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex">
          <Link
            className="text-blue-700 hover:text-blue-800"
            href="/investigaciones"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h3 className="font-semibold ml-3 text-slate-700 text-xl">
            {investigation?.name}
          </h3>
        </div>

        <Link
          href={`/investigaciones/${params.slug}/edit`}
          className="
            text-white 
            bg-blue-700 
            hover:bg-blue-800  
            font-medium rounded-full 
            text-sm px-5 py-2.5 text-center"
        >
          Editar Investigación
        </Link>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold">Ficha Técnica</h4>
              {investigation?.research_plan ? (
                <a
                  href={investigation?.research_plan}
                  className="text-blue-800 text-xs flex font-medium gap-1"
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
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                  Ver Research Plan
                </a>
              ) : (
                <p className="text-xs flex font-medium gap-1">
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
                      d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9"
                    />
                  </svg>
                  Sin Research Plan
                </p>
              )}
            </div>
            <div className="divide-x divide-gray-200 grid grid-cols-2">
              <ul className="flex flex-col gap-6 pr-6">
                <LabelDetail label="Título" value={investigation?.name} />
                <LabelDetail
                  label="Contexto"
                  orientation="vertical"
                  value={investigation?.description}
                />
                <LabelDetail
                  label="Proyecto"
                  value={investigation?.project?.data?.attributes?.name}
                />
                <LabelDetail label="Inicio" value={formattedInitialDate} />
                {formattedEndDate && (
                  <LabelDetail label="Cierre" value={formattedEndDate} />
                )}
              </ul>
              <ul className="flex flex-col gap-6 pl-6">
                {investigation?.teams?.data?.length > 0 && (
                  <LabelDetail
                    label="Áreas involucradas"
                    value={investigation?.teams?.data
                      .map((team) => team.attributes.name)
                      .join(", ")}
                  />
                )}
                <LabelDetail label="Estado" value={investigation?.status} />
                <LabelDetail
                  label="Metodología"
                  value={investigation?.investigation_types?.data
                    .map((methodology) => methodology.attributes.name)
                    .join(", ")}
                />

                {researchTeam && researchTeam?.length > 0 && (
                  <li className="flex gap-4 flex-col">
                    <p className="font-medium">Equipo research:</p>

                    <ul
                      className={`text-sm w-full gap-2 capitalize ${
                        researchTeam?.length >= 2 ? "grid grid-cols-2" : ""
                      }`}
                    >
                      {researchTeam?.map((researcher, index) => {
                        return (
                          <li className="flex gap-2 items-center" key={index}>
                            <Image
                              className="rounded-full"
                              alt={
                                researcher.attributes.photo.data.attributes
                                  .formats.thumbnail.name
                              }
                              src={
                                researcher.attributes.photo.data.attributes.url
                              }
                              width={30}
                              height={30}
                            />
                            <span className="font-medium">
                              {researcher.attributes.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                )}

                {serviceTeam && serviceTeam.length > 0 && (
                  <li className="flex gap-4 flex-col">
                    <p className="font-medium">Equipo service:</p>

                    <ul
                      className={`text-sm w-full gap-2 capitalize ${
                        serviceTeam?.length >= 2 ? "grid grid-cols-2" : ""
                      }`}
                    >
                      {serviceTeam?.map((service, index) => (
                        <li className="flex gap-2 items-center" key={index}>
                          <Image
                            alt={
                              service.attributes.photo.data.attributes.formats
                                .thumbnail.name
                            }
                            className="rounded-full"
                            src={service.attributes.photo.data.attributes.url}
                            width={30}
                            height={30}
                          />
                          <span className="font-medium">
                            {service.attributes.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

                {extendedTeam?.length > 0 && (
                  <li className="flex gap-4 flex-col">
                    <p className="font-medium">Equipo extendido:</p>

                    <ul
                      className={`text-sm gap-2 w-full capitalize ${
                        extendedTeam?.length >= 2 ? "grid grid-cols-2" : ""
                      }`}
                    >
                      {extendedTeam.map((team, index) => (
                        <li className="flex gap-2 items-center" key={index}>
                          <Image
                            className="rounded-full"
                            alt={
                              team.attributes.photo.data.attributes.formats
                                .thumbnail.name
                            }
                            src={team.attributes.photo.data.attributes.url}
                            width={30}
                            height={30}
                          />
                          <span className="font-medium">
                            {team.attributes.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {investigation?.materials.data.map((material, index) => {
            if (
              investigation?.investigation_types?.data[index]?.attributes.name
            ) {
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold">
                      Material de
                      {" " +
                        investigation?.investigation_types?.data[index]
                          ?.attributes.name}
                    </h4>
                    {material.attributes.tool_media ? (
                      <a
                        href={material.attributes.tool_media}
                        className="text-blue-800 text-xs flex font-medium gap-1"
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
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                        Ver Herramienta
                      </a>
                    ) : (
                      <p className="text-xs flex font-medium gap-1">
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
                            d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9"
                          />
                        </svg>
                        Sin Herramienta
                      </p>
                    )}
                  </div>
                  <div className="divide-x divide-gray-200 grid grid-cols-2">
                    <ul className="flex flex-col gap-4">
                      <LabelDetail
                        label="Público objetivo"
                        value={material?.attributes?.publics?.data
                          .map((item) => item.attributes.name)
                          .join(", ")}
                      />

                      <LabelDetail
                        label="Muestra"
                        orientation="vertical"
                        value={material.attributes.sample}
                      />
                    </ul>
                    <ul className="flex flex-col gap-4 pl-6">
                      <LabelDetail
                        label="Ámbito geográfico"
                        orientation={
                          material?.attributes?.locations?.data.length > 4
                            ? "vertical"
                            : "horizontal"
                        }
                        value={material?.attributes?.locations?.data
                          .map((item) => item.attributes.name)
                          .join(", ")}
                      />

                      <LabelDetail
                        label="Herramienta"
                        value={material.attributes.tool}
                      />
                    </ul>
                  </div>
                </div>
              );
            }
          })}

          <div className="grid grid-cols-2 gap-4">
            {investigation?.goal && investigation?.specific_goals && (
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-xl mb-4 capitalize">
                  Objetivo
                </h4>
                <ul className="flex flex-col gap-4">
                  <LabelDetail label="Principal" value={investigation?.goal} />

                  <LabelDetail
                    label="Objetivos específicos"
                    orientation="vertical"
                    value={investigation?.specific_goals}
                  />
                </ul>
              </div>
            )}

            {investigation?.guide_media_link &&
              investigation?.presented_to &&
              formattedPresentedDate && (
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold">Presentación</h4>
                    {investigation?.guide_media_link ? (
                      <a
                        href={investigation?.guide_media_link}
                        className="text-blue-800 text-xs flex font-medium gap-1"
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
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                        Ver Presentación
                      </a>
                    ) : (
                      <p className="text-xs flex font-medium gap-1">
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
                            d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9"
                          />
                        </svg>
                        Sin Presentación
                      </p>
                    )}
                  </div>
                  <ul className="flex flex-col gap-6">
                    <LabelDetail
                      label="Se presentó a"
                      orientation="vertical"
                      value={investigation?.presented_to}
                    />

                    {investigation?.presented_date && (
                      <LabelDetail
                        label="Fecha de Presentación"
                        value={formattedPresentedDate}
                      />
                    )}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
