import { apiClient } from "../../../services/apiClients";

export const projectApi = {
    getProject: () => apiClient.get('/projects'),
    postProject: (data) => apiClient.post('/projects', data),
}