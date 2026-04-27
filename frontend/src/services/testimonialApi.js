import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===================== TESTIMONIAL INVITES =====================

export const validateInviteToken = async (token) => {
  try {
    const response = await api.get(`/testimonials/invites/${token}`);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || 'Error validando token',
    };
  }
};

// ===================== TESTIMONIALS =====================

export const submitTestimonial = async (token, data) => {
  try {
    const response = await api.post(`/testimonials/${token}`, data);
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || 'Error enviando testimonio',
    };
  }
};

export const getApprovedTestimonials = async () => {
  try {
    const response = await api.get('/testimonials');
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || 'Error obteniendo testimonios',
    };
  }
};

export const createInvite = async (data, adminKey) => {
  try {
    const response = await api.post('/testimonials/invites', data, {
      headers: {
        'x-admin-key': adminKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating invite:', error.response || error);
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || 'Error creando invitación (Ver logs de consola)',
    };
  }
};

export default api;
