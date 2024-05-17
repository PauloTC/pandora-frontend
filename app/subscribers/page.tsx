"use client";
import { useEffect, useState } from "react";

import { Costumer } from "@/api";

export default function Subscribers() {
  const costumerCtrl = new Costumer();

  const [costumers, setCostumers] = useState([] as any[]);

  useEffect(() => {
    (async () => {
      try {
        const response = await costumerCtrl.getAllCostumers();
        setCostumers(response.data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <section>
      <h4 className="font-semibold text-slate-700 capitalize text-3xl mb-6">
        Clientes Amigos
      </h4>
      <p className="tex-sm mb-6">
        Aquí encontrarás la Base de Datos de clientes suscritos de forma
        voluntaria a nuestro panel de investigación a través de la landing de{" "}
        <span className="font-bold">Conecta Alicorp.</span>
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombres
              </th>
              <th scope="col" className="px-6 py-3">
                Edad
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
                Negocio
              </th>
            </tr>
          </thead>
          <tbody>
            {costumers &&
              costumers.map((subscriber, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {subscriber.attributes.name}
                    </th>
                    <td className="px-6 py-4">
                      {subscriber.attributes.birthdate}
                    </td>
                    <td className="px-6 py-4">
                      {subscriber.attributes.cellphone}
                    </td>
                    <td className="px-6 py-4">
                      {subscriber.attributes.document_number}
                    </td>
                    <td className="px-6 py-4">{subscriber.attributes.email}</td>
                    <td className="px-6 py-4 capitalize">
                      {subscriber.attributes.business}
                    </td>
                  </tr>
                );
              })}
            {/* {costumers &&
              costumers.map((subscriber, index) => {
                return (
                  <tr key={index} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {subscriber.name}
                    </th>
                    <td className="px-6 py-4">{subscriber.email}</td>
                    <td className="px-6 py-4">{subscriber.phone}</td>
                  </tr>
                );
              })}
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </section>
  );
}
