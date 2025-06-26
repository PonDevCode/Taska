import React from 'react'
import { Box, useMediaQuery } from '@mui/system';
import { Tooltip, useColorScheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
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

  const COLUM_HEADER_HEIGHT = '50px';
  const COLUM_FOOTER_HEIGHT = '50px';

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  return (
      <Box sx={{
        backgroundColor: bgcl === 'dark' ? '#2c3e50' : '  #18dcff',
        width: '100%',
        height: (theme) => theme.taskaCustom.BoardContentHeight,
          padding: '10px',

      }}>
        <Box sx={{
          height: '100%',
          width: '100%',
          bgcolor: 'inherit',
          display: 'flex',
          overflow: 'hidden', 
          overflowX: 'auto',
          '&::-webkit-scrollbar-track': {m:2},
        }}>
          {/*---- Box colums-----  */}
          <Box sx={{
            maxWidth: '300px',
            minWidth: '300px',
            bgcolor: bgcl === 'dark' ? '#333643' : '#ebecf0',
            ml: 2,
            borderRadius: 2,
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.taskaCustom.BoardContentHeight} - 40px)`
          }}>
            {/* --- Box columm header ---- */}
            <Box sx={{
              height: COLUM_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Column Title
              </Typography>
              <Box>
                <div>
                  <Tooltip title="dropDown Column">
                    <KeyboardArrowDownIcon
                      sx={{
                        color: 'text.primary',
                        cursor: 'pointer'
                      }}
                      id="column-basic-dropdown"
                      aria-controls={open ? 'menu-dropdown-column' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : 'false'}
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}

                    />
                  </Tooltip>
                  <Menu
                    id="menu-dropdown-column"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'column-basic-dropdown',
                      },
                    }}
                    sx={{ color: 'white' }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                      <ListItemText>App new card</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                      <ListItemText>Cut</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                      <ListItemText>Copy</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                      <ListItemText>Paste</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                      <ListItemText>Remove this column</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                      <ListItemText>Archive this column</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              </Box>
            </Box>
            {/* ----------------------- */}
            {/* ---- Box list card ---- */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: '0 5px',
              m: '0 5px',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(${theme.taskaCustom.BoardContentHeight} - 40px - ${COLUM_HEADER_HEIGHT} - ${COLUM_FOOTER_HEIGHT})`,
              '&::-webkit-scrollbar': {width: '8px',height: '8px'},
              '&::-webkit-scrollbar-thumb': {backgroundColor: '#ced0da',borderRadius: '8px',},
              '&::-webkit-scrollbar-thumb:hover': {backgroundColor: '#ced0da',borderRadius: '8px',cursor: 'pointer'}
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRayDbJyMHa1vPbQmDhqAsJgESSAEuyXMTCJA&s"
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >PonDevCode</Typography>
                </CardContent>
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                  <Button size="small" startIcon={<GroupIcon />}>20</Button>
                  <Button size="small" startIcon={<CommentIcon />}>10</Button>
                  <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
                </CardActions>
              </Card>


              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >Card</Typography>
                </CardContent>

              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >Card</Typography>
                </CardContent>

              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >Card</Typography>
                </CardContent>

              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >Card</Typography>
                </CardContent>

              </Card>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >Card</Typography>
                </CardContent>

              </Card>



            </Box>
            {/* ----- Box column footer ------ */}
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
          </Box>
          {/*---- Box colums-----  */}
          <Box sx={{
            maxWidth: '300px',
            minWidth: '300px',
            bgcolor: bgcl === 'dark' ? '#333643' : '#ebecf0',
            ml: 2,
            borderRadius: 2,
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.taskaCustom.BoardContentHeight} - 40px)`
          }}>
            {/* --- Box columm header ---- */}
            <Box sx={{
              height: COLUM_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Column Title
              </Typography>
              <Box>
                <div>
                  <Tooltip title="dropDown Column">
                    <KeyboardArrowDownIcon
                      sx={{
                        color: 'text.primary',
                        cursor: 'pointer'
                      }}
                      id="column-basic-dropdown"
                      aria-controls={open ? 'menu-dropdown-column' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : 'false'}
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}

                    />
                  </Tooltip>
                  <Menu
                    id="menu-dropdown-column"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'column-basic-dropdown',
                      },
                    }}
                    sx={{ color: 'white' }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                      <ListItemText>App new card</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                      <ListItemText>Cut</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                      <ListItemText>Copy</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                      <ListItemText>Paste</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                      <ListItemText>Remove this column</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                      <ListItemText>Archive this column</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              </Box>

            </Box>

            {/* ---- Box list card ---- */}

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: '0 5px',
              m: '0 5px',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(${theme.taskaCustom.BoardContentHeight} - 40px - ${COLUM_HEADER_HEIGHT} - ${COLUM_FOOTER_HEIGHT})`,
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da',
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#ced0da',
                borderRadius: '8px',
                cursor: 'pointer'
              }
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography >Card</Typography>
                </CardContent>

              </Card>
              


            </Box>


            {/* ----- Box column footer ------ */}

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

          </Box>
        </Box>

      </Box>
  )
}

export default BoardContent