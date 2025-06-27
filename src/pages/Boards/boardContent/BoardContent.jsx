import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import LisColumns from './listCoLumns/LisColumns';
import { mapOrder } from '~/utils/sort.js'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors

} from '@dnd-kit/core';
import { useDarkMode } from '~/utils/statusDarkmode'
import {
  arrayMove,
} from '@dnd-kit/sortable';
const BoardContent = ({ Board }) => {
  const status = useDarkMode()

  // const pointerSensor=useSensor(PointerSensor,{activationConstraint: {distance:10}})
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })


  // const sensor=useSensors(pointerSensor)
  const sensor = useSensors(mouseSensor, touchSensor)

  const [orderedArray, setOderedArray] = useState([])

  useEffect(() => {
    setOderedArray(mapOrder(Board.columns, Board.columnOrderIds, '_id'))
  }, [Board])



  const handleDragEnd = (event) => {
    console.log(event);


    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedArray.findIndex(c => c._id === active.id)
      const newIndex = orderedArray.findIndex(c => c._id === over.id)
      setOderedArray(arrayMove(orderedArray, oldIndex, newIndex))
    }

  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensor}>
      <Box sx={{
        backgroundColor: status === 'dark' ? '#2c3e50' : '  #18dcff',
        width: '100%',
        height: (theme) => theme.taskaCustom.BoardContentHeight,
        padding: '10px',
      }}>

        <LisColumns listColumn={orderedArray} />
      </Box>
    </DndContext>
  )
}

export default BoardContent