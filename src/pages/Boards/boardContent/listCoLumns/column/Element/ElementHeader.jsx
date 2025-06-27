import React from 'react'
import { Box } from '@mui/system';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
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
import { useAnchorElement } from './HandlElement';
const ElementHeader = ({column}) => {

    
    const COLUM_HEADER_HEIGHT = '50px';
    const {anchorEl, open, handleClick, handleClose} = useAnchorElement()
    return (
        <div>
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
                    {column.title}
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
        </div>
    )
}

export default ElementHeader
