import React from 'react'
import Box from '@mui/system/Box';
import Card from '../Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
const ElementContent = ({ cards}) => {

    const COLUM_HEADER_HEIGHT = '50px';
    const COLUM_FOOTER_HEIGHT = '50px';
    return (
        <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
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
                {
                    cards.map((card, i) => {
                        {
                            return (
                                <Card card={card}  key={i} />
                            )
                        }
                    })
                }
            </Box>
        </SortableContext>
    )
}

export default ElementContent