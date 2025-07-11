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
const Column = ({ column, createNewCard, deleteColumnDetails }) => {

  const status = useDarkMode()

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
  const CreateColumn = async () => {
    if (!valueCardCreate) {
      toast.error('Vui lòng nhập title card')
      return
    }
    const newCard = {
      title: valueCardCreate,
      columnId: column._id
    }
    await createNewCard(newCard)
    setValueCardCreate('')
    setOpenCardCreateNew(!openCardCreateNew)
  }
  const orderedArray = column.cards
  const confirm = useConfirm();
  // xử lý xóa 1 colum và card bên trong nó
  const handleDeleteColumn = async () => {
    console.log(column._id);
    console.log(column.title);


    const { confirmed } = await confirm({
      title: 'Xóa Column',
      description: "Hành Động Này Sẽ Xóa Vĩnh Viễn Column và Card Của Bạn Có chắc Chưa ?",
      confirmationText: "xác nhận",
      cancellationText: 'hủy',
      // confirmationKeyword: 'HUY'
    });

    if (confirmed) {
      deleteColumnDetails(column._id)

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
          createNewCard={createNewCard}
          column={column}
          toggleOpenCard={toggleOpenCard}
          CreateColumn={CreateColumn}
          setValueCardCreate={setValueCardCreate}
          valueCardCreate={valueCardCreate}
          openCardCreateNew={openCardCreateNew}

        />
      </Box>
    </div>
  )
}

export default Column