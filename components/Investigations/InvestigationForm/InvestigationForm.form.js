import * as Yup from "yup";
import { format } from "date-fns";

export function initialValues(investigation = {}) {
  const { attributes = {} } = investigation;
  const {
    name = "",
    description = "",
    project = { data: { id: "" } },
    initial_date = "",
    teams = { data: [] },
    status = "en curso",
    investigation_types = { data: [] },
    researchers = { data: [] },
    service_team = { data: [] },
    team_extended = { data: [] },
    goal = "",
    specific_goals = "",
    guide_media_link = "",
    presented_to = "",
  } = attributes;

  return {
    name,
    description,
    project: project.data.id,
    initial_date: initial_date
      ? format(new Date(initial_date), "dd/MM/yyyy")
      : "",
    teams: teams.data.map((team) => ({
      value: team.id,
      label: team.attributes.name,
    })),
    scope: "",
    status,
    investigation_types: investigation_types.data.map((type) => ({
      value: type.id,
      label: type.attributes.name,
    })),
    researchers: researchers.data
      .filter((researcher) => researcher.attributes.role === "researcher")
      .map((researcher) => ({
        value: researcher.id,
        label: researcher.attributes.name,
      })),
    service_team: researchers.data
      .filter((researcher) => researcher.attributes.role === "service")
      .map((researcher) => ({
        value: researcher.id,
        label: researcher.attributes.name,
      })),
    team_extended: team_extended.data.map((extended) => ({
      value: extended.id,
      label: extended.attributes.name,
    })),
    goal,
    specific_goals,
    guide_media_link,
    presented_to,
    guide: "",
  };
}
export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string(),
    project: Yup.string(),
    teams: Yup.array(),
    scope: Yup.string(),
    status: Yup.string(),
    investigation_types: Yup.array(),
    researchers: Yup.array(),
    service_team: Yup.array(),
    team_extended: Yup.array(),
    goal: Yup.string(),
    specific_goals: Yup.string(),
    guide: Yup.string(),
    guide_media_link: Yup.string(),
    initial_date: Yup.string(),
    presented_to: Yup.string(),
  });
}
