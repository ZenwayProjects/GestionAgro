import React, { useEffect, useState } from 'react';
import axios from "axios";

export const PersonaApiDeleteRequest = (Url) => {


 
        axios.delete(Url)
          .then(response => {
            console.log('Registro eliminado con éxito');
          })
          .catch(error => {
            console.log(error);
          });
      
  


    }

