import  Tooltip  from '@mui/material/Tooltip';
import  Button  from '@mui/material/Button';
import  Box  from '@mui/material/Box';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import AddCardIcon from '@mui/icons-material/AddCard';

import React from 'react'

const ELementFooter = () => {
    const COLUM_FOOTER_HEIGHT = '50px';
  return (
      <Box sx={{
              height: COLUM_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon />}>Add new cart</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon />
              </Tooltip>
            </Box>
  )
}

export default ELementFooter