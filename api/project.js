import { ENV } from "@/utils";

export class Project {
  async getProjects() {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.PROJECTS}?populate=*`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async filterProjects(projectName) {
    try {
      const populateInvestigation =
        "populate[1]=investigations&populate[2]=investigations.materials&populate[3]=investigations.materials.publics&populate[4]=investigations.materials.locations&populate[5]=investigations.researchers.photo&populate[6]=investigations.project";

      const filter = `filters[name][$eq]=${projectName}&${populateInvestigation}`;

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.PROJECTS}?${filter}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
