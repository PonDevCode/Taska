import React from 'react'
import { Box, useMediaQuery } from '@mui/system';
import {  useColorScheme } from '@mui/material';
import ElementHeader from './Element/ElementHeader';
import ELementFooter from './Element/ELementFooter';
import ElementContent from './Element/ElementContent';
const Column = () => {
  const { mode } = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


  let bgcl = ''
  if (mode === 'dark') {
    bgcl = 'dark'
  } else if (mode === 'light') {
    bgcl = 'light'
  } else {
    if (prefersDarkMode) {
      bgcl = 'dark'
    } else {
      bgcl = 'light'
    }
  }
  return (

    <Box sx={{
      maxWidth: '300px',
      minWidth: '300px',
      bgcolor: bgcl === 'dark' ? '#333643' : '#ebecf0',
      ml: 2,
      borderRadius: 2,
      height: 'fit-content',
      maxHeight: (theme) => `calc(${theme.taskaCustom.BoardContentHeight} - 40px)`
    }}>
      <ElementHeader />
      <ElementContent />
      <ELementFooter />
    </Box>

  )
}

export default Column