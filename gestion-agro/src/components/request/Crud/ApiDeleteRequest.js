import React, { useEffect, useState } from 'react';
import axios from "axios";

// Definición de la función de solicitud de eliminación de la API
export const ApiDeleteRequest = (Url) => {
  // Obtener el token almacenado en el almacenamiento local
  const token = localStorage.getItem('token');
  
  // Crear un objeto de encabezados con el token si está disponible
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // Enviar una solicitud DELETE a la URL especificada
  axios.delete(Url, { headers })
    .then(response => {
      console.log('Registro eliminado con éxito');
    })
    .catch(error => {
      console.log('Error al eliminar el registro:', error);
    });
}
