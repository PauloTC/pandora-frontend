"use client";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./loginform.form";
import { Auth } from "@/api";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks";

const authCtrl = new Auth();

export default function LoginForm() {
  const router = useRouter();
  const { user, login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await authCtrl.login(values);
        login(response.jwt);
        router.push("/investigations", { scroll: false });
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  // if (user) {
  //   router.push("/dashboard", { scroll: false });
  //   return null;
  // }

  return (
    <div className="w-2/6 right-0 min-h-screen flex items-center justify-center p-4 bg-white sm:p-6 md:p-8">
      <form onSubmit={formik.handleSubmit} className="space-y-6 w-4/5">
        <h5 className="text-xl font-medium text-gray-900">
          Ingresar a tu cuenta
        </h5>
        <div>
          <label
            htmlFor="identifier"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Correo electronico
          </label>
          <input
            type="email"
            name="identifier"
            id="identifier"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            error={formik.errors.identifier}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="
            w-full text-white 
            bg-blue-700 hover:bg-blue-800 
            focus:ring-2 focus:outline-none 
            focus:ring-blue-300 font-medium 
            rounded-lg text-sm px-5 py-2.5 text-center
            transition-all"
        >
          Acceder a tu cuenta
        </button>
        <div className="text-sm font-medium text-gray-500">
          No registrado?{" "}
          <a href="#" className="text-blue-700 hover:underline">
            Contactanos
          </a>
        </div>
      </form>
    </div>
  );
}
