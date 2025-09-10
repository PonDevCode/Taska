import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px'
        }}>
            <div>
                NotFound 404
            </div>
            <Link to="/">
                <Button
                    variant='outlined'
                >
                    go home
                </Button>
            </Link>

        </Box>
    )
}

export default NotFound