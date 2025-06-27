import React from 'react'
import { useDarkMode } from '~/utils/statusDarkmode'
import { Box } from '@mui/system';
import ElementHeader from './Element/ElementHeader';
import ELementFooter from './Element/ELementFooter';
import ElementContent from './Element/ElementContent';
import { mapOrder } from '~/utils/sort.js'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const Column = ({ column }) => {
  const status = useDarkMode()

  const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
  };


  const orderedArray = mapOrder(column.cards, column.cardOrderIds, '_id')


 
  return (

    <Box
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
      {...listeners}
      sx={{
        maxWidth: '300px',
        minWidth: '300px',
        bgcolor: status === 'dark' ? '#333643' : '#ebecf0',
        ml: 2,
        borderRadius: 2,
        height: 'fit-content',
        maxHeight: (theme) => `calc(${theme.taskaCustom.BoardContentHeight} - 40px)`
      }}
    >
      <ElementHeader column={column} />
      <ElementContent cards={orderedArray} />
      <ELementFooter />
    </Box>

  )
}

export default Column