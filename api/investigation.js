import { ENV } from "@/utils";

export class Investigation {
  async createInvestigation(data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
          },
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      // Obtener la investigación creada
      const createdInvestigation = await this.getInvestigation(
        result.data.attributes.slug
      );

      return createdInvestigation;
    } catch (error) {
      throw error;
    }
  }

  async getInvestigations() {
    try {
      const populateInvestigation =
        "&populate[1]=researchers.photo&populate[2]=materials&populate[3]=materials.locations&populate[4]=materials.publics&populate[5]=project";

      const sortInvestigation = "sort[0]=initial_date:desc";

      const pagination = `&pagination[page]=1&pagination[pageSize]=9`;

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}?${sortInvestigation}${populateInvestigation}${pagination}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getInvestigation(slug) {
    const filter = `filters[slug][$eq]=${slug}`;

    const populateInvestigation =
      "populate[0]=researchers.photo&populate[1]=publics&populate[2]=investigation_types&populate[3]=locations&populate[4]=insights&populate[5]=guide_media&populate[6]=media&populate[7]=teams&populate[8]=team_extended&populate[9]=team_extended.photo&populate[10]=materials&populate[11]=materials.publics&populate[12]=materials.locations&populate[13]=project&populate[14]=materials.investigation&populate[15]=materials.investigation.investigation_types";

    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}?${filter}&${populateInvestigation}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async updateInvestigation(id, data) {
    try {
      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}/${id}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
          },
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      // Obtener la investigación actualizada
      const updatedInvestigation = await this.getInvestigation(
        result.data.attributes.slug
      );

      return updatedInvestigation;
    } catch (error) {
      throw error;
    }
  }

  async filterInvestigations(filters) {
    console.log(
      "🚀 ~ Investigation ~ filterInvestigations ~ filters:",
      filters
    );
    const {
      project,
      objectivePublic,
      objetiveResearcher,
      sort = "desc",
      pagination,
      search,
      status,
    } = filters;

    let filter = ``;

    // Si objectivePublic existe, agregarlo al filtro
    if (objectivePublic) {
      filter += `&filters[materials][publics][name][$in][0]=${objectivePublic}`;
    }

    if (status) {
      filter += `&filters[status][$eq]=${status}`;
    }

    if (objetiveResearcher) {
      filter += `&filters[researchers][id][$eq]=${objetiveResearcher}`;
    }

    if (pagination) {
      filter += `&pagination[page]=${pagination.page}&pagination[pageSize]=9`;
    }

    if (project) {
      filter += `&filters[project][name][$eq]=${project}`;
    }

    if (search) {
      filter += `&filters[name][$contains]=${search}`;
    }

    try {
      const populateInvestigation =
        "populate[0]=researchers.photo&populate[1]=materials&populate[2]=materials.locations&populate[3]=materials.publics&populate[4]=project";

      const sortInvestigation = `sort[0]=initial_date:${sort}`;

      const url = `${ENV.API_URL}${ENV.ENDPOINTS.INVESTIGATIONS}?${filter}&${populateInvestigation}&${sortInvestigation}`;

      const response = await fetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
