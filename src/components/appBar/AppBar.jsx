import React, { useState } from 'react'
import { Box, InputAdornment, Typography } from '@mui/material';
import DarkMode from '../SelectDarkMode/DarkMode'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import WorkSpaces from './menus/WorkSpaces';
import Recent from './menus/Recent';
import Starrted from './menus/Starred';
import Template from './menus/Template';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Avata from './menus/Avatar';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useDarkMode } from '~/utils/statusDarkmode';
const AppBar = () => {
  const status = useDarkMode()
  const [textSeach, setTextSeach] = useState('')
 
  return (
    <div>
      <Box sx={{
        bgcolor: status === 'dark' ? '#2c3e50' :'  #17c0eb',
        width: '100%',
        height: (theme) => theme.taskaCustom.AppBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '15px',
        paddingRight: '15px',
        gap: 1,
        overflow: 'hidden',
        overflowX: 'auto',
      }}>
        <Box sx={{ color: 'white', display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
          <PictureInPictureIcon />
          <Typography sx={{ color: 'white' }} >Taska</Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpaces  />
            <Recent />
            <Starrted />
            <Template />
            <Button
              variant="outlined"
              startIcon={<AddToPhotosIcon />}
              sx={{
                color: 'white',
                border: 'none',
                '&:hover': { border: 'none' }
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box sx={{ color: 'white', display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '15px', height: 40 }}>
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            size="small"
            autoComplete="off"
            value={textSeach}
            onChange={(e) => { setTextSeach(e.target.value) }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonSearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: 'transparent',
              minWidth: 120,
              maxWidth: 170,
              '.outlined-search': {
                backgroundColor: 'none'
              },
              '& .MuiOutlinedInput-root': {
                color: 'white',
           
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover':{
                  cursor: 'pointer'
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: 'white',
                },
              },
            }}
          />

          <DarkMode />
          <Tooltip title="Notification">
            <Badge color="primary" badgeContent={100} sx={{ cursor: 'pointer' }}>
              <NotificationsIcon />
            </Badge>
          </Tooltip>
          <HelpOutlineIcon />
          <Avata />
        </Box>
      </Box>
    </div>
  )
}

export default AppBar