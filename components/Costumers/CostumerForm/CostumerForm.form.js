import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    document_number: "",
    birthdate: "",
    cellphone: "",
    email: "",
    business: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    document_number: Yup.string().required(true),
    birthdate: Yup.string().required(true),
    cellphone: Yup.number().required(true),
    email: Yup.string()
      .email("El correo electrónico es inválido")
      .required(true),
    business: Yup.string().required(true),
  });
}
