import React from 'react'

import { Box, Container } from '@mui/system';
import Chip from '@mui/material/Chip';
import GridViewIcon from '@mui/icons-material/GridView';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import { BoardData } from './constant';
import {  Tooltip } from '@mui/material';
import { capitalizeFirstLetter } from '~/utils/formatter'
import { useDarkMode } from '~/utils/statusDarkmode';
import BoardUserGroup from './BoardUserGroup';
import InviteBoardUser from './InviteBoardUser';
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

export const BoardBar = (board) => {

    const status = useDarkMode()
    console.log();
    
    return (
        <div>
            <Box sx={{
                bgcolor: status === 'dark' ? '#636e72' : '#18dcff',
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

            }}>
                <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', gap: 1 }}>
                    <Tooltip title={board?.Board?.title} >
                        <Chip
                            icon={<GridViewIcon sx={{ color: 'white' }} />}
                            label={capitalizeFirstLetter(board?.Board?.title)}
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
                    <Tooltip title={board?.Board?.type} >
                        <Chip
                            icon={<VpnLockIcon sx={{ color: 'white' }} />}
                            label={capitalizeFirstLetter(board?.Board?.type)}
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
                    {
                        BoardData.map((item, i) => {
                            return (
                                <Tooltip title={item.title} key={i}>
                                    <Chip
                                        icon={icon[item.icon]}
                                        label={capitalizeFirstLetter(item?.title)}
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
                    <InviteBoardUser boardId={board.Board._id} />
                    {/* sử lý hiển thị thành viên của gruop */}
                    <BoardUserGroup boardUsers={board.Board.FE_allUsers} />
                </Box>
            </Box>
        </div>
    )
}





