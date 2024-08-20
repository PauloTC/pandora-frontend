"use client";
import { Label } from "@/components/Common";
import { useFormik } from "formik";
import {
  ExperimentType,
  Researcher,
  Vp,
  Project,
  Experiment,
  ExecutionMethod,
} from "@/api";
import ReactQuill from "react-quill";
// @ts-ignore
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { MultiSelect } from "react-multi-select-component";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
import { SelectOption } from "@/types";

export default function ExperimentForm() {
  const [participants, setParticipants] = useState([]);
  const [vps, setVps] = useState<SelectOption[]>([]);
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [experimentTypes, setExperimentTypes] = useState<SelectOption[]>([]);
  const [executionMethods, setExecutionMethods] = useState([]);
  const [reference, setReference] = useState("");

  const status = [
    { value: "en curso", label: "En curso" },
    { value: "finalizado", label: "Finalizado" },
    { value: "en pausa", label: "En pausa" },
    { value: "cancelado", label: "Cancelado" },
  ];

  const experimentCtrl = new Experiment();
  const researcherCtrl = new Researcher();
  const vpCtrl = new Vp();
  const projectCtrl = new Project();
  const experimentTypeCtrl = new ExperimentType();
  const executionMethodCtrl = new ExecutionMethod();

  const formik = useFormik({
    initialValues: {
      title: "",
      status: "en curso",
      initial_date: new Date(),
      participants: [],
      problem_definition: "",
      hypotesis: "",
      description: "",
      vp: "",
      strategic_area: "",
      experiment_type: "",
      execution_methods: [],
      results: "",
      stakeholder: "",
      roi: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await experimentCtrl.createExperiment(values);

        console.log("response", response);
        console.log("values", values);
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const participants = await researcherCtrl.getAllParticipants();
        const vps = await vpCtrl.getAllVps();
        const projects = await projectCtrl.getProjects();
        const experimentTypes =
          await experimentTypeCtrl.getAllExperimentTypes();

        const executionMethods =
          await executionMethodCtrl.getAllExecutionMethods();

        setProjects(
          projects.data.map(
            (p: any): SelectOption => ({
              value: p?.id,
              label: p?.attributes?.name,
            })
          )
        );

        setParticipants(
          participants.data.map(
            (p: any): SelectOption => ({
              value: p?.id,
              label: p?.attributes?.name,
            })
          )
        );

        setVps(
          vps.data.map(
            (vp: any): SelectOption => ({
              value: vp?.id,
              label: vp?.attributes?.name,
            })
          )
        );

        setExperimentTypes(
          experimentTypes.data.map(
            (exp: any): SelectOption => ({
              value: exp?.id,
              label: exp?.attributes?.name,
            })
          )
        );

        setExecutionMethods(
          executionMethods.data.map(
            (method: any): SelectOption => ({
              value: method?.id,
              label: method?.attributes?.name,
            })
          )
        );

        console.log("executionMethods", executionMethods);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  const handleFileUpload = (e: any) => {
    formik.setFieldValue("experiment_reference", e.target.files[0]);

    setReference(event?.target?.files[0].name);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-6 px-6">
      <div className="flex-shrink-0 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Nuevo experimento</h3>
        <button
          type="submit"
          className="text-white flex items-center gap-1 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-smpx-5 py-2.5 text-center w-32 justify-center"
        >
          Guardar
        </button>
      </div>
      <li className="flex justify-end overflow-hidden">
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
            id="experiment_reference"
            className="absolute opacity-0"
            onChange={handleFileUpload}
          />
          <em className="not-italic">
            {reference ? `Referencia: ${reference}` : "Agregar Referencia"}
          </em>
        </span>
      </li>

      <li className="flex gap-4">
        <Label subtext="Máximo 70 caracteres" htmlFor="name">
          Título*
        </Label>

        <input
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          id="title"
          className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
          placeholder="Titulo del experimento"
          required
        />
      </li>

      <li className="flex items-center gap-4">
        <Label subtext="Estado del experimento" htmlFor="status">
          Estado*
        </Label>

        <div className="relative">
          <select
            value={formik.values.status}
            onChange={formik.handleChange}
            id="status"
            className="border appearance-none border-gray-300 text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500"
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
        <Label subtext="Elige una fecha de inicio" htmlFor="initial_date">
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
            ${formik.values.initial_date ? "opacity-100" : "opacity-90"}
          `}
          selected={formik.values.initial_date}
          onChange={(date: Date) => {
            console.log("date", date);
            formik.setFieldValue("initial_date", format(date, "yyyy-MM-dd"));
            console.log("initial date value", formik.values.initial_date);
          }}
        />
      </li>

      <li className="flex items-center gap-4">
        <Label subtext="Personas que participaron" htmlFor="participants">
          Participantes
        </Label>

        <MultiSelect
          className="w-64 text-sm border-gray-300"
          options={participants}
          // @ts-ignore
          value={formik.values.participants.map((id: string) =>
            participants.find((p: any) => p.value === id)
          )}
          onChange={(selectedItems: any[]) => {
            const ids = selectedItems.map((item) => item.value);
            formik.setFieldValue("participants", ids);
          }}
          labelledBy="Select"
          overrideStrings={{
            // @ts-ignore
            selectSomeItems: (
              <span
                className={
                  formik.values.participants.length
                    ? "opacity-100"
                    : "opacity-90"
                }
              >
                Seleccionar participantes
              </span>
            ),
            search: "Buscar Participantes",
            selectAll: "Todos Participaron",
            allItemsAreSelected: "Todos Participaron",
          }}
        />
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Planteamiento de la problematica
        </label>
        <ReactQuill
          theme="snow"
          value={formik.values.problem_definition}
          onChange={(content) => {
            formik.setFieldValue("problem_definition", content);
          }}
          className={`grow text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500`}
          placeholder="Describe la problematica"
        />
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Planteamiento de hipótesis
        </label>
        <ReactQuill
          theme="snow" // Usa el tema "snow"
          value={formik.values.hypotesis}
          onChange={(content) => {
            formik.setFieldValue("hypotesis", content);
          }}
          className={`grow text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500`}
          placeholder="Describe la hipotesis"
        />
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Descripción de la solución
        </label>
        <ReactQuill
          theme="snow" // Usa el tema "snow"
          value={formik.values.description}
          onChange={(content) => {
            formik.setFieldValue("description", content);
          }}
          className={`grow text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500`}
          placeholder="Describe la solución"
        />
      </li>

      <li className="flex items-center gap-4">
        <Label subtext="Selecciona a que VP pertenece" htmlFor="vp">
          VP
        </Label>

        <div className="relative">
          <select
            value={formik.values.vp}
            onChange={formik.handleChange}
            name="vp"
            id="vp"
            className="appearance-none text-sm rounded block w-64 p-2.5 border border-gray-300 outline-blue-500"
          >
            <option value="">Selecciona una VP</option>
            {vps.map((vp: SelectOption) => (
              <option key={vp?.value} value={vp?.value}>
                {vp?.label}
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

      <li className="flex items-center gap-4">
        <Label
          subtext="Selecciona a que area pertenece"
          htmlFor="strategic_area"
        >
          Area estrategica
        </Label>

        <input
          type="text"
          value={formik.values.strategic_area}
          onChange={formik.handleChange}
          id="strategic_area"
          className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
          placeholder="Escribe el área estrategica"
        />
      </li>

      <li className="flex items-center gap-4">
        <Label subtext="Nombre del stakeholder" htmlFor="stakeholder">
          Stakeholder
        </Label>

        <input
          type="text"
          value={formik.values.stakeholder}
          onChange={formik.handleChange}
          id="stakeholder"
          className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
          placeholder="Nombre del stakeholder"
        />
      </li>

      <li className="flex items-center gap-4">
        <Label
          subtext="Selecciona un tipo de experimento"
          htmlFor="experiment_type"
        >
          Tipo
        </Label>

        <div className="relative">
          <select
            value={formik.values.experiment_type}
            onChange={formik.handleChange}
            name="experiment_type"
            id="experiment_type"
            className="appearance-none text-sm rounded block w-64 p-2.5 border border-gray-300 outline-blue-500"
          >
            <option value="">Selecciona el Tipo</option>
            {experimentTypes.map((type: SelectOption) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
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

      <li className="flex items-center gap-4">
        <Label subtext="Selecciona el/los medios">Medio de ejecucion</Label>

        <MultiSelect
          className="w-64 text-sm border-gray-300"
          options={executionMethods}
          // @ts-ignore
          value={formik.values.execution_methods.map((id: string) =>
            executionMethods.find((p: any) => p.value === id)
          )}
          onChange={(selectedItems: any[]) => {
            const ids = selectedItems.map((item) => item.value);
            formik.setFieldValue("execution_methods", ids);
          }}
          labelledBy="Select"
          overrideStrings={{
            // @ts-ignore
            selectSomeItems: (
              <span
                className={
                  formik.values.execution_methods.length
                    ? "opacity-100"
                    : "opacity-90"
                }
              >
                Seleccionar medios
              </span>
            ),
            search: "Buscar Medios",
            selectAll: "Todos los medios",
            allItemsAreSelected: "Todos los medios",
          }}
        />
      </li>

      <li className="flex items-center gap-4">
        <Label subtext="Retorno de inversion" htmlFor="roi">
          ROI
        </Label>

        <input
          type="text"
          value={formik.values.roi}
          onChange={formik.handleChange}
          id="roi"
          className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
          placeholder="S/10.000"
        />
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Resultados
        </label>
        <ReactQuill
          theme="snow" // Usa el tema "snow"
          value={formik.values.results}
          onChange={(content) => {
            formik.setFieldValue("results", content);
          }}
          className={`grow text-sm text-gray-900 bg-white border border-gray-300 p-2.5 rounded outline-blue-500`}
          placeholder="Describe los resultados"
        />
      </li>
    </form>
  );
}
