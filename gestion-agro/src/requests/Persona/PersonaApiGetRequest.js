import React, { useEffect, useState } from 'react';
import axios from "axios";

export const PersonaApiGetRequest = (Url) => {

  const [completeInfo, setCompleteInfo] = useState({loading:true , data:null});

  useEffect(() => {
     getInfo(Url);
       
},[Url])

const getInfo = async (Url) => {

  try {
    setCompleteInfo({loading:true, data:null})
    const response = await axios.get(Url);
    setCompleteInfo({loading:false, data:response.data})
   
  } catch (error) {
    console.log(error)
  }
}



    return completeInfo;
  }
