import React from 'react';
import DarkMode from './components/SelectDarkMode/DarkMode';
import { Box, Container } from '@mui/system';


function App() {
  return (
    <div>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main' }}>
        <Box sx={{
          backgroundColor: 'primary.light',
          width: '100%',
          height: (theme) => theme.taskaCustom.appBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}>
          <DarkMode />
        </Box>
        <Box sx={{
          backgroundColor: 'primary',
          width: '100%',
          height: (theme) => theme.taskaCustom.boorBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}>
          Bor bar</Box>
        <Box sx={{
          backgroundColor: 'primary.light',
          width: '100%',
          height: (theme) => `calc(100vh - ${theme.taskaCustom.appBarHeight} - ${theme.taskaCustom.boorBarHeight} )`,
          display: 'flex',
          alignItems: 'center'
        }}>
          box content
        </Box>
      </Container>
    </div>
  );
}

export default App;

