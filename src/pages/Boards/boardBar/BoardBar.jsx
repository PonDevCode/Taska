import React from 'react'
import { Box, Container } from '@mui/system';

export const BoardBar = () => {
    return (
        <div>
            <Box sx={{
                backgroundColor: 'secondary.main',
                width: '100%',
                height: (theme) => theme.taskaCustom.boorBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center'
            }}>
                Bor bar

            </Box>
        </div>
    )
}
