"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ModalImage from "@/components/Common/ModalImage";
import {
  libre_franklin600,
  libre_franklin500,
  libre_franklin700,
} from "@/app/fonts";
import ExperimentDetail from "@/components/Experiments/ExperimentDetail";

export default function ExperimentsComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [actionMode, setSidebarMode] = useState("read");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleOpenSidebar = (mode: any) => {
    setSidebarMode(mode);
    setIsOpenSidebar(true);
  };
  const handleCloseSidebar = () => setIsOpenSidebar(false);

  return (
    <section>
      <div className="flex justify-between">
        <div className="flex items-center gap-6 mb-6">
          <h4 className="font-semibold text-slate-700 capitalize text-3xl">
            Experimentación
          </h4>
        </div>
        <div>
          <button
            onClick={() => handleOpenSidebar("create")}
            className="
                text-white flex 
                items-center gap-1 
                bg-blue-700 hover:bg-blue-800 
                font-medium rounded-full text-sm 
                px-5 py-2.5 text-center"
          >
            Agregar Experimento
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4 self-start">
          <ul className="grid grid-cols-3 gap-4">
            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start justify-between transition-all 
                duration-300 ease-in-out cursor-pointer
                relative overflow-hidden divide-y divide-gray-300"
            >
              <div className="pb-3">
                <div className="relative z-10">
                  <div className="flex mb-3">
                    <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                      Reposicionamiento de Secciones en el Landing
                    </h4>
                  </div>

                  <div className="flex mb-3 min-h-4 items-center">
                    <div className="flex gap-2 ">
                      <p className="text-xs align-center flex border px-2 rounded-md">
                        Insuma M++
                      </p>
                      <p className="text-xs align-center flex border px-2 rounded-md">
                        Reposteras
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 mb-3 min-h-4">
                    <span className="font-semibold text-xs capitalize">
                      Negocios Internacionales
                    </span>
                    <span className="rounded-lg text-xs block capitalize text-white px-2 py-1 bg-teal-600">
                      en curso
                    </span>
                  </div>

                  <div className="flex items-center justify-between divide-x-2 divide-gray-300">
                    <span className="text-xs flex gap-2 mb-2 font-medium grow">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                    <span className="text-xs flex gap-2 mb-2 font-medium grow justify-end">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex pt-2">
                  <p
                    className={`${libre_franklin700.className} h-12 flex items-center capitalize text-md w-full`}
                  >
                    Insuma
                  </p>
                  <ul className="flex items-center justify-end grow relative w-40">
                    <li
                      // prettier-ignore
                      className="border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>
                    <li
                      // prettier-ignore
                      className="absolute right-7 border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>

                    {/* <li className="absolute right-0 bottom-0 w-8">
                        <span
                          className={`${libre_franklin600.className} rounded-md text-xs flex justify-center bg-stone-600 text-white`}
                        >
                          +{" "}
                          {investigation?.attributes?.researchers.data.length -
                            2}{" "}
                        </span>
                      </li> */}
                  </ul>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-80 inset-x-0 inset-y-0 absolute text-gray-200 translate-x-20 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
              </div>

              <div className="flex justify-between gap-x-2 pt-3 relative">
                <button
                  onClick={handleOpenSidebar}
                  className="flex flex-1 justify-center gap-2 bg-blue-100 hover:bg-blue-200 px-2.5 py-2.5 rounded-full text-xs text-blueGray-900 transition-colors duration-200"
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  Detalles
                </button>
                <button
                  onClick={handleOpen}
                  className="flex-1 flex justify-center gap-2 bg-blue-600 hover:bg-blue-700  px-2.5 py-2.5 rounded-full text-xs text-white transition-colors duration-200"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Imagen
                </button>
              </div>
            </li>

            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start justify-between transition-all 
                duration-300 ease-in-out cursor-pointer
                relative overflow-hidden divide-y divide-gray-300"
            >
              <div className="pb-3">
                <div className="relative z-10">
                  <div className="flex mb-3">
                    <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                      Testear Segmentacion M++
                    </h4>
                  </div>

                  <div className="flex mb-3 min-h-4 items-center">
                    <div className="flex gap-2 ">
                      <p className="text-xs align-center flex border px-2 rounded-md">
                        Insuma M++
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 mb-3 min-h-4">
                    <span className="font-semibold text-xs capitalize">
                      Asuntos Corporativos
                    </span>
                    <span className="rounded-lg text-xs block capitalize text-white px-2 py-1 bg-teal-600">
                      finalizado
                    </span>
                  </div>

                  <div className="flex items-center justify-between divide-x-2 divide-gray-300">
                    <span className="text-xs flex gap-2 mb-2 font-medium grow">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                    {/* <span>-</span> */}
                    <span className="text-xs flex gap-2 mb-2 font-medium grow justify-end">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex pt-2">
                  <p
                    className={`${libre_franklin700.className} h-12 flex items-center capitalize text-md w-full`}
                  >
                    Insuma
                  </p>
                  <ul className="flex items-center justify-end grow relative w-40">
                    <li
                      // prettier-ignore
                      className="border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>
                    <li
                      // prettier-ignore
                      className="absolute right-7 border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>
                  </ul>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-80 inset-x-0 inset-y-0 absolute text-gray-200 translate-x-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>

              <div className="flex justify-between gap-x-2 pt-3 relative">
                <button
                  onClick={handleOpenSidebar}
                  className="flex flex-1 justify-center gap-2 bg-blue-100 hover:bg-blue-200 px-2.5 py-2.5 rounded-full text-xs text-blueGray-900 transition-colors duration-200"
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  Detalles
                </button>
                <button
                  onClick={handleOpen}
                  className="flex-1 flex justify-center gap-2 bg-blue-600 hover:bg-blue-700  px-2.5 py-2.5 rounded-full text-xs text-white transition-colors duration-200"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Imagen
                </button>
              </div>
            </li>

            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start justify-between transition-all 
                duration-300 ease-in-out cursor-pointer
                relative overflow-hidden divide-y divide-gray-300"
            >
              <div className="pb-3">
                <div className="relative z-10">
                  <div className="flex mb-3">
                    <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                      Reportes de App Puntos Dia Dia
                    </h4>
                  </div>

                  <div className="flex mb-3 min-h-4 items-center">
                    <div className="flex gap-2 ">
                      <p className="text-xs align-center flex border px-2 rounded-md">
                        Insuma M++
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 mb-3 min-h-4">
                    <span className="font-semibold text-xs capitalize">
                      Asuntos Corporativos
                    </span>
                    <span className="rounded-lg text-xs block capitalize text-white px-2 py-1 bg-teal-600">
                      finalizado
                    </span>
                  </div>

                  <div className="flex items-center justify-between divide-x-2 divide-gray-300">
                    <span className="text-xs flex gap-2 mb-2 font-medium grow">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                    {/* <span>-</span> */}
                    <span className="text-xs flex gap-2 mb-2 font-medium grow justify-end">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex pt-2">
                  <p
                    className={`${libre_franklin700.className} h-12 flex items-center capitalize text-md w-full`}
                  >
                    Insuma
                  </p>
                  <ul className="flex items-center justify-end grow relative w-40">
                    <li
                      // prettier-ignore
                      className="border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>
                    <li
                      // prettier-ignore
                      className="absolute right-7 border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>

                    {/* <li className="absolute right-0 bottom-0 w-8">
                          <span
                            className={`${libre_franklin600.className} rounded-md text-xs flex justify-center bg-stone-600 text-white`}
                          >
                            +{" "}
                            {investigation?.attributes?.researchers.data.length -
                              2}{" "}
                          </span>
                        </li> */}
                  </ul>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-80 inset-x-0 inset-y-0 absolute text-gray-200 translate-x-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </div>

              <div className="flex justify-between gap-x-2 pt-3 relative">
                <button
                  onClick={() => handleOpenSidebar("read")}
                  className="flex flex-1 justify-center gap-2 bg-blue-100 hover:bg-blue-200 px-2.5 py-2.5 rounded-full text-xs text-blueGray-900 transition-colors duration-200"
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  Detalles
                </button>
                <button
                  onClick={handleOpen}
                  className="flex-1 flex justify-center gap-2 bg-blue-600 hover:bg-blue-700  px-2.5 py-2.5 rounded-full text-xs text-white transition-colors duration-200"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Imagen
                </button>
              </div>
            </li>

            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start justify-between transition-all 
                duration-300 ease-in-out cursor-pointer
                relative overflow-hidden divide-y divide-gray-300"
            >
              <div className="pb-3">
                <div className="relative z-10">
                  <div className="flex mb-3">
                    <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                      Change Label "Entrega" to "Fecha de entrega"
                    </h4>
                  </div>

                  <div className="flex mb-3 min-h-4 items-center">
                    <div className="flex gap-2 ">
                      <p className="text-xs align-center flex border px-2 rounded-md">
                        Insuma M++
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 mb-3 min-h-4">
                    <span className="font-semibold text-xs capitalize">
                      Asuntos Corporativos
                    </span>
                    <span className="rounded-lg text-xs block capitalize text-white px-2 py-1 bg-teal-600">
                      finalizado
                    </span>
                  </div>

                  <div className="flex items-center justify-between divide-x-2 divide-gray-300">
                    <span className="text-xs flex gap-2 mb-2 font-medium grow">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                    {/* <span>-</span> */}
                    <span className="text-xs flex gap-2 mb-2 font-medium grow justify-end">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex pt-2">
                  <p
                    className={`${libre_franklin700.className} h-12 flex items-center capitalize text-md w-full`}
                  >
                    Insuma
                  </p>
                  <ul className="flex items-center justify-end grow relative w-40">
                    <li
                      // prettier-ignore
                      className="border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>
                    <li
                      // prettier-ignore
                      className="absolute right-7 border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>

                    {/* <li className="absolute right-0 bottom-0 w-8">
                          <span
                            className={`${libre_franklin600.className} rounded-md text-xs flex justify-center bg-stone-600 text-white`}
                          >
                            +{" "}
                            {investigation?.attributes?.researchers.data.length -
                              2}{" "}
                          </span>
                        </li> */}
                  </ul>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-80 inset-x-0 inset-y-0 absolute text-gray-200 rotate-90 translate-x-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>

              <div className="flex justify-between gap-x-2 pt-3 relative">
                <button
                  onClick={handleOpenSidebar}
                  className="flex flex-1 justify-center gap-2 bg-blue-100 hover:bg-blue-200 px-2.5 py-2.5 rounded-full text-xs text-blueGray-900 transition-colors duration-200"
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  Detalles
                </button>
                <button
                  onClick={handleOpen}
                  className="flex-1 flex justify-center gap-2 bg-blue-600 hover:bg-blue-700  px-2.5 py-2.5 rounded-full text-xs text-white transition-colors duration-200"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Imagen
                </button>
              </div>
            </li>

            <li
              className="
                border border-gray-200 
                rounded-lg p-5 box-border
                self-start justify-between transition-all 
                duration-300 ease-in-out cursor-pointer
                relative overflow-hidden divide-y divide-gray-300"
            >
              <div className="pb-3">
                <div className="relative z-10">
                  <div className="flex mb-3">
                    <h4 className="font-semibold capitalize min-h-10 text-slate-800 text-sm">
                      Change Label "Entrega" to "Fecha de entrega"
                    </h4>
                  </div>

                  <div className="flex mb-3 min-h-4 items-center">
                    <div className="flex gap-2 ">
                      <p className="text-xs align-center flex border px-2 rounded-md">
                        Insuma M++
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-2 mb-3 min-h-4">
                    <span className="font-semibold text-xs capitalize">
                      Asuntos Corporativos
                    </span>
                    <span className="rounded-lg text-xs block capitalize text-white px-2 py-1 bg-teal-600">
                      finalizado
                    </span>
                  </div>

                  <div className="flex items-center justify-between divide-x-2 divide-gray-300">
                    <span className="text-xs flex gap-2 mb-2 font-medium grow">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                    {/* <span>-</span> */}
                    <span className="text-xs flex gap-2 mb-2 font-medium grow justify-end">
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
                          d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                        />
                      </svg>

                      <strong>27/02/24</strong>
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex pt-2">
                  <p
                    className={`${libre_franklin700.className} h-12 flex items-center capitalize text-md w-full`}
                  >
                    Insuma
                  </p>
                  <ul className="flex items-center justify-end grow relative w-40">
                    <li
                      // prettier-ignore
                      className="border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>
                    <li
                      // prettier-ignore
                      className="absolute right-7 border-2 border-white rounded-full"
                    >
                      <Image
                        src="https://data-center-strapi.s3.sa-east-1.amazonaws.com/martha_c5edcc7817_3d7e1509d6.png"
                        alt="person"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </li>

                    {/* <li className="absolute right-0 bottom-0 w-8">
                          <span
                            className={`${libre_franklin600.className} rounded-md text-xs flex justify-center bg-stone-600 text-white`}
                          >
                            +{" "}
                            {investigation?.attributes?.researchers.data.length -
                              2}{" "}
                          </span>
                        </li> */}
                  </ul>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-80 inset-x-0 inset-y-0 absolute text-gray-200 translate-x-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
                  />
                </svg>
              </div>

              <div className="flex justify-between gap-x-2 pt-3 relative">
                <button
                  onClick={handleOpenSidebar}
                  className="flex flex-1 justify-center gap-2 bg-blue-100 hover:bg-blue-200 px-2.5 py-2.5 rounded-full text-xs text-blueGray-900 transition-colors duration-200"
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
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                  Detalles
                </button>
                <button
                  onClick={handleOpen}
                  className="flex-1 flex justify-center gap-2 bg-blue-600 hover:bg-blue-700  px-2.5 py-2.5 rounded-full text-xs text-white transition-colors duration-200"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  Imagen
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ModalImage isOpen={isOpen} onClose={handleClose}>
        <figure className="w-96 h-96 mx-auto relative">
          <Image
            alt="image"
            layout="fill"
            objectFit="contain"
            src="https://firebasestorage.googleapis.com/v0/b/alicorpexperimentsstorage.appspot.com/o/Alicorp%20experiments%2FBoton%20Continuar%20Comprando.JPG?alt=media&token=345bde4f-9442-46a8-9c40-fe4513ee060e"
          />
        </figure>
      </ModalImage>
      <ExperimentDetail
        sidebarMode={actionMode}
        isOpen={isOpenSidebar}
        onClose={handleCloseSidebar}
      ></ExperimentDetail>
    </section>
  );
}
