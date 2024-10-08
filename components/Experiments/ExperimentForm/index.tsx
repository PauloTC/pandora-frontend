"use client";
import React from "react";
import { Label } from "@/components/Common";
import { useFormik } from "formik";
import { Experiment, uploadToS3 } from "@/api";
import Image from "next/image";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactMarkdown from "react-markdown";
import { SendComment } from "@/components/Common/Comment";
import MDEditor from "@uiw/react-md-editor";
// @ts-ignore
import DatePicker from "react-datepicker";
import { useEffect, useState, useContext } from "react";
import { format, parseISO } from "date-fns";
import { MultiSelect } from "react-multi-select-component";
import { SelectOption } from "@/types";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  genKey as generateRandomKey,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Swal from "sweetalert2";
import PulseLoader from "react-spinners/PulseLoader";
import { ExperimentsContext } from "@/contexts";
import * as Yup from "yup";
import ErrorFormMessage from "@/components/Common/ErrorFormMessage";
import { Comment } from "@/api";
import MarkdownEditor from "@/components/Common/MarkdownEditor";

interface ExperimentFormProps {
  readonly?: boolean;
  experiment?: any;
  onClose?: any;
  id?: string;
}

export default function ExperimentForm({
  readonly = false,
  experiment,
  onClose,
  id,
}: ExperimentFormProps) {
  const {
    getExperiments,
    teams,
    vps,
    participants,
    experimentTypes,
    executionMethods,
    fetchFormData,
  } = useContext(ExperimentsContext);

  const commentCtrl = new Comment();

  const [title, setTitle] = useState("Nuevo Experimento");
  const [reference, setReference] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [comments, setComments] = useState([]);
  const [localReadonly, setLocalReadonly] = useState(readonly);
  const [loading, setLoading] = useState(false);

  const status = [
    { value: "en curso", label: "En curso" },
    { value: "finalizado", label: "Finalizado" },
    { value: "en pausa", label: "En pausa" },
    { value: "cancelado", label: "Cancelado" },
  ];

  const experimentCtrl = new Experiment();

  const uploadFile = async (file: any) => {
    if (file instanceof File) {
      try {
        const result = await uploadToS3(
          file,
          setIsUploading,
          (errorMessage: any) => {
            throw new Error(errorMessage);
          }
        );
        return result;
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al subir el archivo: " + error?.message,
        });
        throw error; // Si hay un error, lanzar la excepción
      }
    }
    return file;
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es requerido"),
    participants: Yup.array().min(1, "Al menos un participante es requerido"),
    second_problem_definition: Yup.string().required(
      "La definición del problema es requerido"
    ),
    second_hypotesis: Yup.string().required("La hipótesis es requerida"),
    second_description: Yup.string().required("La descripción es requerida"),
    vp: Yup.string().required("La VP es requerida"),
    strategic_area: Yup.string().required("El área estratégica es requerida"),
    stakeholder: Yup.string().required(
      "El nombre del stakeholder es requerido"
    ),
    experiment_type: Yup.string().required(
      "El tipo de experimento es requerido"
    ),
    execution_methods: Yup.array().min(
      1,
      "Un método de ejecución es requerido"
    ),
    second_results: Yup.string().required("Los resultados son requeridos"),
  });

  const formik = useFormik({
    initialValues: {
      title: experiment ? experiment.title : "",
      status: experiment ? experiment.status : "en curso",
      initial_date: experiment ? parseISO(experiment.initial_date) : new Date(),
      end_date: experiment?.end_date ? parseISO(experiment.end_date) : null,
      participants: experiment
        ? experiment.participants.data.map((participant: any) => participant.id)
        : [],
      second_problem_definition: experiment
        ? experiment.second_problem_definition
        : "",
      second_hypotesis: experiment ? experiment.second_hypotesis : "",
      second_description: experiment ? experiment.second_description : "",
      vp: experiment ? experiment.vp.data.id : "",
      strategic_area: experiment ? experiment.strategic_area : "",
      stakeholder: experiment ? experiment.stakeholder : "",
      experiment_type: experiment ? experiment.experiment_type.data.id : "",
      execution_methods: experiment
        ? experiment.execution_methods.data.map((method: any) => method.id)
        : [],
      second_results: experiment ? experiment.second_results : "",
      roi: experiment ? experiment.roi : "",
      reference: experiment ? experiment.reference : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        let media_reference = await uploadFile(values.reference);

        if (id) {
          const response = await experimentCtrl.updateExperiment(id, {
            ...values,
            reference: media_reference,
          });
        } else {
          const response = await experimentCtrl.createExperiment({
            ...values,
            reference: media_reference,
          });
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
        getExperiments();
        onClose();
      }
    },
  });

  const handleUpdateComments = async ({ id }: any) => {
    setLoading(true);
    try {
      const response = await commentCtrl.getCommentsByExperiment(id);
      setComments(response.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
    if (experiment?.comments) {
      setComments(experiment?.comments.data);
    }
  }, []);

  useEffect(() => {
    setLocalReadonly(readonly);
    if (readonly) {
      setTitle("Detalle del Experimento");
    }
  }, [readonly]);

  const handleFileUpload = (event: any) => {
    formik.setFieldValue("reference", event.target.files[0]);

    setReference(event?.target?.files[0].name);
  };

  return (
    <>
      {loading && (
        <div>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col items-center gap-4">
                <span className="text-lg font-medium">Cargando...</span>
                <PulseLoader color={"rgba(29, 78, 216, 1)"} />
              </div>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-y-6 px-6"
      >
        <div className="flex-shrink-0 flex justify-between items-center">
          <h3 className="text-2xl font-semibold">{title}</h3>
          {localReadonly ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setTitle("Editar Experimento");
                if (localReadonly) {
                  setLocalReadonly(false);
                }
              }}
              type="button"
              className="text-white flex items-center gap-1 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-smpx-5 py-2.5 text-center w-32 justify-center"
            >
              Editar
            </button>
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              className="text-white flex items-center gap-1 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-smpx-5 py-2.5 text-center w-32 justify-center"
            >
              Guardar
            </button>
          )}
        </div>
        <li className="flex justify-end overflow-hidden gap-2">
          {!localReadonly && (
            <div className="cursor-pointer text-xs font-medium gap-1 flex items-center relative text-blue-800">
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
                id="reference"
                className="absolute opacity-0 pointer-events-none"
                onChange={handleFileUpload}
              />

              <label htmlFor="reference" className="not-italic cursor-pointer">
                {reference
                  ? `Referencia: ${reference}`
                  : !localReadonly && experiment?.reference
                  ? "Modificar Referencia"
                  : "Agregar Referencia"}
              </label>
            </div>
          )}

          {!experiment?.reference && localReadonly && (
            <p className="text-xs font-medium gap-1 flex items-center relative">
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
              Sin Referencia
            </p>
          )}

          {experiment && experiment.reference && (
            <a
              href={experiment.reference}
              target="_blank"
              className="cursor-pointer text-xs font-medium gap-1 flex items-center relative text-blue-800"
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
              Ver Referencia
            </a>
          )}
        </li>

        <li className="flex gap-4">
          <Label subtext="Máximo 70 caracteres" htmlFor="name">
            Título*
          </Label>

          <div>
            {localReadonly ? (
              <p className="text-gray-900 text-sm font-medium w-64">
                {formik.values.title}
              </p>
            ) : (
              <input
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                id="title"
                className={`self-start h-10 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5 ${
                  localReadonly
                    ? "border-none pointer-events-none"
                    : "border border-gray-300"
                }`}
                placeholder="Titulo del experimento"
                required
                readOnly={localReadonly}
              />
            )}

            {formik.touched.title && formik.errors.title ? (
              <ErrorFormMessage
                message={
                  typeof formik.errors.title === "string"
                    ? formik.errors.title
                    : JSON.stringify(formik.errors.title)
                }
              />
            ) : null}
          </div>
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
              className={`appearance-none text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500 ${
                localReadonly ? "pointer-events-none" : "border border-gray-300"
              }`}
            >
              {status.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
            {!localReadonly && (
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
            )}
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
              text-sm block p-2.5 w-64 
              rounded h-10 outline-blue-500
              ${formik.values.initial_date ? "opacity-100" : "opacity-90"}
              ${localReadonly ? "bg-transparent" : "border border-gray-300"}
            `}
            selected={formik.values.initial_date}
            onChange={(date: Date) => {
              formik.setFieldValue(
                "initial_date",
                parseISO(format(date, "yyyy-MM-dd"))
              );
            }}
            disabled={localReadonly}
          />
        </li>

        {formik.values.status !== "en curso" && (
          <li className="flex items-center">
            <Label subtext="Elige una fecha de cierre" htmlFor="end_date">
              Fecha de cierre*
            </Label>

            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha de cierre"
              className={`
                  placeholder-gray-150
                  text-sm block p-2 w-64 
                  rounded h-10 outline-blue-500
                  ${formik.values.end_date ? "opacity-100" : "opacity-90"}
                  ${localReadonly ? "bg-transparent" : "border border-gray-300"}
                `}
              selected={formik.values.end_date}
              onChange={(date: Date) => {
                formik.setFieldValue(
                  "end_date",
                  parseISO(format(date, "yyyy-MM-dd"))
                );
              }}
              disabled={localReadonly}
            />
          </li>
        )}

        <li
          className={`gap-4 ${
            localReadonly ? "items-start" : "items-center"
          } flex`}
        >
          <Label subtext="Personas que participaron" htmlFor="participants">
            Participantes*
          </Label>

          {localReadonly ? (
            <ul className="w-64 px-2.5 flex gap-4 flex-col">
              {experiment?.participants?.data.map((participant: any) => (
                <li className="flex gap-2 items-center" key={participant.id}>
                  <Image
                    className="rounded-full"
                    alt={
                      participant.attributes.photo.data.attributes.formats
                        .thumbnail.name
                    }
                    src={participant.attributes.photo.data.attributes.url}
                    width={30}
                    height={30}
                  />
                  <span className="text-sm">{participant.attributes.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col">
              <MultiSelect
                className="w-64 text-sm border-gray-300 z-10"
                options={participants}
                // @ts-ignore
                value={formik.values.participants.map((id: string) => {
                  const participant = participants.find(
                    (p: any) => p.value === id
                  );
                  return participant ? participant : null;
                })}
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
              {formik.touched.participants && formik.errors.participants ? (
                <ErrorFormMessage
                  message={
                    typeof formik.errors.participants === "string"
                      ? formik.errors.participants
                      : JSON.stringify(formik.errors.participants)
                  }
                />
              ) : null}
            </div>
          )}
        </li>

        <MarkdownEditor
          label="Planteamiento de la problemática*"
          value={formik.values.second_problem_definition}
          onChange={(value) =>
            formik.setFieldValue("second_problem_definition", value)
          }
          error={formik.errors.second_problem_definition}
          touched={formik.touched.second_problem_definition}
          readonly={localReadonly}
        />

        <MarkdownEditor
          label="Planteamiento de hipótesis*"
          value={formik.values.second_hypotesis}
          onChange={(value) => formik.setFieldValue("second_hypotesis", value)}
          error={formik.errors.second_hypotesis}
          touched={formik.touched.second_hypotesis}
          readonly={localReadonly}
        />

        <MarkdownEditor
          label="Descripción de la solución*"
          value={formik.values.second_description}
          onChange={(value) =>
            formik.setFieldValue("second_description", value)
          }
          error={formik.errors.second_description}
          touched={formik.touched.second_description}
          readonly={localReadonly}
        />

        <li className="flex items-center gap-4">
          <Label subtext="Selecciona a que VP pertenece" htmlFor="vp">
            VP*
          </Label>
          <div className="flex flex-col">
            <div className="relative">
              <select
                value={formik.values.vp}
                onChange={formik.handleChange}
                name="vp"
                id="vp"
                className={`appearance-none text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500 ${
                  localReadonly
                    ? "pointer-events-none"
                    : "border border-gray-300"
                }`}
              >
                <option value="">Selecciona una VP</option>
                {vps.map((vp: SelectOption) => (
                  <option key={vp?.value} value={vp?.value}>
                    {vp?.label}
                  </option>
                ))}
              </select>

              {!localReadonly && (
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
              )}
            </div>
            {formik.touched.vp && formik.errors.vp ? (
              <ErrorFormMessage
                message={
                  typeof formik.errors.vp === "string"
                    ? formik.errors.vp
                    : JSON.stringify(formik.errors.vp)
                }
              />
            ) : null}
          </div>
        </li>

        <li className="flex items-center gap-4">
          <Label
            subtext="Selecciona a qué área pertenece"
            htmlFor="strategic_area"
          >
            Área estratégica*
          </Label>

          <div className="flex flex-col">
            <div className="relative">
              <select
                value={formik.values.strategic_area}
                onChange={formik.handleChange}
                name="strategic_area"
                id="strategic_area"
                className={`appearance-none text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500 ${
                  localReadonly
                    ? "pointer-events-none"
                    : "border border-gray-300"
                }`}
              >
                <option value="">Selecciona un área</option>
                {teams.map((team: SelectOption) => (
                  <option key={team.value} value={team.label}>
                    {team.label}
                  </option>
                ))}
              </select>
              {!localReadonly && (
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
              )}
            </div>
            {formik.touched.strategic_area && formik.errors.strategic_area ? (
              <ErrorFormMessage
                message={
                  typeof formik.errors.strategic_area === "string"
                    ? formik.errors.strategic_area
                    : JSON.stringify(formik.errors.strategic_area)
                }
              />
            ) : null}
          </div>
        </li>

        <li className="flex items-center gap-4">
          <Label subtext="Nombre del stakeholder" htmlFor="stakeholder">
            Stakeholder*
          </Label>

          <div className="flex flex-col">
            <input
              type="text"
              value={formik.values.stakeholder}
              onChange={formik.handleChange}
              id="stakeholder"
              className={`self-start h-10 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5 ${
                localReadonly
                  ? "border-none pointer-events-none"
                  : "border border-gray-300"
              }`}
              placeholder="Nombre del stakeholder"
            />
            {formik.touched.stakeholder && formik.errors.stakeholder ? (
              <ErrorFormMessage
                message={
                  typeof formik.errors.stakeholder === "string"
                    ? formik.errors.stakeholder
                    : JSON.stringify(formik.errors.stakeholder)
                }
              />
            ) : null}
          </div>
        </li>

        <li className="flex items-center gap-4">
          <Label
            subtext="Selecciona un tipo de experimento"
            htmlFor="experiment_type"
          >
            Tipo*
          </Label>

          <div className="flex flex-col">
            <div className="relative">
              <select
                value={formik.values.experiment_type}
                onChange={formik.handleChange}
                name="experiment_type"
                id="experiment_type"
                className={`appearance-none text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500 ${
                  localReadonly
                    ? "pointer-events-none"
                    : "border border-gray-300"
                }`}
              >
                <option value="">Selecciona el Tipo</option>
                {experimentTypes.map((type: SelectOption) => (
                  <option key={type?.value} value={type?.value}>
                    {type?.label}
                  </option>
                ))}
              </select>

              {!localReadonly && (
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
              )}
            </div>
            {formik.touched.experiment_type && formik.errors.experiment_type ? (
              <ErrorFormMessage
                message={
                  typeof formik.errors.experiment_type === "string"
                    ? formik.errors.experiment_type
                    : JSON.stringify(formik.errors.experiment_type)
                }
              />
            ) : null}
          </div>
        </li>

        <li
          className={`gap-2 ${
            localReadonly ? "items-start" : "items-center"
          } flex`}
        >
          <Label subtext="Selecciona el/los medios">Medio de ejecución*</Label>

          {localReadonly ? (
            <ul className="w-64 flex gap-2 justify-between flex-wrap p-2.5">
              {experiment?.execution_methods?.data.map((methods: any) => (
                <li className="flex gap-2 items-center" key={methods.id}>
                  <span className="text-sm">{methods.attributes.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col">
              <MultiSelect
                className="w-64 text-sm border-gray-300 z-10"
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
              {formik.touched.execution_methods &&
              formik.errors.execution_methods ? (
                <ErrorFormMessage
                  message={
                    typeof formik.errors.execution_methods === "string"
                      ? formik.errors.execution_methods
                      : JSON.stringify(formik.errors.execution_methods)
                  }
                />
              ) : null}
            </div>
          )}
        </li>

        <li className="flex items-center gap-4">
          <Label subtext="Retorno de inversión" htmlFor="roi">
            ROI
          </Label>

          <input
            type="text"
            value={formik.values.roi}
            onChange={formik.handleChange}
            id="roi"
            className={`self-start h-10 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5 ${
              localReadonly
                ? "border-none pointer-events-none"
                : "border border-gray-300"
            }`}
            placeholder={!localReadonly ? "S/10.000" : ""}
          />
        </li>

        <MarkdownEditor
          label="Resultados*"
          value={formik.values.second_results}
          onChange={(value) => formik.setFieldValue("second_results", value)}
          error={formik.errors.second_results}
          touched={formik.touched.second_results}
          readonly={localReadonly}
        />
      </form>

      {localReadonly && (
        <div className="px-6 mt-6">
          {comments.length !== 0 && (
            <>
              <p className="font-medium uppercase text-sm text-gray-900 mb-2">
                Comentarios
              </p>
              <ul className="flex flex-col gap-4">
                {comments.map((comment: any, index: number) => (
                  <li
                    className="border border-neutral-medium rounded-lg p-4 overflow-hidden"
                    key={index}
                  >
                    <span className="text-sm flex w-full justify-end">
                      Enviado el:{" "}
                      {format(comment.attributes.updatedAt, "dd/MM/yyyy HH:mm")}
                    </span>
                    <div className="divide-solid divide-y">
                      <div className="flex">
                        <div className="flex gap-2 mb-2">
                          <Image
                            src={
                              comment.attributes.user.data.attributes.photo.data
                                .attributes.url
                            }
                            alt="profile"
                            width={25}
                            height={25}
                            className="rounded-full"
                          />
                          <p className="font-medium text-md text-gray-900 italic">
                            {comment.attributes.user.data.attributes.firstname}{" "}
                            {comment.attributes.user.data.attributes.lastname}{" "}
                            comentó:
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 text-sm">
                        <ReactMarkdown className="markdown">
                          {comment.attributes.description}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          <SendComment onEvent={handleUpdateComments} id={id} />
        </div>
      )}
    </>
  );
}
