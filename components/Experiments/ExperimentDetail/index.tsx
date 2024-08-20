"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

import "react-datepicker/dist/react-datepicker.css";

import ExperimentForm from "@/components/Experiments/ExperimentForm";

export default function ExperimentDetail({
  isOpen,
  onClose,
  sidebarMode,
  children,
}: any) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (sidebarMode === "create") {
      setTitle("Nuevo experimento");
    }

    if (sidebarMode === "read") {
      setTitle("Detalles del experimento");
    }
  }, [sidebarMode]);

  if (!isOpen) {
    return null;
  }

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log("values", values);
  //   },
  // });

  return (
    <div className="fixed inset-0 flex z-40 justify-end">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>
      <div className="relative flex-1 flex flex-col max-w-xl w-full bg-white">
        <div className="absolute top-0 left-0 -ml-12 pt-2">
          <button
            onClick={onClose}
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 h-0 py-10 px-4 overflow-y-auto flex-col">
          <div className="flex-shrink-0 flex justify-between items-center px-6 ">
            {/* <h3 className="text-2xl font-semibold">{title}</h3> */}
            {sidebarMode === "read" && (
              <button
                className="
                    text-white flex 
                    items-center gap-1 
                    bg-blue-700 hover:bg-blue-800 
                    font-medium rounded-full text-sm 
                    px-5 py-2.5 text-center w-32 justify-center"
              >
                Editar
              </button>
            )}
          </div>
          {sidebarMode === "create" && <ExperimentForm />}
        </div>
      </div>
      <div className="flex-shrink-0"></div>
    </div>
  );
}
