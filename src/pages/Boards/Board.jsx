import React, { useEffect } from 'react'
import { Container } from '@mui/system';
import AppBar from '~/components/appBar/AppBar';
import { BoardBar } from './boardBar/BoardBar';
import BoardContent from './boardContent/BoardContent';
import { useParams } from 'react-router-dom'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoards,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import { useDispatch, useSelector } from 'react-redux'

import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  movecardToDiffentColumnAPI,
} from '~/apis/axios';
import { cloneDeep } from 'lodash';
import Loading from '~/components/Loading/Loading';
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard';

const Board = () => {
  const dispacth = useDispatch()
  // không dùng state của components nữa mà chuyển qua đung state của redux
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()
  useEffect(() => {
    dispacth(fetchBoardDetailsAPI(boardId))
  }, [dispacth, boardId])
  
  
  const moveColumn = async (dndOrderedColumn) => {
    // update cho thuần dữ liệu state board
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = cloneDeep(board)

    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispacth(updateCurrentActiveBoards(newBoard))
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }
  
  // kéo thẻ card trong cùng 1 column
  // chỉ cần gọi API để cập nhật mảng cardOrderIDs của column chứa nó (thây đổi vị trí trong mảng)
  const moveCardIntheSameColumn = async (dndOderedCard, dndOderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOderedCard
      columnToUpdate.cardOrderIds = dndOderedCardIds
    }
    dispacth(updateCurrentActiveBoards(newBoard))


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
    const newBoard = cloneDeep(board)

    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds
    dispacth(updateCurrentActiveBoards(newBoard))



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

  if (!board) {
    return (
      <Loading caption={'loading .....'} />
    )
  }
  return (
    <div>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        {/* model active card , cheack đóng mở dựa theo diều kiện có tồn tại data activeCard lưu trong Redux 
         hay không thì mới render , mỗi thời điểm chỉ tồn tại một cái model card đang active 
       */}
         <ActiveCard />
        {/* các thành phần còn lại của board detail */}
        <AppBar />
        <BoardBar Board={board} />
        <BoardContent
          Board={board}
          moveColumn={moveColumn}
          moveCardIntheSameColumn={moveCardIntheSameColumn}
          moveCardDiffentColumn={moveCardDiffentColumn}
        />
      </Container>
    </div>
  )
}

export default Board