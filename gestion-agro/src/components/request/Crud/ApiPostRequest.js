import React, { useEffect, useState } from 'react';
import axios from "axios";

export const  ApiPostRequest = async (Url, data) => {

  console.log(data);
   try {
  
      const res = await axios.post(Url, data)
      console.log(res.data)
    } catch (e) {
      alert(e)
    }



    }
