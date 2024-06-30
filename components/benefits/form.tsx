"use client";
import React, { useEffect, useState } from "react";
import { initialValues, validationSchema } from "./BenefitsForm.form";
import { useFormik, Field } from "formik";
import { Costumer } from "@/api";
import ErrorFormMessage from "@/components/Common/ErrorFormMessage";
import departaments from "../../public/address/departments.json";
import provinces from "../../public/address/provinces.json";
import districts from "../../public/address/districts.json";

const Form = () => {
  const [step, setStep] = useState(1);
  const [congrats, setCongrats] = useState(false);
  const [listProvinces, setListProvinces] = useState([
    {
      id_ubigeo: "0",
      nombre_ubigeo: "Selecciona un distrito",
    },
  ]);

  const [listDistricts, setListDistricts] = useState([
    {
      id_ubigeo: "0",
      nombre_ubigeo: "Selecciona un distrito",
    },
  ]);

  const costumerCtrl = new Costumer();

  useEffect(() => {
    console.log("departaments", departaments);
    console.log("provinces", provinces);
  }, []);

  const validateStep1 = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "El nombre es requerido";
    }
    if (!values.type) {
      errors.type = "El tipo es requerido";
    }
    if (!values.subtype) {
      errors.subtype = "El giro del negocio es requerido";
    }
    return errors;
  };

  const validateStep2 = (values) => {
    let errors = {};
    if (!values.social_reason) {
      errors.social_reason = "La razón social es requerida";
    }
    if (!values.ruc) {
      errors.ruc = "El RUC es requerido";
    }
    if (!values.cellphone) {
      errors.cellphone = "El celular es requerido";
    }
    return errors;
  };

  const handleButtonClick = async () => {
    console.log("step", step);
    if (step === 1) {
      const errors = validateStep1(formik.values);
      console.log("errors", errors);
      if (Object.keys(errors).length === 0) {
        setStep(2);
      } else {
        formik.setErrors(errors);
      }
    } else if (step === 2) {
      const errors = validateStep2(formik.values);
      console.log("errors", errors);
      if (Object.keys(errors).length === 0) {
        // console.log("values", formik.values);
        formik.handleSubmit();
        setCongrats(true);
      } else {
        formik.setErrors(errors);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues: any) => {
      try {
        const response = await costumerCtrl.createCostumer(formValues);
        console.log("response", response);
        formik.resetForm({ values: initialValues() });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const selectDepartment = (id_ubigeo: any) => {
    formik.handleChange;
    const matchProvinces = provinces[id_ubigeo];

    setListProvinces(matchProvinces);
  };

  const selectProvince = (id_ubigeo: any) => {
    const matchDistricts = districts[id_ubigeo];

    setListDistricts(matchDistricts);
  };

  return (
    <>
      {congrats ? (
        <div className="flex justify-center flex-col items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-20 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <h3 className="mt-3 text-xl text-center">
            Gracias por participar <br /> pronto estaremos en contacto
          </h3>

          <button
            onClick={() => {
              setCongrats(false);
              setStep(1);
            }}
            className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Volver
          </button>
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="w-full bg-white py-12 px-2 rounded-3xl border border-neutral-medium lg:py-16 lg:px-12"
        >
          <div className="mb-2 flex justify-between items-center">
            <h3 className="font-bold text-2xl">Regístrate</h3>
            <div className="text-positive-dark text-xs bg-positive-dark-opacity px-2 py-1 rounded-lg">
              Paso {step} de 2
            </div>
          </div>
          <p className="font-light mb-8">Por favor, completa estos datos.</p>
          <div className="flex flex-col gap-5">
            {step === 1 && (
              <>
                <div className="flex flex-col w-full gap-5">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block mb-1.5 font-semibold"
                    >
                      Nombre de tu negocio *
                    </label>
                    <input
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      type="text"
                      id="name"
                      className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                      placeholder="Ingresa el nombre de tu negocio"
                      required
                    />
                    <ErrorFormMessage
                      message={
                        typeof formik.errors.name === "string"
                          ? formik.errors.name
                          : undefined
                      }
                    />
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="type"
                      className="block mb-1.5 font-semibold"
                    >
                      Tipo de Negocio *
                    </label>
                    <input
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      type="text"
                      id="type"
                      className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                      placeholder="Gastronomía"
                      required
                    />
                    <ErrorFormMessage
                      message={
                        typeof formik.errors.type === "string"
                          ? formik.errors.type
                          : undefined
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subtype"
                    className="block mb-1.5 font-semibold"
                  >
                    Giro de negocio *
                  </label>
                  <input
                    value={formik.values.subtype}
                    onChange={formik.handleChange}
                    type="text"
                    id="subtype"
                    className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                    placeholder="Cevichería"
                    required
                  />
                  <ErrorFormMessage
                    message={
                      typeof formik.errors.subtype === "string"
                        ? formik.errors.subtype
                        : undefined
                    }
                  />
                </div>

                <div className="flex flex-col xl:flex-row w-full gap-5">
                  <div className="w-full">
                    <label
                      id="department"
                      htmlFor="department"
                      className="block mb-1.5 font-semibold"
                    >
                      Departamento
                    </label>
                    <select
                      name="department"
                      value={formik.values.department}
                      defaultValue=""
                      onChange={(e) => {
                        const selectedDepartment = departaments.find(
                          (department) =>
                            department.nombre_ubigeo === e.target.value
                        );
                        formik.setFieldValue(
                          "department",
                          selectedDepartment?.id_ubigeo
                        );

                        formik.handleChange(e);
                        selectDepartment(selectedDepartment?.id_ubigeo);
                      }}
                      className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option value="" disabled>
                        Selecciona un departamento
                      </option>
                      {departaments.map((department, index) => (
                        <option key={index} value={department.nombre_ubigeo}>
                          {department.nombre_ubigeo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full">
                    <label
                      id="province"
                      htmlFor="province"
                      className="block mb-1.5 font-semibold"
                    >
                      Provincia
                    </label>
                    <select
                      name="province"
                      value={formik.values.province}
                      defaultValue=""
                      onChange={(e) => {
                        const selectedProvince = listProvinces.find(
                          (province) =>
                            province.nombre_ubigeo === e.target.value
                        );

                        formik.setFieldValue(
                          "province",
                          selectedProvince?.id_ubigeo
                        );

                        formik.handleChange(e);
                        selectProvince(selectedProvince?.id_ubigeo);
                      }}
                      className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option value="" disabled>
                        Selecciona un provincia
                      </option>
                      {listProvinces.map((province, index) => (
                        <option key={index} value={province.nombre_ubigeo}>
                          {province.nombre_ubigeo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row w-full gap-5">
                  <div className="w-full">
                    <label
                      id="district"
                      htmlFor="district"
                      className="block mb-1.5 font-semibold"
                    >
                      Distrito
                    </label>
                    <select
                      name="district"
                      value={formik.values.district}
                      defaultValue=""
                      onChange={(e) => {
                        const selectedDistrict = listDistricts.find(
                          (district) =>
                            district.nombre_ubigeo === e.target.value
                        );

                        formik.setFieldValue(
                          "district",
                          selectedDistrict?.id_ubigeo
                        );

                        formik.handleChange(e);
                      }}
                      className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option value="" disabled>
                        Selecciona un distrito
                      </option>
                      {listDistricts.map((district, index) => (
                        <option key={index} value={district.nombre_ubigeo}>
                          {district.nombre_ubigeo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="address"
                    className="block mb-1.5 font-semibold"
                  >
                    Dirección
                  </label>
                  <input
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    type="text"
                    id="address"
                    className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                    placeholder="Dirección"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label
                    htmlFor="social_reason"
                    className="block mb-1.5 font-semibold"
                  >
                    Razón Social *
                  </label>
                  <input
                    value={formik.values.social_reason}
                    onChange={formik.handleChange}
                    type="text"
                    id="social_reason"
                    className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                    placeholder="Razón Social"
                    required
                  />
                  <ErrorFormMessage
                    message={
                      typeof formik.errors.social_reason === "string"
                        ? formik.errors.social_reason
                        : undefined
                    }
                  />
                </div>

                <div>
                  <label htmlFor="ruc" className="block mb-1.5 font-semibold">
                    RUC *
                  </label>
                  <input
                    value={formik.values.ruc}
                    onChange={formik.handleChange}
                    type="text"
                    id="ruc"
                    className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                    placeholder="RUC"
                    required
                  />
                  <ErrorFormMessage
                    message={
                      typeof formik.errors.ruc === "string"
                        ? formik.errors.ruc
                        : undefined
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="cellphone"
                    className="block mb-1.5 font-semibold"
                  >
                    Telefono de contacto *
                  </label>
                  <input
                    value={formik.values.cellphone}
                    onChange={formik.handleChange}
                    type="text"
                    id="cellphone"
                    className="border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                    placeholder="999999999"
                    required
                  />
                  <ErrorFormMessage
                    message={
                      typeof formik.errors.cellphone === "string"
                        ? formik.errors.cellphone
                        : undefined
                    }
                  />
                </div>
              </>
            )}
          </div>

          <div className="my-8">
            <p className="font-light text-xs">
              Priorizamos tu seguridad y la confidencialidad de la información
              que compartes con nosotros. En Alicorp, la seguridad de tu
              información es nuestra prioridad, asegurando tu privacidad y
              bienestar.
            </p>
          </div>
          <button
            type="button"
            onClick={handleButtonClick}
            className={`
                w-full
                h-14
                font-semibold
                flex
                justify-center
                items-center
                focus:outline-none
                text-white
                bg-red-500
                rounded-lg
                xl:hover:bg-red-700
              `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>

            {step === 1 ? "Continuar" : "Enviar"}
          </button>
        </form>
      )}
    </>
  );
};

export default Form;
