import React from 'react';
import axios from 'axios';

/**
 * Realiza una solicitud GET a la API.
 * @param {string} url - La URL a la que se realizará la solicitud.
 * @param {object} params - Parámetros de consulta opcionales para la solicitud.
 * @returns {Promise<object>} - Una promesa que resuelve en un objeto con la respuesta de la solicitud.
 */
export const ApiGetRequest = async (url, params) => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')?.username;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(url, {
      params,
      headers,
    });

    const data = response.data;
    return { loading: false, data: data };
  } catch (error) {
    if (error.response && error.response.status === 401 && JSON.parse(localStorage.getItem('isLogged')) === true) {
      console.log(`Error 401 en ruta: ${url}`);
      localStorage.removeItem('token');
      localStorage.setItem('isLogged', JSON.stringify(false));
      // window.location.href = '/login';
    }

    console.error(error);
    return { loading: false, error: error.message };
  }
};
