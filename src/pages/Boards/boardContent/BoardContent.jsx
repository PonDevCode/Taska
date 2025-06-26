import React from 'react'
import { Box, useMediaQuery } from '@mui/system';
import { useColorScheme } from '@mui/material';
import LisColumns from './listCoLumns/LisColumns';
const BoardContent = () => {
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
      backgroundColor: bgcl === 'dark' ? '#2c3e50' : '  #18dcff',
      width: '100%',
      height: (theme) => theme.taskaCustom.BoardContentHeight,
      padding: '10px',

    }}>

      <LisColumns />
    </Box>
  )
}

export default BoardContent