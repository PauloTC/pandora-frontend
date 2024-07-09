"use client";

import { libre_franklin700, libre_franklin600 } from "@/app/fonts";
import { useEffect, useState, useRef } from "react";

import { MultiSelect } from "react-multi-select-component";
import Link from "next/link";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { validationSchema } from "./MaterialsForm.form";
import { Material, Public, Location, Investigation } from "@/api";
import { uploadToS3 } from "@/api";
import PulseLoader from "react-spinners/PulseLoader";

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
      <div className="flex justify-between items-center mb-2">
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
          <h4
            className={`${libre_franklin700.className} flex flex-col ml-3 text-slate-700 capitalize text-xl`}
          >
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
              <h4
                className={`${libre_franklin700.className} capitalize text-xl mb-4`}
              >
                Material de {cleanedSlug}
              </h4>
              <div className="divide-x divide-gray-200 grid grid-cols-2 gap-6">
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-4">
                    <label htmlFor="publics" className="flex flex-col grow">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Público objetivo:
                      </span>
                      <span className="text-xs font-regular">
                        Hacía quienes va dirigido
                      </span>
                    </label>
                    <MultiSelect
                      className="w-64 text-sm"
                      options={publics}
                      value={formik.values[material.id]?.publics || []}
                      onChange={(value) =>
                        formik.setFieldValue(`${material.id}.publics`, value)
                      }
                      error={formik.errors.publics}
                    />
                  </li>

                  <li className="flex gap-4">
                    <label className="flex flex-col grow" htmlFor="sample">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Muestra
                      </span>
                      <span className="text-xs font-regular">
                        Escribe la muestra
                      </span>
                    </label>
                    <textarea
                      id="sample"
                      rows="5"
                      className="w-64 text-sm text-gray-900 bg-white border border-gray-200 p-2.5 rounded outline-blue-500"
                      placeholder="Escribir la muestra..."
                      value={formik.values[material.id]?.sample || ""}
                      onChange={(event) =>
                        formik.setFieldValue(
                          `${material.id}.sample`,
                          event.target.value
                        )
                      }
                      error={formik.errors[material.id]?.sample}
                    ></textarea>
                  </li>

                  <li className="flex gap-4">
                    <label
                      htmlFor="investigation_types"
                      className="flex flex-col grow"
                    >
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Ámbito geográfico
                      </span>
                      <span className="text-xs font-regular">
                        Lugares de investigacion
                      </span>
                    </label>
                    <MultiSelect
                      className="w-64 text-sm"
                      options={locations}
                      value={formik.values[material.id]?.locations || []}
                      onChange={(value) =>
                        formik.setFieldValue(`${material.id}.locations`, value)
                      }
                      error={formik.errors[material.id]?.locations}
                    />
                  </li>
                </ul>
                <ul className="flex flex-col gap-4 pl-6">
                  <li className="flex gap-4">
                    <label className="flex flex-col grow" htmlFor="tool">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Herramienta
                      </span>
                      <span className="text-xs font-regular">
                        Máximo 10 caracteres
                      </span>
                    </label>
                    <input
                      type="text"
                      id="tool"
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
                  <li className="flex gap-4">
                    <label className="flex flex-col w-80" htmlFor="tool_media">
                      <span
                        className={`${libre_franklin600.className} font-bold text-sm text-gray-900`}
                      >
                        Adjuntar herramienta
                      </span>
                      <span className="text-xs font-regular">
                        (Jpg,Png, Pdf, Docx, Xlsx, Pptx)
                      </span>
                    </label>
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
                            target="_blank"
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
        <div className={`${libre_franklin600.className}`}>
          No hay materiales disponibles.
        </div>
      )}
    </form>
  );
}
