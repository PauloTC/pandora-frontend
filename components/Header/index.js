"use client";
import { libre_franklin500 } from "@/app/fonts";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useState, useEffect, useContext } from "react";

import { useFormik } from "formik";
import { InvestigationsContext } from "@/contexts";

export default function HeaderComponent() {
  const [time, setTime] = useState(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
  const { filterInvestigations } = useContext(InvestigationsContext);

  const router = useRouter();
  const { logout } = useAuth();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        router.push("/investigations");
        await filterInvestigations({
          project: "",
          objectivePublic: "",
          sort: "desc",
          pagination: { page: 1 },
          search: values.search,
        });
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
          placeholder="Busca por nombre de investigación ..."
        />

        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-slate-400"
          >
            <path
              fillRule="evenodd"
              d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="checkbox"
            className="absolute cursor-pointer inset-y-0 left-0 h-6 w-6 opacity-0"
            title="config"
          />
          <ul
            className="
            header-config
            absolute 
            opacity-0 
            transition-opacity 
            w-40 
            text-sm
            text-center 
            shadow-md
            inset-x-0
            divide-solid
            bg-white"
          >
            <button
              className={`${libre_franklin500.className} w-full h-8 hover:bg-gray-100 flex items-center justify-center`}
            >
              Actualizar perfil
            </button>
            <button
              onClick={logout}
              className={`${libre_franklin500.className} w-full h-8 hover:bg-gray-100 flex items-center justify-center text-red-800`}
            >
              Cerrar sesión
            </button>
          </ul>
        </div>

        <p className="text-gray-900 w-44 flex justify-end text-sm">{time}</p>
      </div>
    </form>
  );
}
