const API_BASE_URL = 'http://localhost:5000/api';

// Create axios-like API utility
const api = {
  // Helper method to make requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for session management
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    login: (credentials) => api.request('/auth/login', {
      method: 'POST',
      body: credentials,
    }),
    
    logout: () => api.request('/auth/logout', {
      method: 'POST',
    }),
    
    register: (userData) => api.request('/auth/register', {
      method: 'POST',
      body: userData,
    }),
    
    getProfile: () => api.request('/auth/profile'),
    
    checkAuth: () => api.request('/auth/check'),
  },

  // Testimonials endpoints
  testimonials: {
    getAll: () => api.request('/testimonials'),
    
    getById: (id) => api.request(`/testimonials/${id}`),
    
    create: (testimonialData) => api.request('/testimonials', {
      method: 'POST',
      body: testimonialData,
    }),
    
    update: (id, testimonialData) => api.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: testimonialData,
    }),
    
    delete: (id) => api.request(`/testimonials/${id}`, {
      method: 'DELETE',
    }),
  },

  // Courses endpoints
  courses: {
    getAll: () => api.request('/courses'),
    
    getById: (id) => api.request(`/courses/${id}`),
    
    create: (courseData) => api.request('/courses', {
      method: 'POST',
      body: courseData,
    }),
    
    update: (id, courseData) => api.request(`/courses/${id}`, {
      method: 'PUT',
      body: courseData,
    }),
    
    delete: (id) => api.request(`/courses/${id}`, {
      method: 'DELETE',
    }),
  },

  // Files endpoints
  files: {
    getAll: () => api.request('/files'),
    
    upload: (formData) => api.request('/files/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    }),
    
    delete: (id) => api.request(`/files/${id}`, {
      method: 'DELETE',
    }),
  },
};

export default api;
