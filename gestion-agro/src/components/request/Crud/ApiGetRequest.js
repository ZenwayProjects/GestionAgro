import React, { useEffect, useState } from 'react';
import axios from "axios";

export const ApiGetRequest = async (Url, params) => {

   try {
    const response = await axios.get(Url, {params});
    const data = response.data;
    return {loading:false, data:data};;
  } catch (error) {
    console.error(error);
  }
  }
  