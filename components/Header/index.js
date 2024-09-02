"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useState, useEffect, useContext } from "react";

import { useFormik } from "formik";
import { InvestigationsContext, ExperimentsContext } from "@/contexts";

export default function HeaderComponent({ type }) {
  const router = useRouter();
  const [time, setTime] = useState(format(new Date(), "yyyy-MM-dd HH:mm:ss"));

  const investigationsContext = useContext(InvestigationsContext);
  const experimentsContext = useContext(ExperimentsContext);

  const { logout } = useAuth();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (type === "investigation") {
          router.push("/investigaciones");
          await investigationsContext.filterInvestigations({
            project: "",
            objectivePublic: "",
            sort: "desc",
            pagination: { page: 1 },
            search: values.search,
          });
        } else if (type === "experiment") {
          router.push("/experimentos");

          await experimentsContext.filterExperiments({
            sort: "desc",
            pagination: { page: 1 },
            search: values.search,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(format(new Date(), "dd/mm/yy HH:mm:ss"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className="mb-8">
      <div
        className="
          relative 
          border 
          border-gray-300 
          rounded-lg  
          flex
          items-center
          pr-3"
      >
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          value={formik.values.search}
          onChange={formik.handleChange}
          className="
            block 
            p-4 
            ps-10 
            text-sm 
            text-gray-900 
            bg-transparent
            outline-0
            grow"
          placeholder={
            type === "investigation"
              ? "Buscar investigaciones por nombre"
              : "Buscar experimentos por nombre"
          }
        />

        <a className="flex gap-2 text-sm items-center" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Cerrar sesión
        </a>

        {/* <p className="text-gray-900 w-44 flex justify-end text-sm">{time}</p> */}
      </div>
    </form>
  );
}
