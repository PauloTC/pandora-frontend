"use client";
import slugify from "slugify";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import { Label } from "@/components/Common";

import {
  Material,
  Team,
  Investigation,
  InvestigationType,
  Researcher,
  Project,
  uploadToS3,
} from "@/api";

import { useFormik } from "formik";
import { initialValues, validationSchema } from "./InvestigationForm.form";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { MaterialsForm } from "@/components/Materials/MaterialsForm";

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
  const [serviceTeam, setServiceTeam] = useState([]);
  const [extendedTeam, setExtendedTeam] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [researchPlan, setResearchPlan] = useState(false);

  //Estado de las fechas
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [presentedDate, setPresentedDate] = useState(null);

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

        const researchersValues = formValues.researchers.map(
          (researcher) => researcher.value
        );

        const serviceTeamValues = formValues.service_team.map(
          (team) => team.value
        );

        const researchers = [...researchersValues, ...serviceTeamValues];

        const team_extended = formValues.team_extended.map(
          (team) => team.value
        );

        const updateMaterials = async (investigationType, investigationId) => {
          for (const type of investigationType) {
            //create material
            let material = {
              publics: [],
              slug: slugify(`${type.label}-${investigationId}`, {
                lower: true,
                strict: true,
              }),
              sample: "",
              locations: [],
              tool: "",
              tool_media: "",
              investigation: investigation.id,
            };

            try {
              await materialCtrl.createMaterial(material);
            } catch (error) {
              console.error(`Error creating material:`, error);
            }
          }
        };

        const createMaterials = async (investigation) => {
          for (const type of investigation.attributes.investigation_types
            .data) {
            //create material
            let material = {
              publics: [],
              slug: slugify(`${type.attributes.name}-${investigation.id}`, {
                lower: true,
                strict: true,
              }),
              sample: "",
              locations: [],
              tool: "",
              tool_media: "",
              investigation: investigation.id,
            };

            try {
              await materialCtrl.createMaterial(material);
            } catch (error) {
              console.error(`Error creating material:`, error);
            }
          }
        };

        const initial_date = format(startDate, "yyyy-MM-dd");

        //mejora de código

        const uploadFile = async (file) => {
          if (file instanceof File) {
            try {
              return await uploadToS3(file, setIsUploading, (errorMessage) => {
                throw new Error(errorMessage);
              });
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al subir el archivo: " + error.message,
              });
              throw error; // Si hay un error, lanzar la excepción
            }
          }
          return file;
        };

        const file = formValues.guide_media_link;
        const fileResearchPlan = formValues.research_plan;

        let guide_media_link =
          investigation?.attributes?.guide_media_link || "";
        let research_plan = investigation?.attributes?.research_plan || "";

        try {
          research_plan = await uploadFile(fileResearchPlan);
          guide_media_link = await uploadFile(file);
        } catch (error) {
          return; // Si hay un error, salir de la función
        }

        let investigationData = {
          ...formValues,
          slug,
          teams,
          researchers,
          team_extended,
          investigation_types,
          guide_media_link,
          initial_date,
          research_plan,
        };

        if (presentedDate) {
          investigationData.presented_date = format(
            presentedDate,
            "yyyy-MM-dd"
          );
        }

        if (endDate) {
          investigationData.end_date = format(endDate, "yyyy-MM-dd");
        }

        if (investigation && investigation.id) {
          const result = await investigationCtrl.updateInvestigation(
            investigation.id,
            investigationData
          );

          if (result.attributes.materials) {
            const formattedLabels = formValues.investigation_types.map((type) =>
              type.label.toLowerCase().replace(/ /g, "-")
            );

            const unselectedMaterials = result.attributes.materials.data.filter(
              (material) =>
                !formattedLabels.some((label) =>
                  material.attributes.slug.includes(label)
                )
            );

            const materialSlugs = result.attributes.materials.data.map(
              (material) => material.attributes.slug
            );

            const unselectedMaterialIds = unselectedMaterials.map(
              (material) => material.id
            );

            const unselectedInvestigationTypes =
              formValues.investigation_types.filter(
                (type) =>
                  !materialSlugs.some((slug) =>
                    slug.includes(type.label.toLowerCase().replace(/ /g, "-"))
                  )
              );

            updateMaterials(unselectedInvestigationTypes, result.id);

            for (const id of unselectedMaterialIds) {
              try {
                await materialCtrl.deleteMaterial(id);
              } catch (error) {
                console.error(`Error deleting material ${id}:`, error);
                throw error;
              }
            }
          }

          setInvestigationResult(result);

          if (formValues.investigation_types.length === 0) {
            router.push("/investigaciones", { scroll: false });
          } else {
            setStep(2);
          }

          return;
        } else {
          let investigationCreated =
            await investigationCtrl.createInvestigation(investigationData);

          setInvestigationResult(investigationCreated);

          createMaterials(investigationCreated);

          investigationCreated.attributes.investigation_types.data.length !== 0
            ? setStep(2)
            : router.push("/investigaciones", { scroll: false });
        }
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

        const participants = await researcherCtrl.getAllParticipants();

        const serviceParticipants = participants.data.filter(
          (participant) => participant.attributes.role === "service"
        );

        setServiceTeam(
          serviceParticipants.map((service) => ({
            value: service.id,
            label: service.attributes.name,
          }))
        );

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
    if (investigation.attributes) {
      formik.resetForm({ values: initialValues(investigation) });

      setStartDate(parseISO(investigation?.attributes?.initial_date));

      if (investigation?.attributes?.end_date) {
        setEndDate(parseISO(investigation?.attributes?.end_date));
      }
      if (investigation?.attributes?.presented_date) {
        setPresentedDate(parseISO(investigation?.attributes?.presented_date));
      }
    }
  }, [investigation]);

  const status = [
    { value: "en curso", label: "En curso" },
    { value: "finalizado", label: "Finalizado" },
    { value: "por iniciar", label: "Por iniciar" },
    { value: "bloqueado", label: "Bloqueado" },
  ];

  const handleFileUpload = (event) => {
    formik.setFieldValue("research_plan", event.target.files[0]);

    setResearchPlan(event.target.files[0].name);
  };

  return (
    <div>
      {isUploading && (
        <div
          className={`
            gap-4 font-semibold
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
              <h4 className="font-semibold flex flex-col ml-3 text-slate-700 capitalize text-xl">
                {title}
              </h4>
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              {formik.values.investigation_types.length === 0
                ? "Guardar"
                : "Siguiente"}
            </button>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold">Ficha Técnica</h4>
                  <div className="flex divide-x-2 ">
                    {investigation?.attributes?.research_plan && (
                      <a
                        className="text-xs font-regular text-blue-700 hover:underline pr-4"
                        href={investigation?.attributes?.research_plan}
                      >
                        Actual Research Plan
                      </a>
                    )}
                    <label
                      htmlFor="research_plan"
                      className="cursor-pointer hover:underline text-xs font-regular gap-1 flex items-center relative text-blue-700 pl-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </label>
                    <input
                      type="file"
                      id="research_plan"
                      className="absolute opacity-0"
                      onChange={handleFileUpload}
                    />
                    <em className="not-italic">
                      {researchPlan
                        ? `Research Plan: ${researchPlan}`
                        : "Agregar Research Plan"}
                    </em>
                  </div>
                </div>
                <div className="divide-x divide-gray-200 grid grid-cols-2 gap-y-6">
                  <ul className="flex flex-col gap-6 pr-6">
                    <li className="flex gap-4">
                      <Label subtext="Máximo 70 caracteres" htmlFor="name">
                        Titulo*
                      </Label>

                      <input
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name}
                        maxLength={70}
                        type="text"
                        id="name"
                        className={`
                          self-start h-10 border border-gray-300 
                          text-gray-900 text-sm rounded
                          outline-blue-500 block w-64 p-2.5
                          ${
                            formik.values.name === ""
                              ? "opacity-90"
                              : "opacity-100"
                          }
                          
                        `}
                        placeholder="Titulo de la investigación"
                        required
                      />
                    </li>

                    <li className="flex gap-4">
                      <Label
                        subtext="Máximo 200 caracteres"
                        htmlFor="description"
                      >
                        Contexto
                      </Label>
                      <textarea
                        id="description"
                        rows="5"
                        maxLength={200}
                        className={`
                          w-64 text-sm text-gray-900 
                          bg-white border border-gray-300 p-2.5 
                          rounded outline-blue-500
                           ${
                             formik.values.description === ""
                               ? "opacity-90"
                               : "opacity-100"
                           }
                        `}
                        placeholder="Escribir el contexto de la investigación"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.errors.description}
                      ></textarea>
                    </li>

                    <li className="flex items-center gap-4">
                      <Label
                        subtext="Proyecto de la investigación"
                        htmlFor="project"
                      >
                        Proyecto*
                      </Label>

                      <div className="relative">
                        <select
                          value={formik.values.project}
                          onChange={formik.handleChange}
                          error={formik.errors.project}
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
                            ${
                              formik.values.project === ""
                                ? "text-gray-400"
                                : "text-gray-900"
                            }
                            ${
                              formik.values.project === ""
                                ? "opacity-90"
                                : "opacity-100"
                            }
                          `}
                        >
                          <option value="">Selecciona un proyecto</option>
                          {projects.map((project) => (
                            <option key={project.value} value={project.value}>
                              {project.label}
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
                      <Label
                        subtext="Elige una fecha de inicio"
                        htmlFor="initial_date"
                      >
                        Fecha de inicio*
                      </Label>

                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecciona una fecha inicial"
                        className={`
                          placeholder-gray-150
                          border border-gray-300 
                          text-sm block p-2 w-64 
                          rounded h-10 outline-blue-500
                          ${startDate ? "opacity-100" : "opacity-90"}
                        `}
                        selected={startDate}
                        required
                        onChange={(date) => setStartDate(date)}
                      />
                    </li>

                    <li className="flex items-center">
                      <Label subtext="Elige una fecha final" htmlFor="end_date">
                        Fecha de cierre
                      </Label>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecciona una fecha final"
                        className={`
                          border border-gray-300 text-sm block p-2 w-64 rounded h-10 outline-blue-500
                          ${endDate ? "opacity-100" : "opacity-90"}
                        `}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                      />
                    </li>
                  </ul>
                  <ul className="flex flex-col gap-6 pl-6">
                    <li className="flex gap-4">
                      <Label
                        subtext="Áreas amigas que participaron"
                        htmlFor="teams"
                      >
                        áreas involucradas
                      </Label>

                      <MultiSelect
                        className={`
                          w-64 text-sm border-gray-300
                        `}
                        options={teams}
                        placeholder="Seleccionar equipos"
                        value={formik.values.teams}
                        onChange={(value) =>
                          formik.setFieldValue("teams", value)
                        }
                        error={formik.errors.teams}
                        labelledBy="Select"
                        overrideStrings={{
                          selectSomeItems: (
                            <span
                              className={
                                formik.values.teams.length
                                  ? "opacity-100"
                                  : "opacity-90"
                              }
                            >
                              Seleccionar áreas
                            </span>
                          ),
                          search: "Buscar área",
                          selectAll: "Todas las áreas",
                          allItemsAreSelected: "Todas fueron seleccionadas",
                        }}
                      />
                    </li>

                    <li className="flex items-center gap-4">
                      <Label
                        subtext="Estado de la investigación"
                        htmlFor="status"
                      >
                        Estado*
                      </Label>

                      <div className="relative">
                        <select
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          error={formik.errors.status}
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

                    <li className="flex gap-4">
                      <Label
                        subtext="Tipo de investigación"
                        htmlFor="investigation_types"
                      >
                        Metodología
                      </Label>

                      <MultiSelect
                        className="w-64 text-sm"
                        options={investigationTypes}
                        value={formik.values.investigation_types}
                        onChange={(value) =>
                          formik.setFieldValue("investigation_types", value)
                        }
                        error={formik.errors.investigation_types}
                        labelledBy="Select"
                        overrideStrings={{
                          selectSomeItems: (
                            <span
                              className={
                                formik.values.teams.length
                                  ? "opacity-100"
                                  : "opacity-90"
                              }
                            >
                              Seleccionar metodologías
                            </span>
                          ),
                          search: "Buscar metodología",
                          selectAll: "Todas las metodologías",
                          allItemsAreSelected: "Todas fueron seleccionadas",
                        }}
                      />
                    </li>

                    <li className="flex gap-4">
                      <Label
                        subtext="Researchers involucrados"
                        htmlFor="researchers"
                      >
                        Equipo research
                      </Label>

                      <MultiSelect
                        className="text-sm w-64"
                        options={researchers}
                        value={formik.values.researchers}
                        onChange={(value) =>
                          formik.setFieldValue("researchers", value)
                        }
                        error={formik.errors.researchers}
                        labelledBy="Select"
                        overrideStrings={{
                          selectSomeItems: (
                            <span
                              className={
                                formik.values.teams.length
                                  ? "opacity-100"
                                  : "opacity-90"
                              }
                            >
                              Seleccionar researcher
                            </span>
                          ),
                          search: "Buscar researcher",
                          selectAll: "Todo el equipo participa",
                          allItemsAreSelected: "Todo el equipo participa",
                        }}
                      />
                    </li>

                    <li className="flex gap-4">
                      <Label subtext="Services involucrados" htmlFor="service">
                        Equipo service
                      </Label>

                      <MultiSelect
                        className="text-sm w-64"
                        options={serviceTeam}
                        value={formik.values.service_team}
                        onChange={(value) =>
                          formik.setFieldValue("service_team", value)
                        }
                        error={formik.errors.service_team}
                        labelledBy="Select"
                        overrideStrings={{
                          selectSomeItems: (
                            <span
                              className={
                                formik.values.teams.length
                                  ? "opacity-100"
                                  : "opacity-90"
                              }
                            >
                              Seleccionar service
                            </span>
                          ),
                          search: "Buscar service",
                          selectAll: "Todo el equipo participa",
                          allItemsAreSelected: "Todo el equipo participa",
                        }}
                      />
                    </li>

                    <li className="flex gap-4">
                      <Label
                        subtext="Otros perfiles involucrados"
                        htmlFor="team_extended"
                      >
                        Equipo extendido
                      </Label>

                      <MultiSelect
                        className="w-64 text-sm"
                        options={extendedTeam}
                        value={formik.values.team_extended}
                        onChange={(value) =>
                          formik.setFieldValue("team_extended", value)
                        }
                        error={formik.errors.team_extended}
                        labelledBy="Select"
                        overrideStrings={{
                          selectSomeItems: (
                            <span
                              className={
                                formik.values.teams.length
                                  ? "opacity-100"
                                  : "opacity-90"
                              }
                            >
                              Seleccionar integrante
                            </span>
                          ),
                          search: "Buscar integrante",
                          selectAll: "Todo el equipo participa",
                          allItemsAreSelected: "Todo el equipo participa",
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-xl mb-4 capitalize">
                    Objetivo
                  </h4>
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                      <Label htmlFor="goal" subtext="Máximo 70 caracteres">
                        Objetivo principal
                      </Label>

                      <input
                        defaultValue={investigation?.goal}
                        value={formik.values.goal}
                        onChange={formik.handleChange}
                        error={formik.errors.goal}
                        maxLength={70}
                        type="text"
                        id="goal"
                        className={`
                          self-start 
                          border border-gray-300 
                          text-gray-900 text-sm rounded 
                          outline-blue-500 h-10
                          block w-64 p-2.5
                          ${
                            formik.values.goal === ""
                              ? "opacity-90"
                              : "opacity-100"
                          }
                        `}
                        placeholder="Objetivo principal"
                      />
                    </li>

                    <li className="flex gap-4">
                      <Label
                        htmlFor="specific_goals"
                        subtext="Máximo 200 caracteres"
                      >
                        Objetivos específicos
                      </Label>
                      <textarea
                        id="specific_goals"
                        rows="5"
                        maxLength={200}
                        className={`
                            w-64 text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500
                            ${
                              formik.values.specific_goals === ""
                                ? "opacity-90"
                                : "opacity-100"
                            }
                          `}
                        placeholder="Objetivos específicos"
                        defaultValue={investigation?.specific_goals}
                        value={formik.values.specific_goals}
                        onChange={formik.handleChange}
                        error={formik.errors.specific_goals}
                      ></textarea>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-xl mb-4 capitalize">
                    Presentación
                  </h4>
                  <ul className="flex flex-col gap-6">
                    <li className="flex gap-4 justify-between">
                      <Label
                        subtext="(Jpg,Png,Pdf,Doc,Docx,Xlsx,Pptx)"
                        htmlFor="guide_media_link"
                      >
                        Adjuntar archivo
                      </Label>

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
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:underline text-xs font-regular flex justify-end"
                            >
                              Ver archivo actual
                            </a>
                          )}
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <Label
                        subtext="Listado de personas"
                        htmlFor="presented_to"
                      >
                        A quién se presentó
                      </Label>

                      <input
                        type="text"
                        id="presented_to"
                        value={formik.values.presented_to}
                        onChange={formik.handleChange}
                        error={formik.errors.presented_to}
                        className={`
                          self-start 
                          border border-gray-300 
                          text-gray-900 text-sm rounded
                          outline-blue-500
                          w-64 block p-2.5 h-10
                          ${
                            formik.values.goal === ""
                              ? "opacity-90"
                              : "opacity-100"
                          }
                        `}
                        placeholder="Listado de personas"
                      />
                    </li>

                    <li className="flex items-center">
                      <Label
                        subtext="Cuando se presentó"
                        htmlFor="presented_date"
                      >
                        Fecha de presentación
                      </Label>

                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecciona una fecha"
                        className={`
                          border border-gray-300 text-sm block p-2 w-64 rounded h-10 outline-blue-500
                          ${endDate ? "opacity-100" : "opacity-90"}
                        `}
                        selected={presentedDate}
                        onChange={(date) => setPresentedDate(date)}
                      />
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
