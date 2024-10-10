"use client";
import { useEffect, useState, useRef } from "react";

import { MultiSelect } from "react-multi-select-component";
import Link from "next/link";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { validationSchema } from "./MaterialsForm.form";
import { Material, Public, Location, Investigation } from "@/api";
import { uploadToS3 } from "@/api";
import PulseLoader from "react-spinners/PulseLoader";
import { Label } from "@/components/Common";
import MarkdownEditor from "@/components/Common/MarkdownEditor";

export function MaterialsForm({ slug }) {
  const router = useRouter();

  const [publics, setPublics] = useState([]);
  const [locations, setLocations] = useState([]);
  const [investigation, setInvestigation] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const publicCtrl = new Public();
  const materialCtrl = new Material();
  const locationCtrl = new Location();
  const investigationCtrl = new Investigation();

  const formik = useFormik({
    initialValues: investigation.attributes?.materials?.data
      ? investigation.attributes.materials.data.reduce((acc, material) => {
          return {
            ...acc,
            [material.id]: {
              publics: material.attributes.publics.data.map((item) => ({
                value: item.id,
                label: item.attributes.name,
              })),
              sample: material.attributes.sample,
              locations: material.attributes.locations.data.map((location) => ({
                value: location.id,
                label: location.attributes.name,
              })),
              tool: material.attributes.tool,
              tool_media: material.attributes.tool_media,
            },
          };
        }, {})
      : {},
    validationSchema: validationSchema(),
    onSubmit: async (values) => {
      try {
        for (const material of investigation.attributes?.materials?.data) {
          let tool_media = values[material.id].tool_media;

          if (tool_media instanceof File) {
            tool_media = await uploadToS3(tool_media, setIsUploading);
          }

          const materialData = {
            publics: values[material.id].publics.map((item) => item.value),
            sample: values[material.id].sample,
            locations: values[material.id].locations.map(
              (location) => location.value
            ),
            tool: values[material.id].tool,
            tool_media: tool_media,
          };

          await materialCtrl.updateMaterial(material.id, materialData);

          router.push("/investigaciones", { scroll: false });
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const initialToolMediaRef = useRef({});

  useEffect(() => {
    (async () => {
      try {
        const responsePublics = await publicCtrl.getPublics();
        const responseLocations = await locationCtrl.getLocations();
        const response = await investigationCtrl.getInvestigation(slug);

        setInvestigation(response);

        setPublics(
          responsePublics.data.map((audience) => ({
            value: audience.id,
            label: audience.attributes.name,
          }))
        );

        setLocations(
          responseLocations.data.map((location) => ({
            value: location.id,
            label: location.attributes.name,
          }))
        );

        formik.setValues(
          response.attributes?.materials?.data
            ? response.attributes.materials.data.reduce((acc, material) => {
                initialToolMediaRef.current[material.id] =
                  material.attributes.tool_media;

                return {
                  ...acc,
                  [material.id]: {
                    publics: material.attributes.publics.data.map((item) => ({
                      value: item.id,
                      label: item.attributes.name,
                    })),
                    sample: material.attributes.sample,
                    locations: material.attributes.locations.data.map(
                      (location) => ({
                        value: location.id,
                        label: location.attributes.name,
                      })
                    ),
                    tool: material.attributes.tool,
                    tool_media: material.attributes.tool_media,
                  },
                };
              }, {})
            : {}
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {isUploading && (
        <div
          className="
            gap-4 font-semibold
            text-xl absolute top-0 right-0 bottom-0 
            left-0 w-full h-screen bg-black/50 z-50
            flex text-white flex-col justify-center
            items-center
          "
        >
          <PulseLoader color="#fff" />
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Link
            className="text-blue-700 hover:text-blue-800"
            href={`/investigaciones/${investigation?.attributes?.slug}`}
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
            Agregar Materiales
          </h4>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Guardar
        </button>
      </div>
      {investigation.attributes?.materials.data.length > 0 ? (
        investigation.attributes?.materials.data.map((material, index) => {
          const initialToolMedia = initialToolMediaRef.current[material.id];
          const cleanedSlug = material.attributes.slug
            .replace(/\d/g, "")
            .replace(/-/g, " ");

          return (
            <div key={index} className="border border-gray-200 rounded-xl p-6">
              <h4 className="font-semibold text-xl mb-4">
                Material de {cleanedSlug}
              </h4>
              <div className="divide-x divide-gray-200 grid grid-cols-2 gap-6">
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-4">
                    <Label
                      subtext="Hacía quienes va dirigido"
                      htmlFor="publics"
                    >
                      Público objetivo
                    </Label>

                    <MultiSelect
                      className="w-64 text-sm"
                      options={publics}
                      value={formik.values[material.id]?.publics || []}
                      onChange={(value) =>
                        formik.setFieldValue(`${material.id}.publics`, value)
                      }
                      error={formik.errors.publics}
                      overrideStrings={{
                        selectSomeItems: "Seleccionar Público",
                        allItemsAreSelected: "Todos seleccionados",
                        selectAll: "Seleccionar todos",
                        search: "Buscar Público",
                      }}
                    />
                  </li>

                  <MarkdownEditor
                    label="Muestra"
                    value={formik.values[material.id]?.sample || ""}
                    onChange={(value) =>
                      formik.setFieldValue(`${material.id}.sample`, value)
                    }
                    error={formik.errors[material.id]?.sample}
                    touched={formik.touched[material.id]?.sample}
                  />

                  <li className="flex gap-4">
                    <Label
                      subtext="Lugares de investigación"
                      htmlFor="investigation_types"
                    >
                      Ámbito geográfico
                    </Label>

                    <MultiSelect
                      className="w-64 text-sm"
                      options={locations}
                      value={formik.values[material.id]?.locations || []}
                      onChange={(value) =>
                        formik.setFieldValue(`${material.id}.locations`, value)
                      }
                      error={formik.errors[material.id]?.locations}
                      overrideStrings={{
                        selectSomeItems: "Seleccionar Locación",
                        allItemsAreSelected: "Todos seleccionados",
                        selectAll: "Seleccionar todos",
                        search: "Buscar Locación",
                      }}
                    />
                  </li>
                </ul>
                <ul className="flex flex-col gap-4 pl-6">
                  <li className="flex gap-4">
                    <Label subtext="Máximo 70 caracteres" htmlFor="tool">
                      Herramienta
                    </Label>

                    <input
                      type="text"
                      id="tool"
                      maxLength={70}
                      className="
                        self-start border border-gray-300 
                        text-gray-900 text-sm rounded
                        block w-64 p-2.5 outline-blue-500 h-10"
                      placeholder="Nombre de la herramienta"
                      value={formik.values[material.id]?.tool || ""}
                      onChange={(event) =>
                        formik.setFieldValue(
                          `${material.id}.tool`,
                          event.target.value
                        )
                      }
                      error={formik.errors[material.id]?.tool}
                    />
                  </li>
                  <li className="flex gap-4 justify-between">
                    <Label
                      subtext="(Jpg,Png,Pdf,Doc,Docx,Xlsx,Pptx)"
                      htmlFor="tool_media"
                    >
                      herramienta usada
                    </Label>

                    <div className="flex flex-col gap-2 w-64">
                      <input
                        type="file"
                        id="tool_media"
                        onChange={(event) => {
                          formik.setFieldValue(
                            `${material.id}.tool_media`,
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      {typeof initialToolMedia === "string" &&
                        initialToolMedia !== "" && (
                          <a
                            href={initialToolMedia}
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline text-xs font-regular flex justify-end"
                          >
                            Ver archivo actual
                          </a>
                        )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <ul className="flex flex-col gap-6">
          {[1, 2].map((index) => (
            <li key={index} className="border border-gray-200 rounded-xl p-6">
              <h4 className="h-7 bg-gray-200 animate-pulse w-80 rounded-lg mb-4"></h4>
              <div className="divide-x divide-gray-200 grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1 grow">
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                    </div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-64"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1 grow">
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                    </div>
                    <div
                      style={{ height: 122 }}
                      className="bg-gray-200 animate-pulse rounded-lg w-64"
                    ></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1 grow">
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                    </div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-64"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 pl-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1 grow">
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                    </div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-64"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1 grow">
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                      <p className="h-4 bg-gray-200 animate-pulse w-40 rounded-lg"></p>
                    </div>
                    <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-64"></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
