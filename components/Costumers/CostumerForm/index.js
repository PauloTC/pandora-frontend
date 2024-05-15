"use client";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CostumerForm.form";

export function CostumerForm() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        // await subscribeCtrl.createSubscribe(formValues);

        // formik.handleReset();
        console.log(formValues);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <h4 className={`font-bold text-3xl mb-4`}>Regístrate</h4>
      <p className="text-sm mb-8">Por favor, completa estos datos.</p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <div className="mb-8">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nombres y Apellidos
          </label>
          <input
            type="text"
            id="name"
            className="
                  bg-gray-50 
                  border 
                  border-gray-300 
                  text-gray-900 
                  text-sm 
                  rounded-lg 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  block w-full p-2.5"
            placeholder="Ingresa tus nombres y apellidos"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="document_number"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ¿Cúal es tu número de DNI / RUC?
          </label>
          <input
            type="number"
            id="document_number"
            className="
                  bg-gray-50 
                  border 
                  border-gray-300 
                  text-gray-900 
                  text-sm 
                  rounded-lg 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  block w-full p-2.5"
            placeholder="Ingresa de 8 a 12 dígitos"
            value={formik.values.document_number}
            onChange={formik.handleChange}
            error={formik.errors.document_number}
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="birthdate"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ¿Cuál es tu fecha de nacimiento?
          </label>
          <input
            type="text"
            id="birthdate"
            className="
                  bg-gray-50 
                  border 
                  border-gray-300 
                  text-gray-900 
                  text-sm 
                  rounded-lg 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  block w-full p-2.5"
            placeholder="dd/mm/aaaa"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
            error={formik.errors.birthdate}
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="cellphone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ¿Cúal es tu número de celular?
          </label>
          <input
            type="number"
            id="cellphone"
            className="
                  bg-gray-50 
                  border 
                  border-gray-300 
                  text-gray-900 
                  text-sm 
                  rounded-lg 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  block w-full p-2.5"
            placeholder="987654321"
            value={formik.values.cellphone}
            onChange={formik.handleChange}
            error={formik.errors.cellphone}
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="
                  bg-gray-50 
                  border 
                  border-gray-300 
                  text-gray-900 
                  text-sm 
                  rounded-lg 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  block w-full p-2.5"
            placeholder="micorreo@correo.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
            required
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tengo un(a)
          </label>
          <select
            id="business"
            className="
                  bg-gray-50 
                  border 
                  border-gray-300 
                  text-gray-900 
                  text-sm 
                  rounded-lg 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  block w-full p-2.5"
            value={formik.values.business}
            onChange={formik.handleChange}
            error={formik.errors.business}
          >
            <option value="">Selecciona tu negocio</option>
            <option value="bodega">Bodega</option>
            <option value="restaurante">Restaurante</option>
            <option value="panadería">Panadería</option>
            <option value="chifa">Chifa</option>
            <option value="mayorista">Negocio Mayorista</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        <div className="mb-8"></div>
        <div className="flex gap-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-20 h-20"
          >
            <path d="M13.407 2.59a.75.75 0 0 0-1.464.326c.365 1.636.557 3.337.557 5.084 0 1.747-.192 3.448-.557 5.084a.75.75 0 0 0 1.464.327c.264-1.185.444-2.402.531-3.644a2 2 0 0 0 0-3.534 24.736 24.736 0 0 0-.531-3.643ZM4.348 11H4a3 3 0 0 1 0-6h2c1.647 0 3.217-.332 4.646-.933C10.878 5.341 11 6.655 11 8c0 1.345-.122 2.659-.354 3.933a11.946 11.946 0 0 0-4.23-.925c.203.718.478 1.407.816 2.057.12.23.057.515-.155.663l-.828.58a.484.484 0 0 1-.707-.16A12.91 12.91 0 0 1 4.348 11Z" />
          </svg>

          <p className="text-sm">
            Priorizamos tu seguridad y la confidencialidad de la información que
            compartes con nosotros. En Alicorp, la seguridad de tu información
            es nuestra prioridad, asegurando tu privacidad y bienestar.
          </p>
        </div>
        <button
          type="submit"
          className={`
                mt-4
                self-center
                focus:outline-none 
                text-white
                w-60
                bg-red-500 
                hover:bg-red-700 
                rounded-lg
                text-sm px-5
                font-bold
                py-3 me-2 mb-2`}
        >
          Continuar
        </button>
      </form>
    </>
  );
}
