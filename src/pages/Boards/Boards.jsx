import React, { useEffect, useState } from 'react'
import { Container } from '@mui/system';
import AppBar from '~/components/appBar/AppBar';
import { BoardBar } from './boardBar/BoardBar';
import BoardContent from './boardContent/BoardContent';
// import { mockData } from '~/apis/mock-data';
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sort.js'
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  movecardToDiffentColumnAPI,
  deleteColumnDetailsAPI
} from '~/apis/axios';
import { Box } from '@mui/material';
const Boards = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardID = '6866a6b5081c2d5bcfd18216'
    fetchBoardDetailsAPI(boardID).then((board) => {
      // sắp sếp dữ liệu các column trc khi đưa xuống bên dưới
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)],
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (data) => {
    const createdColumn = await createNewColumnAPI({
      ...data,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)],
      createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    setBoard(newBoard)
  }
  const createNewCard = async (data) => {
    const createCard = await createNewCardAPI({
      ...data,
      boardId: board._id
    })
    // createCard.cards = [generatePlaceholderCard(createCard)],
    //   createCard.cardOrderIds = [generatePlaceholderCard(createCard)._id]

    const newBoard = { ...board }
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
    setBoard(newBoard)
  }
  const moveColumn = async (dndOrderedColumn) => {
    // update cho thuần dữ liệu state board
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }
  // kéo thẻ card trong cùng 1 column
  // chỉ cần gọi API để cập nhật mảng cardOrderIDs của column chứa nó (thây đổi vị trí trong mảng)
  const moveCardIntheSameColumn = async (dndOderedCard, dndOderedCardIds, columnId) => {
    const newBoard = { ...board }

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOderedCard
      columnToUpdate.cardOrderIds = dndOderedCardIds
    }
    setBoard(newBoard)

    await updateColumnDetailsAPI(columnId, { cardOrderIds: dndOderedCardIds })
  }
  // khi di chuyển card khác column 
  // b1: cập nhật mảng cardOrderIds của column ban đầu chứ nó ( hiểu bản chất là xóa đi cái _id của card ra khỏi mảng)
  // b2: cập nhật mảng cardOrderIds của column tiếp theo ( hiểu bản chất là thêm _id của card vào mãng ) 
  // b3: cập nhật lại trường columnId của cái card đã kéo 
  // => làm một API support riêng
  const moveCardDiffentColumn = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumn) => {

    // update cho thuần dữ liệu state board
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)


    // gọi API xử lý BE

    let prevCardOrderIds = dndOrderedColumn.find(c => c._id === prevColumnId)?.cardOrderIds

    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    movecardToDiffentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumn.find(c => c._id === nextColumnId)?.cardOrderIds,
    })
  }

  // xử lý 1 column và card bên trong nó
  const deleteColumnDetails = (columnId) => {
    console.log("🚀 ~ deleteColumnDetails ~ columnId:", columnId)

    // update cho thuần dữ liệu state board

    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)
    // xử lý phía backend

    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }

  if (!board) {
    return (
      <Box>loading</Box>
    )
  }
  return (
    <div>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar Board={board} />
        <BoardContent
          Board={board}

          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumn={moveColumn}
          moveCardIntheSameColumn={moveCardIntheSameColumn}
          moveCardDiffentColumn={moveCardDiffentColumn}
          deleteColumnDetails={deleteColumnDetails}
        />
      </Container>
    </div>
  )
}

export default Boards