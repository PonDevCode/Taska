import { Box } from '@mui/system'
import React from 'react'
import Column from './column/Column'
import Button from '@mui/material/Button'
import AddchartIcon from '@mui/icons-material/Addchart';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
const LisColumns = ({ listColumn }) => {
    return (
        <SortableContext items={listColumn?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                height: '100%',
                width: '100%',
                bgcolor: 'inherit',
                display: 'flex',
                overflow: 'hidden',
                overflowX: 'auto',
                '&::-webkit-scrollbar-track': { m: 2 },
            }}>
                {listColumn.map((item, i) => {
                    return (
                        <Column column={item} key={i} />
                    )
                })}

                {/* ----- */}
                <Box
                    sx={{
                        minWidth: '200px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}
                >
                    <Button
                        startIcon={<AddchartIcon />}
                        sx={{
                            color: 'white',
                            width: '100%'
                        }}
                    >
                        Add new column
                    </Button>
                </Box>
            </Box>
        </SortableContext>
    )
}

export default LisColumns