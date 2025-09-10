import { Stack } from '@mui/system'
import React from 'react'
import { Avatar, Divider, Grow, MenuList, Paper, Popper, Tooltip } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice';
import { useConfirm } from 'material-ui-confirm';
import { Link } from 'react-router-dom';


const Proflies = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };


    const confirm = useConfirm();
    const dispacth = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const handleLogout = async () => {
        const { confirmed } = await confirm({
            title: 'Đăng Xuất',
            description: "Bạn thật sự muốn đăng xuất ?",
            confirmationText: "xác nhận",
            cancellationText: 'hủy',
            // confirmationKeyword: 'HUY'
        });

        if (confirmed) {
            dispacth(logoutUserAPI())
        }
    }
    return (
        <div>
            <Stack
                direction="row"
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : 'false'}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Tooltip title={`Hello ${currentUser.displayName}`}>
                    <Avatar alt="Remy Sharp" src={currentUser.avatar} sx={{ height: '32px', width: '32px' }} />
                </Tooltip>
            </Stack>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
                sx={{
                    paddingTop: '5px',
                    paddingRight: '10px',
                    zIndex: 2000,
                }}

            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <MenuList onClick={handleClose}>
                                <Link to="/settings/account">
                                    <MenuItem
                                        sx={{
                                            '&:hover': { color: 'success.light' }
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Avatar alt="Remy Sharp" src={currentUser.avatar} sx={{ height: '24px', width: '24px' }} />
                                        </ListItemIcon>
                                        <ListItemText>Profile</ListItemText>
                                    </MenuItem>
                                </Link>
                                <Divider />

                                <MenuItem>
                                    <ListItemIcon>
                                        <SettingsIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Setting</ListItemText>

                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <PersonAddIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Add Another Account</ListItemText>

                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '&:hover': {
                                            color: 'warning.dark',
                                            '& .logout-icon': {
                                                color: 'warning.dark',
                                            }

                                        },
                                    }}
                                    onClick={handleLogout}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon className='logout-icon' fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Log Out</ListItemText>
                                </MenuItem>
                            </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default Proflies