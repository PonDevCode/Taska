import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system';
import LisColumns from './listCoLumns/LisColumns';
// import { mapOrder } from '~/utils/sort.js'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter

} from '@dnd-kit/core';

import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensor'
import Column from './listCoLumns/column/Column';
import Card from './listCoLumns/column/Card/Card';
import { useDarkMode } from '~/utils/statusDarkmode'
import {
  arrayMove,
} from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

const BoardContent = ({
  Board,
  createNewColumn,
  createNewCard,
  moveColumn,
  moveCardIntheSameColumn,
  moveCardDiffentColumn,
  deleteColumnDetails
}) => {
  const status = useDarkMode()
  //cập nhật lại vị trí 
  const [orderedColumn, setOderedColumn] = useState([])
  useEffect(() => {
    //Đổi thứ tự vị trí column trong mãng Board theo thứ tự vị trí columnOderIds
    setOderedColumn(Board.columns)
  }, [Board])



  //Dữ liệu item đang kéo cùng 1 thời điểm chỉ có 1 phần tử đang được kéo column or card
  const [activeDragItemID, setActiveDragItemID] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  //Dữ liệu column củ trước khi kéo thả
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng dùng để xử lý thuộc toán phát hiện va chạm
  const lastOverId = useRef(null)

  // cảm ứng cấu hình theo dnd kit
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensor = useSensors(mouseSensor, touchSensor)


  // Tìm column đang chứa cái CardID
  const findColumnByCardId = (CardId) => {
    return orderedColumn.find(column => column?.cards.map(card => card._id).includes(CardId)) // nếu có return column đó không thì udefined
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOderedColumn(prevColumn => {
      // Tìm vị trí index card mới thả vào 
      // overCardIndex vị trí index card mới vửa thả vào column mới
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Thuật toán dnd kit lấy ra cardIndex mới
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      // vị trí card mới
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

      // clone mảng oderedColumn ra một cái mới để xử lý data rồi return -> cập nhật lại
      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // column cũ
      if (nextActiveColumn) {
        // xóa card ở column cũ
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // cập nhật lại mãng cardOderIds 
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      // column mới
      if (nextOverColumn) {
        // kiểm tra card có tồn tại trong overColumn chh nếu có thì xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // thêm cái card đang kéo vào column theo vị trí index mới
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // cập nhận lại mãng oder chuẩn đữ liệu 
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      // nếu function này được gọi từ handleDragEnd nghĩa là đã kéo thả xong , lúc này mới gọi APIs  1 lần ở đây

      console.log('triggerFrom', triggerFrom);
      // if (triggerFrom !== 'handleDragEnd') return prevColumn;
      if (triggerFrom === 'handleDragEnd') {


        moveCardDiffentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns
        )
      }
      return nextColumns

    })
  }

  // xử lý hành động bắt đầu kéo 
  const handleDragStart = (event) => {
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemID(event?.active?.id)
    setActiveDragItemData(event?.active?.data?.current)
    // nếu kếu card mới set data
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  // xử lý hành động trong quá trình kéo 
  const handleDragOver = (event) => {
    // kéo column ko sử lý
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    // không tồn tại active, over return luôn tránh crash trang web
    if (!active || !over) return
    //activeDraggingCardId: là Id card dang kéo , activeDraggingCardData : là data card đag kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overcardId là cái card dang tương tác
    const { id: overCardId } = over

    // Tìm 2 cái column theo cardId 
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // xử khi 2 column khác nhau
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }
  // xử lý hành động kết thúc kéo 
  const handleDragEnd = (event) => {

    const { active, over } = event
    // không tồn tại active, over return luôn tránh crash trang web
    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      //activeDraggingCardId: là Id card dang kéo , activeDraggingCardData : là data card đag kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overcardId là cái card dang tương tác
      const { id: overCardId } = over
      // Tìm 2 cái column theo cardId 
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return
      // kéo card 2 column khác nhau

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
        // kéo card cùng column
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(c => c._id === activeDragItemID)
        console.log('oldCardIndex', oldCardIndex);

        const newCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(c => c._id === overCardId)
        console.log('newCardIndex', newCardIndex);

        const dndOderedCard = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOderedCardIds = dndOderedCard.map(card => card._id)

        setOderedColumn(prevColumn => {
          const nextColumns = cloneDeep(prevColumn)
          const tarrgetColumn = nextColumns.find(card => card._id === overColumn._id)
          tarrgetColumn.cards = dndOderedCard
          tarrgetColumn.cardOrderIds = dndOderedCardIds
          return nextColumns

        })
        moveCardIntheSameColumn(dndOderedCard, dndOderedCardIds, oldColumnWhenDraggingCard._id)
      }

    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumn.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumn.findIndex(c => c._id === over.id)
        const dndOrderedColumn = arrayMove(orderedColumn, oldColumnIndex, newColumnIndex)
        moveColumn(dndOrderedColumn)
        setOderedColumn(dndOrderedColumn)
      }
    }
    setActiveDragItemType(null)
    setActiveDragItemID(null)
    setActiveDragItemData(null)

  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }),
  };

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    // tìm các điểm giao nhau va chạm với intersection với con trỏ
    const pointerIntersection = pointerWithin(args)
    // thuật toán phát hiện va chạm sẽ chả về 1 mảng các va chạm ở đây
    const intersection = pointerIntersection.length > 0
      ? pointerIntersection
      : rectIntersection(args)

    // tìm overId đầu tiên trong đám intersection ở trên
    let overId = getFirstCollision(intersection, 'id');
    if (overId) {

      const checkColumn = orderedColumn.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id == !overId) && (checkColumn?.cardOrderIds.includes(container.id))
          })
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }
    // nếu overID là null thì trả về mảng rỗng - tránh bug crash trang
    return lastOverId.current ? [{ id: lastOverId.current }] : []

  }, [activeDragItemType])



  return (
    <DndContext
      sensors={sensor}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}

      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        backgroundColor: status === 'dark' ? '#2c3e50' : '  #18dcff',
        width: '100%',
        height: (theme) => theme.taskaCustom.BoardContentHeight,
        padding: '10px',
      }}>

        <LisColumns
          listColumn={orderedColumn}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemID || !activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>

    </DndContext>
  )
}

export default BoardContent