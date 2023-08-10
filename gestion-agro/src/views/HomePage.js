import React, { useEffect, useState } from 'react';
import { subDays, subHours } from 'date-fns';
import { Box, Button, Container, Unstable_Grid2 as Grid } from '@mui/material';
import AppBarComponent from "../components/layouts/AppBarComponent";
import Paperbase from '../components/common/Paperbase';
import { io } from 'socket.io-client';



export default function HomePage() {




  return (
    <>
      <Paperbase  />
      
    </>
  );
}