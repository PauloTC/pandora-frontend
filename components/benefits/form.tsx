"use client";
import React, { useEffect, useState } from "react";
import { initialValues } from "./BenefitsForm.form";
import { useFormik } from "formik";
import { Costumer } from "@/api";
import ErrorFormMessage from "@/components/Common/ErrorFormMessage";
import departments from "../../public/address/departments.json";
import provinces from "../../public/address/provinces.json";
import districts from "../../public/address/districts.json";
import Select from "react-select";
import * as Yup from "yup";

interface Values {
  [key: string]: any;
}

interface SelectOption {
  value: number;
  label: string;
}

const Form = () => {
  const costumerCtrl = new Costumer();

  const [step, setStep] = useState(1);
  const [congrats, setCongrats] = useState(false);
  const [departmentOptions, setDepartmentOptions] = useState([
    {
      value: "0",
      label: "Selecciona un departamento",
    },
  ]);
  const [listProvinces, setListProvinces] = useState([
    {
      value: "0",
      label: "Selecciona una provincia",
    },
  ]);

  const [listDistricts, setListDistricts] = useState([
    {
      value: "0",
      label: "Selecciona un distrito",
    },
  ]);

  const validationSchemaStepOne = Yup.object({
    name: Yup.string()
      .min(2, "El nombre debe tener al menos 2 carácteres")
      .required("El nombre es requerido"),
    type: Yup.string().required("El tipo es requerido"),
    department: Yup.string().required("El departamento es requerido"),
    address: Yup.string()
      .min(5, "La dirección debe tener al menos 5 carácteres")
      .required("La dirección es requerida"),
  });

  const validationSchemaStepTwo = Yup.object({
    ruc: Yup.string()
      .notRequired()
      .test(
        "ruc-validation",
        "El RUC debe tener exactamente 11 dígitos",
        (value) => {
          if (!value) {
            return true; // Si el RUC no está declarado, se considera válido
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
    const matchProvinces = provinces[id_ubigeo as keyof typeof provinces];

    const formattedProvinces = matchProvinces.map((province) => ({
      value: province.id_ubigeo,
      label: province.nombre_ubigeo,
    }));

    formik.setFieldValue("province", null);
    formik.setFieldValue("district", null);

    setListProvinces(formattedProvinces);
  };

  const selectProvince = (province: string | undefined) => {
    const matchDistricts = districts[province as keyof typeof districts];

    const formattedDistricts = matchDistricts.map((district) => ({
      value: district.id_ubigeo,
      label: district.nombre_ubigeo,
    }));

    formik.setFieldValue("district", null);

    setListDistricts(formattedDistricts);
  };

  const businessTypes = [
    {
      value: 1,
      label: "Bodega",
    },
    {
      value: 2,
      label: "Puesto de mercado",
    },
    {
      value: 3,
      label: "Minimayorista",
    },
    {
      value: 4,
      label: "Mayorista",
    },
    {
      value: 5,
      label: "Gastronomía",
    },
    {
      value: 6,
      label: "Panificación",
    },
    {
      value: 7,
      label: "Limpieza",
    },
  ];

  const GastroSubtypes = [
    {
      value: 1,
      label: "Pollería",
    },
    {
      value: 2,
      label: "Menú",
    },
    {
      value: 3,
      label: "Chifa",
    },
    {
      value: 4,
      label: "Cevichería",
    },
    {
      value: 5,
      label: "Sanguichería",
    },
    {
      value: 6,
      label: "Catering",
    },
    {
      value: 7,
      label: "Hotel",
    },
  ];

  const PaniSubtypes = [
    {
      value: 1,
      label: "Panabodega",
    },
    {
      value: 2,
      label: "Panadería",
    },
    {
      value: 3,
      label: "Panificadora",
    },
    {
      value: 4,
      label: "Repostería",
    },
    {
      value: 5,
      label: "Pastelería",
    },
  ];

  const LimSubtypes = [
    {
      value: 1,
      label: "Industria",
    },
    {
      value: 2,
      label: "Services",
    },
    {
      value: 3,
      label: "Gastronomía",
    },
    {
      value: 4,
      label: "Panificación",
    },
  ];

  const typeToSubtypes: { [key: string]: SelectOption[] } = {
    Gastronomía: GastroSubtypes,
    Panificación: PaniSubtypes,
    Limpieza: LimSubtypes,
  };

  const selectStyles = {
    dropdownIndicator: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "#EF4444",
        "&:hover": {
          color: "#EF4444",
        },
      };
    },
    control: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        backgroundColor: "#F7F7F7",
        height: "3rem",
        borderRadius: "0.5rem",
        borderColor: "#E5E7EB",
        paddingLeft: "0.2rem",
      };
    },
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "lightgray",
      };
    },
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  useEffect(() => {
    const options = departments.map((department) => ({
      value: department.id_ubigeo,
      label: department.nombre_ubigeo,
    }));

    setDepartmentOptions(options);
  }, []);

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
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldError("name", "");
                    }}
                    type="text"
                    id="name"
                    className="text-sm border border-neutral-medium rounded-lg block w-full h-12 px-4 placeholder-gray-300 bg-neutral-light"
                    placeholder="Ingresa el nombre de tu negocio"
                    required
                  />

                  <ErrorFormMessage
                    message={
                      typeof formik.errors.name === "string" &&
                      !formik.touched.name
                        ? formik.errors.name
                        : undefined
                    }
                  />
                </div>

                <div>
                  <span className="block mb-1.5 font-semibold">
                    Tipo de negocio *
                  </span>
                  <Select
                    value={businessTypes.find(
                      (option) => option.value === formik.values.type
                    )}
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "type",
                        selectedOption ? selectedOption.label : ""
                      );
                      formik.setFieldError("type", "");
                    }}
                    options={businessTypes}
                    placeholder="Selecciona un tipo de negocio"
                    className="text-sm"
                    styles={selectStyles}
                  ></Select>
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
                ) && (
                  <div className="w-full">
                    <span className="block mb-1.5 font-semibold">
                      Giro de negocio *
                    </span>

                    <Select
                      value={typeToSubtypes[formik.values.type].find(
                        (option) => option.value === formik.values.subtype
                      )}
                      onChange={(selectedOption) => {
                        formik.setFieldValue(
                          "subtype",
                          selectedOption ? selectedOption.label : ""
                        );

                        formik.setFieldError("subtype", "");
                      }}
                      options={typeToSubtypes[formik.values.type]}
                      placeholder="Selecciona un tipo de negocio"
                      className="text-sm"
                      styles={selectStyles}
                    ></Select>

                    <ErrorFormMessage
                      message={
                        typeof formik.errors.subtype === "string"
                          ? formik.errors.subtype
                          : undefined
                      }
                    />
                  </div>
                )}

                <div className="w-full">
                  <span className="block mb-1.5 font-semibold">
                    Departamento *
                  </span>
                  <Select
                    value={departmentOptions.find(
                      (option) => option.value === formik.values.department
                    )}
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "department",
                        selectedOption ? selectedOption.label : ""
                      );
                      if (selectedOption) {
                        selectDepartment(selectedOption.value);
                      }

                      formik.setFieldValue("province", "");

                      formik.setFieldError("department", "");
                    }}
                    options={departmentOptions}
                    placeholder="Selecciona un departamento"
                    className="text-sm"
                    styles={selectStyles}
                  ></Select>
                  <ErrorFormMessage
                    message={
                      typeof formik.errors.department === "string"
                        ? formik.errors.department
                        : undefined
                    }
                  />
                </div>

                <div className="w-full">
                  <span className="block mb-1.5 font-semibold">Provincia</span>
                  <Select
                    value={
                      formik.values.province
                        ? listProvinces.find(
                            (option) => option.value === formik.values.province
                          )
                        : null
                    }
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "province",
                        selectedOption ? selectedOption.label : ""
                      );
                      selectProvince(selectedOption?.value);
                    }}
                    options={listProvinces}
                    placeholder="Selecciona una provincia"
                    className="text-sm"
                    styles={selectStyles}
                    isDisabled={!formik.values.department}
                  ></Select>
                </div>

                <div className="w-full">
                  <span className="block mb-1.5 font-semibold">Distrito</span>

                  <Select
                    value={
                      formik.values.district
                        ? listDistricts.find(
                            (option) => option.value === formik.values.district
                          )
                        : null
                    }
                    onChange={(selectedOption) => {
                      formik.setFieldValue(
                        "district",
                        selectedOption ? selectedOption.label : ""
                      );
                    }}
                    options={listDistricts}
                    placeholder="Selecciona un distrito"
                    className="text-sm"
                    styles={selectStyles}
                    isDisabled={!formik.values.province}
                  ></Select>
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
                    onChange={(e) => {
                      formik.handleChange(e);

                      formik.setFieldError("address", "");
                    }}
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
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;

                      if (e.target.value === "" || re.test(e.target.value)) {
                        formik.handleChange(e);
                      }

                      formik.setFieldError("ruc", "");
                    }}
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
                    Teléfono de contacto *
                  </label>
                  <input
                    value={formik.values.cellphone}
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;

                      if (e.target.value === "" || re.test(e.target.value)) {
                        formik.handleChange(e);
                      }

                      formik.setFieldError("cellphone", "");
                    }}
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
