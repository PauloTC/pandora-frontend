import * as Yup from "yup";

export function initialValues() {
  return {
    publics: [],
    sample: "",
    locations: [],
    tool: "",
    tool_media: "",
  };
}

export function validationSchema() {
  return Yup.object({
    publics: Yup.array(),
    sample: Yup.string(),
    locations: Yup.array(),
    tool: Yup.string(),
    tool_media: Yup.string(),
  });
}
