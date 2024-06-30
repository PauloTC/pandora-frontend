import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    type: "",
    subtype: "",
    district: "",
    address: "",
    social_reason: "",
    ruc: "",
    cellphone: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    type: Yup.string().required("El tipo es requerido"),
    subtype: Yup.string().required("El griro del negocio es requerido"),
    district: Yup.string(),
    address: Yup.string(),
    social_reason: Yup.string().required("La razón social es requerida"),
    ruc: Yup.string().required("El RUC es requerido"),
    cellphone: Yup.string().required("El celular es requerido"),
  });
}
