"use client";
import React from "react";
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
import Image from "next/image";
// @ts-ignore
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { MultiSelect } from "react-multi-select-component";
import "react-datepicker/dist/react-datepicker.css";
import { SelectOption } from "@/types";
import htmlToDraft from "html-to-draftjs";
import parse from "html-react-parser";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
  genKey as generateRandomKey,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ExperimentFormProps {
  readonly?: boolean;
  experiment?: any;
  onClose?: any;
}

export default function ExperimentForm({
  readonly = false,
  experiment,
  onClose,
}: ExperimentFormProps) {
  function convertSlateToDraft(slateNodes) {
    if (!slateNodes) {
      return { blocks: [], entityMap: {} };
    }

    const blocks = slateNodes.map((node) => ({
      key: generateRandomKey(),
      text: node.children[0].text,
      type: node.type,
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    }));

    return { blocks, entityMap: {} };
  }

  function convertStrapiRichTextToEditorState(strapiRichText) {
    const rawContent = convertSlateToDraft(strapiRichText);
    const contentState = convertFromRaw(rawContent);
    return EditorState.createWithContent(contentState);
  }
  const [title, setTitle] = useState("Nuevo Experimento");
  const [participants, setParticipants] = useState([]);
  const [vps, setVps] = useState<SelectOption[]>([]);
  const [projects, setProjects] = useState<SelectOption[]>([]);
  const [experimentTypes, setExperimentTypes] = useState<SelectOption[]>([]);
  const [executionMethods, setExecutionMethods] = useState([]);
  const [reference, setReference] = useState("");
  const [editorState, setEditorState] = useState(
    experiment
      ? convertStrapiRichTextToEditorState(experiment.problem_definition)
      : EditorState.createEmpty()
  );
  const [localReadonly, setLocalReadonly] = useState(readonly);
  const [editorStateHypothesis, setEditorStateHypothesis] = useState(
    experiment
      ? convertStrapiRichTextToEditorState(experiment.hypotesis)
      : EditorState.createEmpty()
  );
  const [editorStateDescription, setEditorStateDescription] = useState(
    experiment
      ? convertStrapiRichTextToEditorState(experiment.description)
      : EditorState.createEmpty()
  );
  const [editorStateResults, setEditorStateResults] = useState(
    experiment
      ? convertStrapiRichTextToEditorState(experiment.results)
      : EditorState.createEmpty()
  );

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

  function convertEditorStateToBlocks(editorState: EditorState) {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    let listItems = [];
    let blocks = [];

    rawContentState.blocks.forEach((block) => {
      let children = [];
      let start = 0;
      block.inlineStyleRanges.forEach((range) => {
        if (range.offset > start) {
          children.push({
            type: "text",
            text: block.text.slice(start, range.offset),
          });
        }

        let styledText = {
          type: "text",
          text: block.text.slice(range.offset, range.offset + range.length),
          formats: {}, // Añade esta línea
        };

        if (range.style === "BOLD") {
          styledText.formats.bold = true; // Cambia esta línea
        } else if (range.style === "ITALIC") {
          styledText.formats.italic = true; // Añade esta línea para el estilo cursiva
        } else if (range.style === "UNDERLINE") {
          styledText.formats.underline = true; // Cambia esta línea
        } else if (range.style === "STRIKETHROUGH") {
          styledText.formats.strikethrough = true; // Cambia esta línea
        }

        children.push(styledText);
        start = range.offset + range.length;
      });

      if (start < block.text.length) {
        children.push({ type: "text", text: block.text.slice(start) });
      }

      if (
        block.type === "unordered-list-item" ||
        block.type === "ordered-list-item"
      ) {
        listItems.push({
          type: "list-item",
          children: [{ text: block.text, type: "text" }],
        });
      } else {
        if (listItems.length > 0) {
          blocks.push({
            type: "list",
            format:
              listItems[0].type === "unordered-list-item"
                ? "unordered"
                : "ordered",
            children: listItems,
          });
          listItems = [];
        }

        if (block.type === "unstyled") {
          blocks.push({
            type: "paragraph",
            children: [{ type: "text", text: block.text }],
          });
        } else if (block.type === "header-one") {
          blocks.push({
            type: "heading",
            level: 1,
            children: [{ text: block.text, type: "text" }],
          });
        } else if (block.type === "header-two") {
          blocks.push({
            type: "heading",
            level: 2,
            children: [{ text: block.text, type: "text" }],
          });
        } else if (block.type === "header-three") {
          blocks.push({
            type: "heading",
            level: 3,
            children: [{ text: block.text, type: "text" }],
          });
        }
      }
    });

    if (listItems.length > 0) {
      blocks.push({
        type: "list",
        format:
          listItems[0].type === "unordered-list-item" ? "unordered" : "ordered",
        children: listItems,
      });
    }

    return blocks;
  }

  function convertStrapiRichTextToPlainText(strapiRichText) {
    let plainText = "";

    strapiRichText.forEach((block, index) => {
      if (block.type === "list-item") {
        // Añade un número de lista antes del texto
        plainText += `${index + 1}. `;
      }

      block.children.forEach((child) => {
        plainText += child.text;
      });

      plainText += "\n"; // Añade un salto de línea después de cada bloque
    });

    return plainText;
  }

  let plainTextProblem = "";
  let plainTextHypothesis = "";
  let plainTextDescription = "";
  let plainTextResults = "";

  if (experiment) {
    if (experiment.problem_definition) {
      plainTextProblem = convertStrapiRichTextToPlainText(
        experiment.problem_definition
      );
    }

    if (experiment.hypotesis) {
      plainTextHypothesis = convertStrapiRichTextToPlainText(
        experiment.hypotesis
      );
    }

    if (experiment.description) {
      plainTextDescription = convertStrapiRichTextToPlainText(
        experiment.description
      );
    }
    if (experiment.results) {
      plainTextResults = convertStrapiRichTextToPlainText(experiment.results);
    }
  }

  const formik = useFormik({
    initialValues: {
      title: experiment ? experiment.title : "",
      status: experiment ? experiment.status : "en curso",
      initial_date: experiment ? parseISO(experiment.initial_date) : new Date(),
      participants: experiment
        ? experiment.participants.data.map((participant: any) => participant.id)
        : [],
      problem_definition: "",
      hypotesis: "",
      description: "",
      vp: experiment ? experiment.vp.data.id : "",
      strategic_area: experiment ? experiment.strategic_area : "",
      stakeholder: experiment ? experiment.stakeholder : "",
      experiment_type: experiment ? experiment.experiment_type.data.id : "",
      execution_methods: experiment
        ? experiment.execution_methods.data.map((method: any) => method.id)
        : [],
      results: "",
      roi: experiment ? experiment.roi : "",
    },
    onSubmit: async (values) => {
      try {
        const response = await experimentCtrl.createExperiment({
          ...values,
        });

        console.log("response", response);

        onClose();
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

  useEffect(() => {
    setLocalReadonly(readonly);
    if (readonly) {
      setTitle("Detalle del Experimento");
    }
  }, [readonly]);

  useEffect(() => {
    console.log("experiment desde el formulario", experiment);
    console.log("lectura?", readonly);
  }, [experiment]);

  const handleFileUpload = (e: any) => {
    formik.setFieldValue("experiment_reference", e.target.files[0]);

    setReference(event?.target?.files[0].name);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-6 px-6">
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
            className="text-white flex items-center gap-1 bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-smpx-5 py-2.5 text-center w-32 justify-center"
          >
            Guardar
          </button>
        )}
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
          className={`self-start h-10 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5 ${
            localReadonly
              ? "border-none pointer-events-none"
              : "border border-gray-300"
          }`}
          placeholder="Titulo del experimento"
          required
          readOnly={localReadonly}
        />
      </li>

      <li className="flex items-center gap-4">
        <Label subtext="Estado del experimento" htmlFor="status">
          Estado*
        </Label>

        <div className="relative">
          <select
            disabled={localReadonly}
            value={formik.values.status}
            onChange={formik.handleChange}
            id="status"
            className={`appearance-none text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500 ${
              localReadonly ? "" : "border border-gray-300"
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
            text-sm block p-2 w-64 
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

      <li
        className={`gap-4 ${
          localReadonly ? "items-start" : "items-center"
        } flex`}
      >
        <Label subtext="Personas que participaron" htmlFor="participants">
          Participantes
        </Label>

        {localReadonly ? (
          <ul className="w-1/2 flex gap-4 flex-col">
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
        )}
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Planteamiento de la problematica
        </label>

        {localReadonly ? (
          <div
            className="text-sm text-gray-900"
            dangerouslySetInnerHTML={{
              __html: plainTextProblem.replace(/\n/g, "<br/>"),
            }}
          ></div>
        ) : (
          <Editor
            toolbarHidden
            editorState={editorState}
            onEditorStateChange={(newState: any) => {
              setEditorState(newState);
              const blocks = convertEditorStateToBlocks(newState);
              formik.setFieldValue("problem_definition", blocks);
            }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={{
              "border border-gray-300 p-2.5 rounded outline-blue-500": true,
            }}
          />
        )}
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Planteamiento de hipótesis
        </label>

        {localReadonly ? (
          <div
            className="text-sm text-gray-900"
            dangerouslySetInnerHTML={{
              __html: plainTextHypothesis.replace(/\n/g, "<br/>"),
            }}
          ></div>
        ) : (
          <Editor
            toolbarHidden
            editorState={editorStateHypothesis}
            onEditorStateChange={(newState: any) => {
              setEditorStateHypothesis(newState);
              const blocks = convertEditorStateToBlocks(newState);
              formik.setFieldValue("hypotesis", blocks);
            }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={{
              "border border-gray-300 p-2.5 rounded outline-blue-500": true,
            }}
          />
        )}
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Descripción de la solución
        </label>

        {localReadonly ? (
          <div
            className="text-sm text-gray-900"
            dangerouslySetInnerHTML={{
              __html: plainTextDescription.replace(/\n/g, "<br/>"),
            }}
          ></div>
        ) : (
          <Editor
            toolbarHidden
            editorState={editorStateDescription}
            onEditorStateChange={(newState: any) => {
              setEditorStateDescription(newState);
              const blocks = convertEditorStateToBlocks(newState);
              formik.setFieldValue("description", blocks);
            }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={{
              "border border-gray-300 p-2.5 rounded outline-blue-500 text-sm":
                true,
            }}
          />
        )}
      </li>

      <li className="flex items-center gap-4">
        <Label subtext="Selecciona a que VP pertenece" htmlFor="vp">
          VP
        </Label>

        <div className="relative">
          <select
            value={formik.values.vp}
            onChange={formik.handleChange}
            disabled={localReadonly}
            name="vp"
            id="vp"
            className={`appearance-none text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500 ${
              localReadonly ? "" : "border border-gray-300"
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
          className={`self-start h-10 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5 ${
            localReadonly
              ? "border-none pointer-events-none"
              : "border border-gray-300"
          }`}
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
          className={`self-start h-10 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5 ${
            localReadonly
              ? "border-none pointer-events-none"
              : "border border-gray-300"
          }`}
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
            disabled={localReadonly}
            id="experiment_type"
            className={`appearance-none text-gray-900 text-sm rounded block w-64 p-2.5 h-10 outline-blue-500 ${
              localReadonly ? "" : "border border-gray-300"
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
      </li>

      <li
        className={`gap-2 ${
          localReadonly ? "items-start" : "items-center"
        } flex`}
      >
        <Label subtext="Selecciona el/los medios">Medio de ejecucion</Label>

        {localReadonly ? (
          <ul className="w-1/2 flex gap-2 justify-between flex-wrap">
            {experiment?.execution_methods?.data.map((methods: any) => (
              <li className="flex gap-2 items-center" key={methods.id}>
                <span className="text-sm">{methods.attributes.name}</span>
              </li>
            ))}
          </ul>
        ) : (
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
        )}
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
          className={`self-start h-10 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5 ${
            localReadonly
              ? "border-none pointer-events-none"
              : "border border-gray-300"
          }`}
          placeholder="S/10.000"
        />
      </li>

      <li className="flex flex-col gap-2">
        <label className="font-medium uppercase text-sm text-gray-900">
          Resultados
        </label>

        {localReadonly ? (
          <div
            className="text-sm text-gray-900"
            dangerouslySetInnerHTML={{
              __html: plainTextResults.replace(/\n/g, "<br/>"),
            }}
          ></div>
        ) : (
          <Editor
            toolbarHidden
            editorState={editorStateResults}
            onEditorStateChange={(newState: any) => {
              setEditorStateResults(newState);
              const blocks = convertEditorStateToBlocks(newState);
              formik.setFieldValue("results", blocks);
            }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={{
              "border border-gray-300 p-2.5 rounded outline-blue-500": true,
            }}
          />
        )}
      </li>
    </form>
  );
}
