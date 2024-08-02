"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Costumer } from "@/api";
import * as XLSX from "xlsx";

import { libre_franklin600 } from "@/app/fonts";

export default function Subscribers() {
  const [costumers, setCostumers] = useState([] as any[]);
  const [openEditClient, setOpenEditClient] = useState(false);
  const [clientData, setClientData] = useState({} as any);

  const costumerCtrl = new Costumer();

  const formik = useFormik({
    initialValues: {
      business_type: clientData.data?.attributes.business_type,
      business_subtype: "",
      business_document: "",
      business_name: "",
      business_owner: "",
      business_district: "",
      owner_cellphone: "",
      owner_document_number: "",
    },
    onSubmit: async (values) => {
      // console.log("values", values);
      // try {
      //   const response = await costumerCtrl.createCostumer(values);
      //   console.log("response", response);
      // } catch (error) {
      //   console.log("error", error);
      // }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await costumerCtrl.getAllCostumers();
        const transformedData = response.data.map((costumer: any) => ({
          id: costumer.id,
          negocio: costumer.attributes.type,
          giro: costumer.attributes.subtype,
          ruc: costumer.attributes.ruc,
          nombre_negocio: costumer.attributes.name,
          razon_social: costumer.attributes.social_reason,
          departamento: costumer.attributes.department,
          provincia: costumer.attributes.province,
          distrito: costumer.attributes.district,
          direccion: costumer.attributes.address,
          celular: costumer.attributes.cellphone,
        }));

        setCostumers(transformedData);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(costumers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Costumers");
    XLSX.writeFile(wb, "base_clientes.xlsx");
  };

  const openEditModal = async (costumer: any) => {
    const clientData = await costumerCtrl.getCostumerById(costumer.id);

    setClientData(clientData);

    setOpenEditClient(true);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-semibold text-slate-700 capitalize text-3xl">
          Comunidad Alicorp
        </h4>
        <button
          onClick={downloadExcel}
          className="
              text-white flex items-center 
              gap-1 bg-blue-700 hover:bg-blue-800 
              focus:outline-none focus:ring-0 font-medium 
              rounded-full text-sm px-5 py-2.5 
              text-center"
        >
          Descargar Excel
        </button>
      </div>
      <p className="tex-sm mb-6 text-sm">
        Aquí encontrarás la Base de Datos de clientes suscritos de forma
        voluntaria a nuestro panel de investigación a través de la landing de{" "}
        <span className="font-bold">Comunidad Alicorp</span>
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-3 min-w-36">
                Negocio
              </th>
              <th scope="col" className="px-2 py-3 min-w-32">
                Giro
              </th>
              <th scope="col" className="px-2 py-3">
                RUC
              </th>
              <th scope="col" className="min-w-72 px-2 py-3">
                Razón Social
              </th>
              <th scope="col" className="min-w-52 px-2 py-3">
                Nombre del Negocio
              </th>
              <th scope="col" className="px-2 py-3">
                Departamento
              </th>
              <th scope="col" className="min-w-40 px-2 py-3">
                Provincia
              </th>
              <th scope="col" className="min-w-48 min-w-48 px-2 py-3">
                Distrito
              </th>
              <th scope="col" className="min-w-80 px-2 py-3">
                Dirección
              </th>
              <th scope="col" className="px-2 py-3">
                Teléfono
              </th>
              {/* <th scope="col" className="px-2 py-3">
                Acciones
              </th> */}
            </tr>
          </thead>
          <tbody>
            {costumers &&
              costumers.map((costumer, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-2 py-2 capitalize">{costumer.negocio}</td>
                    <td className="px-2 py-2 capitalize">{costumer.giro}</td>
                    <td className="px-2 py-2 capitalize">{costumer.ruc}</td>
                    <td className="px-2 py-2 font-medium text-gray-900">
                      {costumer.razon_social}
                    </td>
                    <td className="px-2 py-2 capitalize font-medium text-gray-900">
                      {costumer.nombre_negocio}
                    </td>
                    <td className="px-2 py-2 capitalize font-medium text-gray-900">
                      {costumer.provincia}
                    </td>
                    <td className="px-2 py-2 capitalize font-medium text-gray-900">
                      {costumer.departamento}
                    </td>
                    <td className="px-2 py-2 capitalize">
                      {costumer.distrito}
                    </td>
                    <td className="px-2 py-2 capitalize">
                      {costumer.direccion}
                    </td>
                    <td className="px-2 py-2">{costumer.celular}</td>
                    {/* <td className="px-2 py-2 text-center">
                      <button onClick={() => openEditModal(costumer)}>
                        editar
                        
                      </button>
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {openEditClient && (
        <section className="fixed top-0 w-full h-full right-0 flex">
          <div
            className="w-full bg-black/40 cursor-pointer"
            onClick={() => setOpenEditClient(false)}
          ></div>
          <div
            style={
              openEditClient ? { transform: "translateX(0)", opacity: 1 } : {}
            }
            className="w-2/5 px-8 pt-10 right-0 bg-white h-full absolute transition-all duration-500 ease-in-out transform translate-x-full opacity-0"
          >
            <div className="mb-8 flex justify-between">
              <h3 className="text-3xl font-medium">Cliente</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setOpenEditClient(false)}
                  className="text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-0 font-medium rounded-full text-sm px-9 py-2.5 text-center"
                >
                  Cancelar
                </button>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium rounded-full text-sm px-9 py-2.5 text-center">
                  Guardar
                </button>
              </div>
            </div>

            <form>
              <ul className="flex flex-col gap-y-6">
                <li className="flex gap-4">
                  <label htmlFor="business_type" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      Negocio
                    </span>
                    <span className="text-xs font-regular">
                      Tipo de negocio
                    </span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    value={clientData.data?.attributes.business_type}
                    onChange={formik.handleChange}
                    id="business_type"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="Gastronomía"
                  />
                </li>

                <li className="flex gap-4">
                  <label
                    htmlFor="business_subtype"
                    className="flex flex-col grow"
                  >
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      Giro
                    </span>
                    <span className="text-xs font-regular">
                      Giro del negocio
                    </span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    value={clientData.data?.attributes.business_subtype}
                    onChange={formik.handleChange}
                    id="business_subtype"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="Cevichería"
                    required
                  />
                </li>

                <li className="flex gap-4">
                  <label
                    htmlFor="business_document"
                    className="flex flex-col grow"
                  >
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      RUC
                    </span>
                    <span className="text-xs font-regular">
                      Ruc del negocio
                    </span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    id="business_document"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="Gastronomía"
                    required
                  />
                </li>

                <li className="flex gap-4">
                  <label htmlFor="business_name" className="flex flex-col grow">
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      Nombre del negocio
                    </span>
                    <span className="text-xs font-regular">Negocio</span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    id="business_name"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="Gastronomía"
                    required
                  />
                </li>

                <li className="flex gap-4">
                  <label
                    htmlFor="business_owner"
                    className="flex flex-col grow"
                  >
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      Cliente
                    </span>
                    <span className="text-xs font-regular">
                      titular del negocio
                    </span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    id="business_owner"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="Gastronomía"
                    required
                  />
                </li>

                <li className="flex gap-4">
                  <label
                    htmlFor="business_district"
                    className="flex flex-col grow"
                  >
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      Distrito
                    </span>
                    <span className="text-xs font-regular">
                      Distrito del negocio
                    </span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    id="business_district"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="Callao"
                    required
                  />
                </li>

                <li className="flex gap-4">
                  <label
                    htmlFor="owner_cellphone"
                    className="flex flex-col grow"
                  >
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      Teléfono
                    </span>
                    <span className="text-xs font-regular">
                      Teléfono del titular
                    </span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    id="owner_cellphone"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="946763098"
                    required
                  />
                </li>

                <li className="flex gap-4">
                  <label
                    htmlFor="owner_document_number"
                    className="flex flex-col grow"
                  >
                    <span
                      className={`${libre_franklin600.className} text-sm text-gray-900`}
                    >
                      DNI
                    </span>
                    <span className="text-xs font-regular">
                      Documento del titular
                    </span>
                  </label>

                  <input
                    maxLength={40}
                    type="text"
                    id="owner_document_number"
                    className="self-start h-10 border border-gray-300 text-gray-900 text-sm rounded outline-blue-500 block w-64 p-2.5"
                    placeholder="946763098"
                    required
                  />
                </li>
              </ul>
            </form>
          </div>
        </section>
      )}
    </section>
  );
}
