import React, { useEffect, useState } from 'react';
import axios from "axios";

export const  ApiUpdateRequest = async (Url, data) => {

  console.log("Intentando updatear");
  axios.put(Url, data)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });


    }
