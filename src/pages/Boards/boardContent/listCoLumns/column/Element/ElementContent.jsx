import React from 'react'
import Box from '@mui/system/Box';
import Card from '../Card/Card';
const ElementContent = () => {
    const COLUM_HEADER_HEIGHT = '50px';
    const COLUM_FOOTER_HEIGHT = '50px';
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: '0 5px',
            m: '0 10px',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.taskaCustom.BoardContentHeight} - 40px - ${COLUM_HEADER_HEIGHT} - ${COLUM_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar': { width: '8px', height: '8px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da', borderRadius: '8px', },
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#ced0da', borderRadius: '8px', cursor: 'pointer' }
        }}>
            <Card />
            <Card hiddenMedia/>
            <Card hiddenMedia />
            <Card />

        </Box>
    )
}

export default ElementContent