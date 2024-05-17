"use client";
import { useEffect, useState } from "react";

import { Costumer } from "@/api";
import * as XLSX from "xlsx";

export default function Subscribers() {
  const costumerCtrl = new Costumer();

  const [costumers, setCostumers] = useState([] as any[]);

  useEffect(() => {
    (async () => {
      try {
        const response = await costumerCtrl.getAllCostumers();
        const transformedData = response.data.map((costumer: any) => ({
          name: costumer.attributes.name,
          birthdate: costumer.attributes.birthdate,
          cellphone: costumer.attributes.cellphone,
          document_number: costumer.attributes.document_number,
          email: costumer.attributes.email,
          business: costumer.attributes.business,
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
    XLSX.writeFile(wb, "clientes.xlsx");
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-semibold text-slate-700 capitalize text-3xl">
          Clientes Amigos
        </h4>
        <button
          onClick={downloadExcel}
          className="
              text-white flex items-center 
              gap-1 bg-blue-700 hover:bg-blue-800 
              focus:outline-none focus:ring-4 
              focus:ring-blue-300 font-medium 
              rounded-full text-sm px-5 py-2.5 
              text-center"
        >
          Descargar Excel
        </button>
      </div>
      <p className="tex-sm mb-6 text-sm">
        Aquí encontrarás la Base de Datos de clientes suscritos de forma
        voluntaria a nuestro panel de investigación a través de la landing de{" "}
        <span className="font-bold">Conecta Alicorp.</span>
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombres
              </th>
              <th scope="col" className="px-6 py-3">
                Negocio
              </th>
              <th scope="col" className="px-6 py-3">
                Telefono
              </th>
              <th scope="col" className="px-6 py-3">
                Documento
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Edad
              </th>
            </tr>
          </thead>
          <tbody>
            {costumers &&
              costumers.map((costumer, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {costumer.name}
                    </th>
                    <td className="px-6 py-4 capitalize">
                      {costumer.business}
                    </td>
                    <td className="px-6 py-4">{costumer.cellphone}</td>

                    <td className="px-6 py-4">{costumer.document_number}</td>
                    <td className="px-6 py-4">{costumer.email}</td>
                    <td className="px-6 py-4">{costumer.birthdate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
