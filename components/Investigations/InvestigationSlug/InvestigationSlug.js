"use client";
import Link from "next/link";

import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import Image from "next/image";
import { Investigation } from "@/api";
import { useEffect, useState } from "react";
import { format, parse, startOfDay, isValid } from "date-fns";

export function InvestigationSlugComponent({ params }) {
  const investigationCtrl = new Investigation();

  const [investigation, setInvestigation] = useState(null);
  const [serviceTeam, setServiceTeam] = useState(null);
  const [researchTeam, setResearchTeam] = useState(null);

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

    console.log("investigation", investigation);

    setResearchTeam(filterResearcherTeam);
    setServiceTeam(filterServiceTeam);
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
            href="/investigations"
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
          <h3
            className={`${libre_franklin600.className} ml-3 text-slate-700 uppercase text-xl`}
          >
            {investigation?.name}
          </h3>
        </div>

        <Link
          href={`/investigations/${params.slug}/edit`}
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
            <h4 className={`${libre_franklin700.className} text-xl mb-4 flex`}>
              Ficha Técnica
            </h4>
            <div className="divide-x divide-gray-200 grid grid-cols-2">
              <ul className="flex flex-col gap-6 pr-6">
                <li className="flex gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Título de la investigación:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.name}
                  </p>
                </li>
                <li className="flex gap-4 flex-col">
                  <label className="flex w-80" htmlFor="description">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Contexto de investigación:
                    </span>
                  </label>
                  <p className="text-sm w-full">{investigation?.description}</p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Proyecto:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.project?.data?.attributes?.name}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Fecha de inicio:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {formattedInitialDate}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Fecha de cierre:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {formattedEndDate}
                  </p>
                </li>
              </ul>
              <ul className="flex flex-col gap-6 pl-6">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Áreas involucradas:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.teams?.data
                      .map((team) => team.attributes.name)
                      .join(", ")}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Estado:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.status}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Metodología:
                    </span>
                  </label>

                  <p className="text-sm  w-full capitalize">
                    {investigation?.investigation_types?.data
                      .map((methodology) => methodology.attributes.name)
                      .join(", ")}
                  </p>
                </li>
                <li className="flex flex-col gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Equipo Research:
                    </span>
                  </label>

                  <ul className="text-sm  w-full gap-4 capitalize grid grid-cols-2">
                    {researchTeam?.map((researcher, index) => {
                      console.log("researcher", researcher);

                      return (
                        <li className="flex gap-4 items-center" key={index}>
                          <Image
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
                          <span>{researcher.attributes.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                {serviceTeam && serviceTeam.length > 0 && (
                  <li className="flex flex-col gap-4">
                    <label htmlFor="name" className="w-80">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Equipo Service:
                      </span>
                    </label>

                    <ul className="text-sm  w-full gap-4 capitalize grid grid-cols-2">
                      {serviceTeam?.map((service, index) => (
                        <li className="flex gap-4 items-center" key={index}>
                          <Image
                            alt={
                              service.attributes.photo.data.attributes.formats
                                .thumbnail.name
                            }
                            src={service.attributes.photo.data.attributes.url}
                            width={30}
                            height={30}
                          />
                          <span>{service.attributes.name}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

                {investigation?.team_extended.data.length > 0 && (
                  <li className="flex flex-col gap-4">
                    <label htmlFor="name" className="w-80">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Equipo extendido:
                      </span>
                    </label>

                    <ul className="text-sm gap-4 w-full capitalize grid grid-cols-2">
                      {investigation?.team_extended.data.map((team, index) => (
                        <li className="flex gap-4 items-center" key={index}>
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
                          <span>{team.attributes.name}</span>
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
                  <h4 className={`${libre_franklin700.className} text-xl mb-4`}>
                    Material de
                    {" " +
                      investigation?.investigation_types?.data[index]
                        ?.attributes.name}
                  </h4>
                  <div className="divide-x divide-gray-200 grid grid-cols-2">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <label htmlFor="name" className="w-80">
                          <span
                            className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                          >
                            Público objetivo:
                          </span>
                        </label>

                        <p className="text-sm  w-full capitalize">
                          {material?.attributes?.publics?.data
                            .map((item) => item.attributes.name)
                            .join(", ")}
                        </p>
                      </li>
                      <li className="flex gap-4 flex-col">
                        <label className="flex w-80" htmlFor="description">
                          <span
                            className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                          >
                            Muestra:
                          </span>
                        </label>
                        <div className="text-sm w-full">
                          {material.attributes.sample
                            .split("\n")
                            .map((line, index) => (
                              <p key={index}>
                                {line}
                                <br />
                              </p>
                            ))}
                        </div>
                      </li>
                    </ul>
                    <ul className="flex flex-col gap-4 pl-6">
                      <li className="flex items-center gap-4">
                        <label htmlFor="name" className="w-80">
                          <span
                            className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                          >
                            Ámbito geográfico:
                          </span>
                        </label>

                        <p className="text-sm  w-full capitalize">
                          {material?.attributes?.locations?.data
                            .map((item) => item.attributes.name)
                            .join(", ")}
                        </p>
                      </li>
                      <li className="flex items-center gap-4">
                        <label htmlFor="name" className="w-80">
                          <span
                            className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                          >
                            Herramienta:
                          </span>
                        </label>

                        <p className="text-sm w-full capitalize">
                          {material.attributes.tool}
                        </p>
                      </li>
                      <li className="flex items-center gap-4">
                        <label htmlFor="name" className="w-80">
                          <span
                            className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                          >
                            Herramienta adjunta:
                          </span>
                        </label>

                        {material.attributes.tool_media && (
                          <a
                            target="_blank"
                            href={material.attributes.tool_media}
                            className="text-sm w-full capitalize text-blue-600 hover:underline"
                          >
                            Descargar aquí
                          </a>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }
          })}

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-xl p-6">
              <h4
                className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
              >
                Objetivo
              </h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Objetivo Principal:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.goal}
                  </p>
                </li>
                <li className="flex gap-4 flex-col">
                  <label className="flex w-80" htmlFor="description">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Objetivos Especificos:
                    </span>
                  </label>
                  <p className="text-sm w-full">
                    {investigation?.specific_goals}
                  </p>
                </li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h4
                className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
              >
                Presentación
              </h4>
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Archivo adjunto:
                    </span>
                  </label>

                  {investigation?.guide_media_link && (
                    <a
                      href={investigation?.guide_media_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm w-full block capitalize text-blue-600 hover:underline"
                    >
                      Descargar aquí
                    </a>
                  )}
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      A quién se presentó:
                    </span>
                  </label>

                  <p className="text-sm w-full capitalize">
                    {investigation?.presented_to}
                  </p>
                </li>
                <li className="flex items-center gap-4">
                  <label htmlFor="name" className="w-80">
                    <span
                      className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                    >
                      Fecha de Presentación:
                    </span>
                  </label>

                  {investigation?.presented_date && (
                    <p className="text-sm  w-full capitalize">
                      {formattedPresentedDate}
                    </p>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
