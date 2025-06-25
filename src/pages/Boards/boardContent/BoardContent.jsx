import React from 'react'
import { Box } from '@mui/system';

const BoardContent = () => {
  return (
    <div>
         <Box sx={{
          backgroundColor: 'secondary.main',
          width: '100%',
          height: (theme) => `calc(100vh - ${theme.taskaCustom.appBarHeight} - ${theme.taskaCustom.boorBarHeight} )`,
          display: 'flex',
          alignItems: 'center'
        }}>
          box content
        </Box>
    </div>
  )
}

export default BoardContent