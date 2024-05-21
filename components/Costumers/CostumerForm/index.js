"use client";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CostumerForm.form";
import { useState } from "react";

export function CostumerForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        // await subscribeCtrl.createSubscribe(formValues);

        // formik.handleReset();
        console.log(formValues);
        setIsSubmitted(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleButtonClick = (event) => {
    if (step === 1) {
      event.preventDefault();
      setStep(2);
    }
  };

  const RESTAURANT_SUBTYPES = [
    {
      value: "catering",
      label: "Catering",
    },
    {
      value: "pollerias",
      label: "Pollerias",
    },
    {
      value: "chifas",
      label: "Chifas",
    },
    {
      value: "cevicherias",
      label: "Cevicherias",
    },
    {
      value: "menu",
      label: "Menus / Comida casera criolla",
    },
    {
      value: "sangucherias",
      label: "Sangucherias",
    },
    {
      value: "otros",
      label: "Otros lead gastronomia",
    },
  ];

  const BAKERY_SUBTYPES = [
    {
      value: "pan",
      label: "Pan/Past basica",
    },
    {
      value: "panaderias",
      label: "Panaderias",
    },
    {
      value: "reposteras",
      label: "Reposteras/Pasteleria",
    },
    {
      value: "industrial",
      label: "Panif. Industrial",
    },
  ];

  const LAUNDRY_SUBTYPES = [
    {
      value: "lavanderias",
      label: "Lavanderias",
    },
    {
      value: "hoteles",
      label: "Hoteles",
    },
    {
      value: "independiente",
      label: "Lavandería independiente",
    },
    {
      value: "service",
      label: "Service de limpieza",
    },
  ];

  return (
    <>
      <h4 className={`font-bold text-3xl mb-4`}>Regístrate</h4>
      <p className="text-sm mb-8">Por favor, completa estos datos.</p>

      {!isSubmitted && (
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          {step === 1 && (
            <>
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
                  ¿Cúal es tu número de DNI?
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
                  placeholder="Documento de identidad"
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
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-8">
                <label
                  htmlFor="business_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nombre del Negocio
                </label>
                <input
                  type="text"
                  id="business_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingresa tus nombres y apellidos"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="business_number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  ¿Cúal es el número de RUC?
                </label>
                <input
                  type="number"
                  id="business_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Ingresa de 8 a 12 dígitos"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Distrito del negocio
                </label>
                <select
                  id="business_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                  <option value="">Selecciona un distrito</option>
                  <option value="d1">Distrito 1</option>
                  <option value="d2">Distrito 2</option>
                  <option value="d3">Distrito 3</option>
                  <option value="d4">Distrito 4</option>
                  <option value="d5">Distrito 5</option>
                  <option value="d6">Distrito 6</option>
                </select>
              </div>
              <div className="mb-8">
                <label
                  htmlFor="business"
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
                        block w-full p-2.5"
                  value={formik.values.business}
                  onChange={formik.handleChange}
                  error={formik.errors.business}
                >
                  <option value="">Selecciona tu negocio</option>
                  <option value="bodega">Bodega</option>
                  <option value="puesto de mercado">Puesto de mercado</option>
                  <option value="minimayorista">Minimayorista</option>
                  <option value="mayorista">Negocio Mayorista</option>
                  <option value="codistribuidora">Codistribuidora</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="panaderia">Panadería</option>
                  <option value="lavanderia">Lavandería</option>
                </select>
              </div>
              {(() => {
                switch (formik.values.business) {
                  case "restaurante":
                    return (
                      <select
                        id="restaurant_subtype"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        {RESTAURANT_SUBTYPES.map((subtype) => (
                          <option key={subtype.value} value={subtype.value}>
                            {subtype.label}
                          </option>
                        ))}
                      </select>
                    );
                  case "panaderia":
                    return (
                      <select
                        id="bakery_subtype"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        {BAKERY_SUBTYPES.map((subtype) => (
                          <option key={subtype.value} value={subtype.value}>
                            {subtype.label}
                          </option>
                        ))}
                      </select>
                    );
                  case "lavanderia":
                    return (
                      <select
                        id="laundry_subtype"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      >
                        {LAUNDRY_SUBTYPES.map((subtype) => (
                          <option key={subtype.value} value={subtype.value}>
                            {subtype.label}
                          </option>
                        ))}
                      </select>
                    );
                  default:
                    return null;
                }
              })()}
            </>
          )}

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
              Priorizamos tu seguridad y la confidencialidad de la información
              que compartes con nosotros. En Alicorp, la seguridad de tu
              información es nuestra prioridad, asegurando tu privacidad y
              bienestar.
            </p>
          </div>
          <button
            type="submit"
            onClick={handleButtonClick}
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
            {step === 1 ? "Continuar" : "Enviar"}
          </button>
        </form>
      )}

      {isSubmitted && (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-20 h-20 text-green-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <p className="text-base">Los datos se guardaron con éxito.</p>
        </div>
      )}
    </>
  );
}
