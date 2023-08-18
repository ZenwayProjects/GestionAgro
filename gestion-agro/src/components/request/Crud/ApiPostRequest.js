import React from 'react';
import axios from 'axios';

/**
 * Realiza una solicitud POST a la API.
 * @param {string} url - La URL a la que se realizará la solicitud.
 * @param {object} data - Los datos a enviar en la solicitud.
 * @returns {Promise<object>} - Una promesa que resuelve en un objeto con la respuesta de la solicitud.
 */
export const ApiPostRequest = async (url, data) => {
  const token = localStorage.getItem('token');
  console.log("el token: " + token);
  console.log(data);
  try {
  

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.post(url, data, { headers });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
