import { apiClient } from "../../../services/apiClients";

export const authApi = {
    login: (data) => apiClient.post('/auth/login', data),
    register: (data) => apiClient.post('/auth/register', data),
};