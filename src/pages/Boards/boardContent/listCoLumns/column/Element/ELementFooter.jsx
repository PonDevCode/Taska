import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import AddCardIcon from '@mui/icons-material/AddCard';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { TextField } from '@mui/material';
// import { toast } from 'react-toastify';
const ELementFooter = ({ toggleOpenCard, valueCardCreate, setValueCardCreate, CreateCard, openCardCreateNew }) => {
  const COLUM_FOOTER_HEIGHT = '50px';

  // const [openCardCreateNew, setOpenCardCreateNew] = useState(false)
  // const toggleOpenCard = () => setOpenCardCreateNew(!openCardCreateNew)
  // const [valueCardCreate, setValueCardCreate] = useState('')
  // const CreateColumn = async () => {
  //       if(!valueCardCreate){
  //           toast.error('Vui lòng nhập title card')
  //           return
  //       }
  //       const newCard = {
  //         title: valueCardCreate,
  //         columnId : column._id
  //       }
  //       await createNewCard(newCard)
  //       setValueCardCreate('')
  //       setOpenCardCreateNew(!openCardCreateNew)
  //   }
  return (
    <Box sx={{
      height: COLUM_FOOTER_HEIGHT,
      p: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {
        !openCardCreateNew
          ?
          <>
            <Button startIcon={<AddCardIcon />} onClick={toggleOpenCard}>Add new cart</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon />
            </Tooltip>
          </>

          :
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <TextField
              id="outlined-search"
              label="Create Card column"
              type="search"
              size="small"
              autoFocus
              autoComplete="off"
              data-no-dnd="true"
              value={valueCardCreate}
              onChange={(e) => { setValueCardCreate(e.target.value) }}
              sx={{
                backgroundColor: 'transparent',
                minWidth: 120,
                maxWidth: 170,
                '.outlined-search': { backgroundColor: 'none' },
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover': { cursor: 'pointer' },
                  '&:hover fieldset': { borderColor: 'white', },
                  '&.Mui-focused': {
                    color: 'white',
                    '& fieldset': { borderColor: 'white', },
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                  '&.Mui-focused': { color: 'white', },
                },
              }}
            />
            <Button
              className='interceptor-loading'
              variant='contained' color='success'
              sx={{
                boxShadow: 'none',
                fontSize: '12px',
                '&:hover': { bgcolor: (theme) => theme.palette.success.main }
              }}
              onClick={CreateCard}
            >
              Add
            </Button>
            <Button onClick={toggleOpenCard}
              sx={{
                boxShadow: 'none',
                cursor: 'pointer',
                color: 'white',
                minWidth: '32px',
                bgcolor: '#ffffff3d',
                '&:hover': { bgcolor: 'red' },

              }}
            >
              <CloseIcon fontSize='small' />
            </Button>
          </Box>
      }

    </Box>
  )
}

export default ELementFooter