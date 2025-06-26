import { Box } from '@mui/system'
import React from 'react'
import Column from './column/Column'

const LisColumns = () => {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            bgcolor: 'inherit',
            display: 'flex',
            overflow: 'hidden',
            overflowX: 'auto',
            '&::-webkit-scrollbar-track': { m: 2 },
        }}>
            <Column />
            <Column />

        </Box>
    )
}

export default LisColumns