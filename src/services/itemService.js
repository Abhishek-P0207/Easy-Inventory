import api from './api.js';

export const itemService = {
  // Get all items for a space
  getItemsBySpace: async (spaceId) => {
    const response = await api.get(`/items/space/${spaceId}`);
    return response.data;
  },

  // Get single item
  getItem: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  // Create new item
  createItem: async (itemData) => {
    const response = await api.post('/items', itemData);
    return response.data;
  },

  // Update item
  updateItem: async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  },

  // Update item quantity
  updateItemQuantity: async (id, quantity) => {
    const response = await api.patch(`/items/${id}/quantity`, { quantity });
    return response.data;
  },

  // Delete item
  deleteItem: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  }
}; 