import React from 'react'
import Avt from '../../../assets/image/avt.png'
import { Box, Container } from '@mui/system';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import GridViewIcon from '@mui/icons-material/GridView';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { BoardData } from './constant';
import { Avatar, AvatarGroup, Button, Tooltip, useColorScheme, useMediaQuery } from '@mui/material';

const icon = {
    icon1: (
        <GridViewIcon sx={{ color: 'white' }} />
    ),
    icon2: (
        <VpnLockIcon sx={{ color: 'white' }} />
    ),
    icon3: (
        <AddToDriveIcon sx={{ color: 'white' }} />
    ),
    icon4: (
        <FilterDramaIcon sx={{ color: 'white' }} />
    )
}

export const BoardBar = () => {
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
    return (
        <div>
            <Box sx={{
                bgcolor: bgcl === 'dark' ? '#636e72' : '#18dcff',
                width: '100%',
                height: (theme) => theme.taskaCustom.BoardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
                justifyContent: 'space-between',
                paddingX: 2,
                gap: 2,
                overflow: 'hidden',
                overflowX: 'auto',
                borderBottom: 2,
                borderColor:'white'
            }}>
                <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', gap: 1 }}>
                    {
                        BoardData.map((item, i) => {
                            return (
                                <Tooltip title={item.title} key={i}>
                                    <Chip
                                        icon={icon[item.icon]}
                                        label={item.title}
                                        onClick={() => { }}
                                        sx={{
                                            height: 30,
                                            color: 'white',
                                            border: 'none',
                                            paddingX: '15px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            backgroundColor: 'transparent',
                                            '& .MuiSvgIcon-root': { color: 'white', fontSize: '14px' },
                                            "&:hover": { bgcolor: '#dfe6e9', color: 'black' },
                                            "&:hover .MuiSvgIcon-root": { color: 'black' }
                                        }}
                                    />
                                </Tooltip>
                            )
                        })
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        sx={{
                            height: 25,
                            color: 'white',
                            borderColor: 'white'
                        }}
                    >
                        Invite
                    </Button>
                    <AvatarGroup
                        total={24}
                        sx={{
                            '.MuiAvatar-root': {
                                height: 25,
                                width: 25,
                                border: 'none'
                            }
                        }}>
                        <Tooltip title="Pon Ham CHơi">
                            <Avatar alt="Remy Sharp" src={Avt} />
                        </Tooltip>
                    </AvatarGroup>
                </Box>
            </Box>
        </div>
    )
}
