import api from "./http";

export const getProjects = async (tenantId) => {
  const response = await api.get(`/tenants/${tenantId}/projects`);
  return response.data;
};

export const createProject = async (tenantId, form) => {
  const response = await api.post(`/tenants/${tenantId}/projects`, form);
  return response.data;
};
