import React from 'react'
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
const Template = () => {
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
            <div>
                <Button
                    id="Template-basic"
                    aria-controls={open ? 'menu-Template' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : 'false'}
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ color: 'white' }}

                >
                    Templates
                </Button>
                <Menu
                    id="menu-Template"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                        list: {
                            'aria-labelledby': 'Template-basic',
                        },
                    }}
                >
                    <MenuItem>
                        <ListItemText > Chức Năng Đang Được Phát Triển</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Template