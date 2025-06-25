
import React from 'react'
import { Box, Typography } from '@mui/material';
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


const AppBar = () => {


  return (
    <div>
      <Box sx={{
        backgroundColor: 'secondary.main',
        width: '100%',
        height: (theme) => theme.taskaCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '15px',
        paddingRight: '15px',
        gap: 1,
          overflowX:'auto',
          overflowY:'none',

       
      }}>
        <Box sx={{ color: 'primary.main', display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
          
            <PictureInPictureIcon />
            <Typography sx={{ color: 'secondary' }} >Taska</Typography>
    
          <Box sx={{display:{xs:'none', md:'flex'}, gap: 1}}>
            <WorkSpaces />
            <Recent />
            <Starrted />
            <Template />
            <Button variant="outlined" color='primary'>Create</Button>
          </Box>
        </Box>
        <Box sx={{ color: 'primary.main', display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '15px' }}>
          <TextField id="outlined-search" label="Search" type="search" size='small' sx={{minWidth:120}} />
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