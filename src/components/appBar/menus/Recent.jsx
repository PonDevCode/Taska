import React from 'react'
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

const Recent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button
                id="recent-basic"
                aria-controls={open ? 'menu-recent' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : 'false'}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ color: 'white' }}

            >
                Rencent
            </Button>
            <Menu
                id="menu-Recent"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'recent-basic',
                    },
                }}
            >
                <MenuItem>
                    <ListItemText > Chức Năng Đang Được Phát Triển</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Recent