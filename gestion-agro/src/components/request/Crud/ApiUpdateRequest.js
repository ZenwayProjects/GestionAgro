import React, { useEffect, useState } from 'react';
import axios from "axios";

export const  ApiUpdateRequest = async (Url, data) => {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  console.log("Intentando updatear");
  axios.put(Url, data, {headers})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });


    }
