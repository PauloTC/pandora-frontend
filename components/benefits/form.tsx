"use client";
import React, { useState } from "react";
import { initialValues } from "./BenefitsForm.form";
import { useFormik } from "formik";
import { Costumer } from "@/api";
import ErrorFormMessage from "@/components/Common/ErrorFormMessage";
import departments from "../../public/address/departments.json";
import provinces from "../../public/address/provinces.json";
import districts from "../../public/address/districts.json";
import * as Yup from "yup";
import { sub } from "date-fns";

interface Values {
  [key: string]: any;
}

interface SelectOption {
  id: string;
  name: string;
}

const Form = () => {
  const costumerCtrl = new Costumer();

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

  const validationSchemaStepOne = Yup.object({
    name: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .required("El nombre es requerido"),
    type: Yup.string().required("El tipo es requerido"),
    department: Yup.string().required("El departamento es requerido"),
    address: Yup.string().required("La dirección es requerida"),
  });

  const validationSchemaStepTwo = Yup.object({
    ruc: Yup.string()
      .notRequired()
      .test(
        "ruc-validation",
        "El RUC debe tener exactamente 11 dígitos y solo puede contener números",
        (value) => {
          if (!value) {
            return true; // Si el RUC no está presente, se considera válido
          }
          return /^[0-9]{11}$/.test(value);
        }
      ),
    cellphone: Yup.string()
      .required("El celular es requerido")
      .matches(/^9/, "El celular debe comenzar con 9")
      .matches(/^[0-9]*$/, "El celular solo puede contener números")
      .length(9, "El celular debe tener exactamente 9 dígitos"),
  });

  const validateStep1 = (values: Values) => {
    let errors: any = {};

    try {
      validationSchemaStepOne.validateSync(values, { abortEarly: false });
    } catch (yupErrors) {
      if (yupErrors instanceof Yup.ValidationError) {
        yupErrors.inner.forEach((yupError) => {
          errors[yupError.path as keyof typeof errors] = yupError.message;
        });
      }
    }

    // Verificar si el type es 'Gastro', 'Pani' o 'Limpieza' y si subtype no está presente
    if (
      (values.type === "Gastronomía" ||
        values.type === "Panificación" ||
        values.type === "Limpieza") &&
      !values.subtype
    ) {
      errors.subtype = "El giro del negocio es requerido";
    }

    return errors;
  };

  const validateStep2 = (values: Values) => {
    let errors: any = {};

    try {
      validationSchemaStepTwo.validateSync(values, { abortEarly: false });
    } catch (yupErrors) {
      if (yupErrors instanceof Yup.ValidationError) {
        yupErrors.inner.forEach((yupError) => {
          errors[yupError.path as keyof typeof errors] = yupError.message;
        });
      }
    }

    return errors;
  };

  const handleButtonClick = async () => {
    if (step === 1) {
      const errors = validateStep1(formik.values);

      if (Object.keys(errors).length === 0) {
        setStep(2);
      } else {
        formik.setErrors(errors);
      }
    } else if (step === 2) {
      const errors = validateStep2(formik.values);

      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
        setCongrats(true);
      } else {
        formik.setErrors(errors);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    onSubmit: async (formValues: any) => {
      try {
        costumerCtrl.createCostumer(formValues);

        formik.resetForm({ values: initialValues() });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const selectDepartment = (id_ubigeo: string) => {
    formik.handleChange;
    const matchProvinces = provinces[id_ubigeo as keyof typeof provinces];

    setListProvinces(matchProvinces);
  };

  const selectProvince = (id_ubigeo: string) => {
    const matchDistricts = districts[id_ubigeo as keyof typeof districts];

    setListDistricts(matchDistricts);
  };

  const businessTypes = [
    {
      id: 1,
      name: "Bodega",
    },
    {
      id: 2,
      name: "Puesto de mercado",
    },
    {
      id: 3,
      name: "Minimayorista",
    },
    {
      id: 4,
      name: "Mayorista",
    },
    {
      id: 5,
      name: "Gastronomía",
    },
    {
      id: 6,
      name: "Panificación",
    },
    {
      id: 7,
      name: "Limpieza",
    },
  ];

  const GastroSubtypes = [
    {
      id: "1",
      name: "Pollería",
    },
    {
      id: "2",
      name: "Menú",
    },
    {
      id: "3",
      name: "Chifa",
    },
    {
      id: "4",
      name: "Cevichería",
    },
    {
      id: "5",
      name: "Sanguichería",
    },
    {
      id: "6",
      name: "Catering",
    },
    {
      id: "7",
      name: "Hotel",
    },
  ];

  const PaniSubtypes = [
    {
      id: "1",
      name: "Panabodega",
    },
    {
      id: "2",
      name: "Panadería",
    },
    {
      id: "3",
      name: "Panificadora",
    },
    {
      id: "4",
      name: "Repostería",
    },
    {
      id: "5",
      name: "Pastelería",
    },
  ];

  const LimSubtypes = [
    {
      id: "1",
      name: "Industria",
    },
    {
      id: "2",
      name: "Services",
    },
    {
      id: "3",
      name: "Gastronomía",
    },
    {
      id: "4",
      name: "Panificación",
    },
  ];

  const typeToSubtypes: { [key: string]: SelectOption[] } = {
    Gastronomía: GastroSubtypes,
    Panificación: PaniSubtypes,
    Limpieza: LimSubtypes,
  };

  const SubtypesComponent = () => {
    const subtypes = typeToSubtypes[formik.values.type] || [{}];

    return (
      <div className="w-full">
        <label htmlFor="subtype" className="block mb-1.5 font-semibold">
          Giro de negocio *
        </label>
        <select
          name="subtype"
          value={formik.values.subtype}
          onChange={formik.handleChange}
          className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value="" disabled>
            Selecciona un giro de negocio
          </option>
          {subtypes.map((subtype, index) => (
            <option key={index} value={subtype.name}>
              {subtype.name}
            </option>
          ))}
        </select>
        <ErrorFormMessage
          message={
            typeof formik.errors.subtype === "string"
              ? formik.errors.subtype
              : undefined
          }
        />
      </div>
    );
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
          className="w-full bg-white py-12 px-4 rounded-3xl border border-neutral-medium lg:py-16 lg:px-12"
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
                <div className="w-full">
                  <label htmlFor="name" className="block mb-1.5 font-semibold">
                    Nombre de tu negocio *
                  </label>
                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    type="text"
                    id="name"
                    className="text-sm border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
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
                    id="type"
                    htmlFor="type"
                    className="block mb-1.5 font-semibold"
                  >
                    Tipo de negocio *
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 px-4"
                    >
                      <option value="" disabled>
                        Selecciona un tipo de negocio
                      </option>
                      {businessTypes.map((businessType, index) => (
                        <option key={index} value={businessType.name}>
                          {businessType.name}
                        </option>
                      ))}
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 absolute top-3.5 text-red-500 right-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                  <ErrorFormMessage
                    message={
                      typeof formik.errors.type === "string"
                        ? formik.errors.type
                        : undefined
                    }
                  />
                </div>

                {["Gastronomía", "Panificación", "Limpieza"].includes(
                  formik.values.type
                ) && <SubtypesComponent />}

                <div className="flex flex-col xl:flex-row w-full gap-5">
                  <div className="w-full">
                    <label
                      id="department"
                      htmlFor="department"
                      className="block mb-1.5 font-semibold"
                    >
                      Departamento *
                    </label>
                    <div className="relative">
                      <select
                        name="department"
                        value={formik.values.department}
                        defaultValue=""
                        onChange={(e) => {
                          const selectedDepartment = departments.find(
                            (department) =>
                              department.nombre_ubigeo === e.target.value
                          );

                          if (
                            selectedDepartment &&
                            selectedDepartment.id_ubigeo
                          ) {
                            formik.setFieldValue(
                              "department",
                              selectedDepartment.id_ubigeo
                            );

                            formik.handleChange(e);
                            selectDepartment(selectedDepartment.id_ubigeo);
                          }
                        }}
                        className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-4 p-2.5"
                      >
                        <option value="" disabled>
                          Selecciona una opcion
                        </option>
                        {departments.map((department, index) => (
                          <option key={index} value={department.nombre_ubigeo}>
                            {department.nombre_ubigeo}
                          </option>
                        ))}
                      </select>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 absolute top-3.5 text-red-500 right-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                    <ErrorFormMessage
                      message={
                        typeof formik.errors.department === "string"
                          ? formik.errors.department
                          : undefined
                      }
                    />
                  </div>

                  <div className="w-full">
                    <label
                      id="province"
                      htmlFor="province"
                      className="block mb-1.5 font-semibold"
                    >
                      Provincia
                    </label>
                    <div className="relative">
                      <select
                        name="province"
                        value={formik.values.province}
                        defaultValue=""
                        onChange={(e) => {
                          const selectedProvince = listProvinces.find(
                            (province) =>
                              province.nombre_ubigeo === e.target.value
                          );

                          if (selectedProvince && selectedProvince.id_ubigeo) {
                            formik.setFieldValue(
                              "province",
                              selectedProvince.id_ubigeo
                            );

                            formik.handleChange(e);
                            selectProvince(selectedProvince.id_ubigeo);
                          }
                        }}
                        className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-4 p-2.5"
                      >
                        <option value="" disabled>
                          Selecciona una opcion
                        </option>
                        {listProvinces.map((province, index) => (
                          <option key={index} value={province.nombre_ubigeo}>
                            {province.nombre_ubigeo}
                          </option>
                        ))}
                      </select>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 absolute top-3.5 text-red-500 right-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
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
                    <div className="relative">
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
                        className="appearance-none h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-4 p-2.5"
                      >
                        <option value="" disabled>
                          Selecciona una opcion
                        </option>
                        {listDistricts.map((district, index) => (
                          <option key={index} value={district.nombre_ubigeo}>
                            {district.nombre_ubigeo}
                          </option>
                        ))}
                      </select>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 absolute top-3.5 text-red-500 right-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="address"
                    className="block mb-1.5 font-semibold"
                  >
                    Dirección*
                  </label>
                  <input
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    type="text"
                    id="address"
                    className="text-sm border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
                    placeholder="Dirección"
                  />
                  <ErrorFormMessage
                    message={
                      typeof formik.errors.address === "string"
                        ? formik.errors.address
                        : undefined
                    }
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
                    Razón Social
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
                </div>

                <div>
                  <label htmlFor="ruc" className="block mb-1.5 font-semibold">
                    RUC
                  </label>
                  <input
                    value={formik.values.ruc}
                    onChange={formik.handleChange}
                    maxLength={11}
                    type="text"
                    id="ruc"
                    className="appearance-none border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-400 bg-neutral-light"
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
                    maxLength={9}
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

          <div className="my-8 flex gap-1 items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 text-red-500 h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

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
