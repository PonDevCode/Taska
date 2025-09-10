import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loading({caption}) {
  return (
    <Box sx={{  width: '100%',height: '100vh',display: 'flex' ,gap: '10px',alignItems: 'center',justifyContent:'center'}}>
      <CircularProgress /> <Typography>{caption}</Typography>
    </Box>
  );
}