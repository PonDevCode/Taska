import React from 'react'
import { useDarkMode } from '~/utils/statusDarkmode'
import { Box } from '@mui/system';
import ElementHeader from './Element/ElementHeader';
import ELementFooter from './Element/ELementFooter';
import ElementContent from './Element/ElementContent';
// import { mapOrder } from '~/utils/sort.js'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useConfirm } from "material-ui-confirm";
import { useState } from 'react'
import { toast } from 'react-toastify';

// import { generatePlaceholderCard } from '~/utils/formatter'
import { cloneDeep } from 'lodash';
import {
  updateCurrentActiveBoards,
  selectCurrentActiveBoard,
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNewCardAPI,
  deleteColumnDetailsAPI
} from '~/apis/axios';
const Column = ({ column }) => {

  const status = useDarkMode()
  const dispacth = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyle = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  };

  const [openCardCreateNew, setOpenCardCreateNew] = useState(false)
  const toggleOpenCard = () => setOpenCardCreateNew(!openCardCreateNew)
  const [valueCardCreate, setValueCardCreate] = useState('')
  const CreateCard = async () => {
    if (!valueCardCreate) {
      toast.error('Vui lòng nhập title card')
      return
    }
    const newCard = {
      title: valueCardCreate,
      columnId: column._id
    }

    const createCard = await createNewCardAPI({
      ...newCard,
      boardId: board._id
    })
    // createCard.cards = [generatePlaceholderCard(createCard)],
    //   createCard.cardOrderIds = [generatePlaceholderCard(createCard)._id]

    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(column => column._id === createCard.columnId)

    if (columnToUpdate) {

      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createCard]
        columnToUpdate.cardOrderIds = [createCard._id]

      } else {
        columnToUpdate.cards.push(createCard)
        columnToUpdate.cardOrderIds.push(createCard._id)
      }
    }
    dispacth(updateCurrentActiveBoards(newBoard))

    setValueCardCreate('')
    setOpenCardCreateNew(!openCardCreateNew)
  }
  const orderedArray = column.cards
  const confirm = useConfirm();
  // xử lý xóa 1 colum và card bên trong nó
  const handleDeleteColumn = async () => {
    const { confirmed } = await confirm({
      title: 'Xóa Column',
      description: "Hành Động Này Sẽ Xóa Vĩnh Viễn Column và Card Của Bạn Có chắc Chưa ?",
      confirmationText: "xác nhận",
      cancellationText: 'hủy',
      // confirmationKeyword: 'HUY'
    });

    if (confirmed) {
      
      const newBoard = cloneDeep(board)

      newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
      dispacth(updateCurrentActiveBoards(newBoard))

      // xử lý phía backend

      deleteColumnDetailsAPI(column._id).then(res => {
        toast.success(res?.deleteResult)
      })

    }
    // console.log(reason);

  }



  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
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
        <ElementHeader column={column} toggleOpenCard={toggleOpenCard} handleDeleteColumn={handleDeleteColumn} />
        <ElementContent cards={orderedArray} />
        <ELementFooter
          column={column}
          toggleOpenCard={toggleOpenCard}
          CreateCard={CreateCard}
          setValueCardCreate={setValueCardCreate}
          valueCardCreate={valueCardCreate}
          openCardCreateNew={openCardCreateNew}

        />
      </Box>
    </div>
  )
}

export default Column