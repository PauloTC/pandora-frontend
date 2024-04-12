"use client";
import slugify from "slugify";
import Link from "next/link";
import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import { useRef, useEffect, useState } from "react";

import { MultiSelect } from "react-multi-select-component";

import {
  Material,
  Team,
  Investigation,
  InvestigationType,
  Researcher,
  Project,
} from "@/api";

import { useFormik } from "formik";
import { initialValues, validationSchema } from "./InvestigationForm.form";
import { useRouter } from "next/navigation";
import { format, parse } from "date-fns";
import { MaterialsForm } from "@/components/Materials/MaterialsForm";
// import { uploadToS3 } from "@/utils";

import PulseLoader from "react-spinners/PulseLoader";

export function InvestigationForm({ params, title }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  //read investigation
  const [investigation, setInvestigation] = useState({});
  //create investigation
  const [investigationResult, setInvestigationResult] = useState(null);
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [investigationTypes, setInvestigationTypes] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [extendedTeam, setExtendedTeam] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const investigationCtrl = new Investigation();
  const investigationTypeCtrl = new InvestigationType();
  const teamCtrl = new Team();
  const researcherCtrl = new Researcher();
  const projectCtrl = new Project();
  const materialCtrl = new Material();

  const formik = useFormik({
    initialValues: initialValues(investigation),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const slug = slugify(formValues.name, { lower: true, strict: true });
        const teams = formValues.teams.map((team) => team.value);

        const investigation_types = formValues.investigation_types.map(
          (type) => type.value
        );
        const researchers = formValues.researchers.map(
          (researcher) => researcher.value
        );

        const team_extended = formValues.team_extended.map(
          (team) => team.value
        );

        const initial_date = format(
          parse(formValues.initial_date, "dd/MM/yyyy", new Date()),
          "yyyy-MM-dd"
        );

        const end_date =
          formValues.end_date.length && formValues.end_date.trim() !== ""
            ? format(
                parse(formValues.end_date, "dd/MM/yyyy", new Date()),
                "yyyy-MM-dd"
              )
            : null;

        const presented_date =
          formValues.presented_date.length &&
          formValues.presented_date.trim() !== ""
            ? format(
                parse(formValues.presented_date, "dd/MM/yyyy", new Date()),
                "yyyy-MM-dd"
              )
            : null;

        const file = formValues.guide_media_link;
        let guide_media_link = "";

        if (file instanceof File) {
          guide_media_link = await uploadToS3(file, setIsUploading);
        }

        if (investigation && investigation.id) {
          const result = await investigationCtrl.updateInvestigation(
            investigation.id,
            {
              ...formValues,
              slug,
              teams,
              investigation_types,
              researchers,
              team_extended,
              guide_media_link,
              initial_date,
              end_date,
              presented_date,
            }
          );

          setInvestigationResult(result);

          if (formValues.investigation_types.length === 0) {
            router.push("/investigations", { scroll: false });
          } else {
            setStep(2);
          }

          return;
        } else {
          let result = await investigationCtrl.createInvestigation({
            ...formValues,
            slug,
            teams,
            investigation_types,
            researchers,
            team_extended,
            guide_media_link,
            initial_date,
            end_date,
            presented_date,
          });

          const createdInvestigation = result;

          setInvestigationResult(result);

          createdInvestigation.attributes.investigation_types.data.map(
            (type) => {
              //create material
              let material = {
                publics: [],
                slug: slugify(
                  `${type.attributes.name}-${createdInvestigation.id}`,
                  { lower: true, strict: true }
                ),
                sample: "",
                locations: [],
                tool: "",
                tool_media: "",
                investigation: createdInvestigation.id,
              };
              materialCtrl.createMaterial(material);
            }
          );

          createdInvestigation?.attributes.investigation_types?.data.length !==
          0
            ? setStep(2)
            : router.push("/investigations", { scroll: false });
        }
        formik.handleReset();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const initialGuideMediaLinkRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        //si se le pasa parametros a la funcion, se obtiene la investigacion
        if (params) {
          const response = await investigationCtrl.getInvestigation(
            params?.slug
          );

          setInvestigation(response);

          initialGuideMediaLinkRef.current =
            response.attributes.guide_media_link;
        }

        const responseProjects = await projectCtrl.getProjects();
        const responseTeams = await teamCtrl.getTeams();
        const responseInvestigationTypes =
          await investigationTypeCtrl.getInvestigationTypes();
        const responseResearchers = await researcherCtrl.getResearchersByRole(
          "researcher"
        );
        const responseExtendedTeam =
          await researcherCtrl.getResearchersOtherRole();

        setProjects(
          responseProjects.data.map((project) => ({
            value: project.id,
            label: project.attributes.name,
          }))
        );

        setTeams(
          responseTeams.data.map((team) => ({
            value: team.id,
            label: team.attributes.name,
          }))
        );

        setInvestigationTypes(
          responseInvestigationTypes.data.map((type) => ({
            value: type.id,
            label: type.attributes.name,
          }))
        );

        setResearchers(
          responseResearchers.data.map((researcher) => ({
            value: researcher.id,
            label: researcher.attributes.name,
          }))
        );

        setExtendedTeam(
          responseExtendedTeam.data.map((team) => ({
            value: team.id,
            label: team.attributes.name,
          }))
        );
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (investigation) {
      formik.resetForm({ values: initialValues(investigation) });
    }
  }, [investigation]);

  const status = [
    { value: "en curso", label: "En curso" },
    { value: "finalizado", label: "Finalizado" },
    { value: "por iniciar", label: "Por iniciar" },
    { value: "bloqueado", label: "Bloqueado" },
  ];

  return (
    <div>
      {isUploading && (
        <div
          className={`${libre_franklin600.className} 
            gap-4
            text-xl absolute top-0 right-0 bottom-0 
            left-0 w-full h-screen bg-black/50 z-50
            flex text-white flex-col justify-center
            items-center
          `}
        >
          <PulseLoader color="#fff" />
        </div>
      )}
      {step === 1 && (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
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
              <h4
                className={`${libre_franklin700.className} flex flex-col ml-3 text-slate-700 capitalize text-xl`}
              >
                {title}
              </h4>
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Guardar
            </button>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4
                  className={`${libre_franklin700.className} text-xl mb-4 flex items-center justify-between`}
                >
                  Ficha Técnica
                  <span className="text-xs text-red-500 font-regular">
                    (*) Campos requeridos
                  </span>
                </h4>
                <div className="divide-x divide-gray-200 grid grid-cols-2 gap-6">
                  <ul className="flex flex-col gap-6">
                    <li className="flex gap-4">
                      <label htmlFor="name" className="flex flex-col w-80">
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Título de la investigación*
                        </span>
                        <span className="text-xs font-regular">
                          Máximo 40 caracteres
                        </span>
                      </label>

                      <input
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name}
                        maxLength={40}
                        type="text"
                        id="name"
                        className="
                                self-start 
                                border border-gray-300 
                                text-gray-900 text-sm rounded-lg 
                                focus:ring-blue-500 focus:border-blue-500 
                                block w-full p-2.5"
                        placeholder="Titulo de la investigación"
                        required
                      />
                    </li>

                    <li className="flex gap-4">
                      <label
                        className="flex flex-col w-80"
                        htmlFor="description"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Contexto de investigación
                        </span>
                        <span className="text-xs font-regular">
                          Máximo 200 caracteres
                        </span>
                      </label>
                      <textarea
                        id="description"
                        rows="5"
                        maxLength={200}
                        className="w-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                        placeholder="Escribir la descripción..."
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.errors.description}
                      ></textarea>
                    </li>

                    <li className="flex items-center gap-4">
                      <label htmlFor="project" className="flex flex-col w-80">
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Proyecto*
                        </span>
                        <span className="text-xs font-regular">
                          Proyecto de la investigación
                        </span>
                      </label>
                      <select
                        value={formik.values.project}
                        onChange={formik.handleChange}
                        error={formik.errors.project}
                        required
                        name="project"
                        id="project"
                        className="
                                border 
                                border-gray-300 
                                text-gray-900 
                                text-sm rounded-lg 
                                focus:ring-blue-500 
                                focus:border-blue-500 
                                block w-full p-2.5"
                      >
                        <option value="">Seleccionar proyecto</option>
                        {projects.map((project) => (
                          <option key={project.value} value={project.value}>
                            {project.label}
                          </option>
                        ))}
                      </select>
                    </li>

                    <li className="flex items-center gap-4">
                      <label
                        htmlFor="initial_date"
                        className="flex flex-col w-80"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Fecha de inicio*
                        </span>
                        <span className="text-xs font-regular">
                          ejemplo: (10/02/2023)
                        </span>
                      </label>
                      <input
                        value={formik.values.initial_date}
                        onChange={formik.handleChange}
                        error={formik.errors.initial_date}
                        type="text"
                        id="initial_date"
                        className="
                                self-start 
                                border border-gray-300 
                                text-gray-900 text-sm rounded-lg 
                                focus:ring-blue-500 focus:border-blue-500 
                                block w-full p-2.5"
                        placeholder="Fecha inicial"
                      />
                    </li>

                    <li className="flex items-center gap-4">
                      <label htmlFor="end_date" className="flex flex-col w-80">
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Fecha de cierre
                        </span>
                        <span className="text-xs font-regular">
                          ejemplo: (10/02/2023)
                        </span>
                      </label>
                      <input
                        value={formik.values.end_date}
                        onChange={formik.handleChange}
                        error={formik.errors.end_date}
                        type="text"
                        id="end_date"
                        className="
                                self-start 
                                border border-gray-300 
                                text-gray-900 text-sm rounded-lg 
                                focus:ring-blue-500 focus:border-blue-500 
                                block w-full p-2.5"
                        placeholder="Fecha de cierre"
                      />
                    </li>
                  </ul>
                  <ul className="flex flex-col gap-6 pl-6">
                    <li className="flex gap-4">
                      <label htmlFor="teams" className="flex flex-col w-80">
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Áreas involucradas*
                        </span>
                        <span className="text-xs font-regular">
                          Areas que participan
                        </span>
                      </label>

                      <MultiSelect
                        className="w-full text-sm"
                        required
                        options={teams}
                        placeholder="Seleccionar equipos"
                        value={formik.values.teams}
                        onChange={(value) =>
                          formik.setFieldValue("teams", value)
                        }
                        error={formik.errors.teams}
                        labelledBy="Select"
                      />
                    </li>

                    <li className="flex items-center gap-4">
                      <label htmlFor="status" className="flex flex-col w-80">
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Estado*
                        </span>
                        <span className="text-xs font-regular">
                          Estado de la investigación
                        </span>
                      </label>
                      <select
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        error={formik.errors.status}
                        required
                        id="status"
                        className="
                                border 
                                border-gray-300 
                                text-gray-900 
                                text-sm rounded-md
                                focus:ring-blue-500 
                                focus:border-blue-500 
                                block w-full p-2.5"
                      >
                        {status.map((state) => (
                          <option key={state.value} value={state.value}>
                            {state.label}
                          </option>
                        ))}
                      </select>
                    </li>

                    <li className="flex gap-4">
                      <label
                        className="flex flex-col w-80"
                        htmlFor="investigation_types"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Metodología
                        </span>
                        <span className="text-xs font-regular">
                          Tipo de investigación
                        </span>
                      </label>
                      <MultiSelect
                        className="w-full text-sm"
                        options={investigationTypes}
                        value={formik.values.investigation_types}
                        onChange={(value) =>
                          formik.setFieldValue("investigation_types", value)
                        }
                        error={formik.errors.investigation_types}
                        labelledBy="Select"
                      />
                    </li>

                    <li className="flex gap-4">
                      <label
                        className="flex flex-col w-80"
                        htmlFor="researchers"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Researchers*
                        </span>
                        <span className="text-xs font-regular">
                          Principales responsables
                        </span>
                      </label>
                      <MultiSelect
                        className="w-full text-sm"
                        required
                        options={researchers}
                        value={formik.values.researchers}
                        onChange={(value) =>
                          formik.setFieldValue("researchers", value)
                        }
                        error={formik.errors.researchers}
                        labelledBy="Select"
                      />
                    </li>

                    <li className="flex gap-4">
                      <label
                        className="flex flex-col w-80"
                        htmlFor="team_extended"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Equipo extendido
                        </span>
                        <span className="text-xs font-regular">
                          Personas involucradas
                        </span>
                      </label>
                      <MultiSelect
                        className="w-full text-sm"
                        options={extendedTeam}
                        value={formik.values.team_extended}
                        onChange={(value) =>
                          formik.setFieldValue("team_extended", value)
                        }
                        error={formik.errors.team_extended}
                        labelledBy="Select"
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4
                    className={`${libre_franklin700.className} text-xl mb-4 capitalize`}
                  >
                    Objetivo
                  </h4>
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                      <label htmlFor="goal" className="flex flex-col w-80">
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Objetivo Principal:
                        </span>
                        <span className="text-xs font-regular">
                          Máximo 40 caracteres
                        </span>
                      </label>

                      <input
                        defaultValue={investigation?.goal}
                        value={formik.values.goal}
                        onChange={formik.handleChange}
                        error={formik.errors.goal}
                        type="text"
                        id="goal"
                        className="
                              self-start 
                              border border-gray-300 
                              text-gray-900 text-sm rounded-lg 
                              focus:ring-blue-500 focus:border-blue-500 
                              block w-full p-2.5"
                        placeholder="Principal objetivo"
                      />
                    </li>

                    <li className="flex gap-4">
                      <label
                        className="flex flex-col w-80"
                        htmlFor="specific_goals"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Objetivos Especificos:
                        </span>
                        <span className="text-xs font-regular">
                          Máximo 200 caracteres
                        </span>
                      </label>
                      <textarea
                        id="specific_goals"
                        rows="5"
                        className="w-full text-sm text-gray-900 bg-white border border-gray-200 p-4 rounded-xl "
                        placeholder="Objetivos especificos..."
                        defaultValue={investigation?.specific_goals}
                        value={formik.values.specific_goals}
                        onChange={formik.handleChange}
                        error={formik.errors.specific_goals}
                      ></textarea>
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
                    <li className="flex gap-4">
                      <label
                        className="flex flex-col w-80"
                        htmlFor="guide_media_link"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Adjuntar archivo
                        </span>
                        <span className="text-xs font-regular">
                          (Jpg,Png, Pdf, Docx, Xlsx, Pptx)
                        </span>
                      </label>

                      <div className="flex flex-col gap-2 w-64">
                        <input
                          type="file"
                          id="guide_media_link"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "guide_media_link",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {typeof initialGuideMediaLinkRef.current === "string" &&
                          initialGuideMediaLinkRef.current !== "" && (
                            <a
                              href={initialGuideMediaLinkRef.current}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:underline text-xs font-regular flex justify-end"
                            >
                              Ver archivo actual
                            </a>
                          )}
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <label
                        htmlFor="presented_to"
                        className="flex flex-col w-80"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          A quién se presentó
                        </span>
                        <span className="text-xs font-regular">
                          Listado de personas
                        </span>
                      </label>
                      <input
                        type="text"
                        id="presented_to"
                        value={formik.values.presented_to}
                        onChange={formik.handleChange}
                        error={formik.errors.presented_to}
                        className="
                              self-start 
                              border border-gray-300 
                              text-gray-900 text-sm rounded-lg 
                              focus:ring-blue-500 focus:border-blue-500 
                              block w-full p-2.5"
                        placeholder="Listado de personas"
                      />
                    </li>
                    <li className="flex items-center gap-4">
                      <label
                        htmlFor="presented_date"
                        className="flex flex-col w-80"
                      >
                        <span
                          className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                        >
                          Fecha de Presentación
                        </span>
                        <span className="text-xs font-regular">
                          ejemplo: (10/02/2023)
                        </span>
                      </label>
                      <input
                        value={formik.values.presented_date}
                        onChange={formik.handleChange}
                        error={formik.errors.presented_date}
                        type="text"
                        id="presented_date"
                        className="
                              self-start 
                              border border-gray-300 
                              text-gray-900 text-sm rounded-lg 
                              focus:ring-blue-500 focus:border-blue-500 
                              block w-full p-2.5"
                        placeholder="Fecha de presentación"
                      />
                      <br />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      {step === 2 && (
        <MaterialsForm slug={investigationResult.attributes.slug} />
      )}
    </div>
  );
}
