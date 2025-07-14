import api from './api.js';

export const spaceService = {
  // Get all spaces
  getAllSpaces: async () => {
    const response = await api.get('/spaces');
    return response.data;
  },

  // Get single space
  getSpace: async (id) => {
    const response = await api.get(`/spaces/${id}`);
    return response.data;
  },

  // Create new space
  createSpace: async (spaceData) => {
    const response = await api.post('/spaces', spaceData);
    return response.data;
  },

  // Update space
  updateSpace: async (id, spaceData) => {
    const response = await api.put(`/spaces/${id}`, spaceData);
    return response.data;
  },

  // Delete space
  deleteSpace: async (id) => {
    const response = await api.delete(`/spaces/${id}`);
    return response.data;
  }
}; 