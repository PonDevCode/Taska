import { Box } from '@mui/system'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Column from './column/Column'
import Button from '@mui/material/Button'
import AddchartIcon from '@mui/icons-material/Addchart';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { InputAdornment, TextField } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CloseIcon from '@mui/icons-material/Close';
const LisColumns = ({ listColumn, createNewColumn, createNewCard, deleteColumnDetails }) => {
    const [openCreateNew, setOpenCreateNew] = useState(false)
    const toggleOpen = () => {
        setOpenCreateNew(!openCreateNew)
        setValueCreate('')
    }
    const [valueCreate, setValueCreate] = useState('')

    const CreateColumn = async () => {
        if (!valueCreate) {
            toast.error('plase')
            return
        }
        const newColumn = {
            title: valueCreate
        }
        await createNewColumn(newColumn)
        setValueCreate('')
        setOpenCreateNew(!openCreateNew)
    }
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

            }} >
                {listColumn.map((item, i) => {
                    return (
                        <Column column={item} key={i}
                            createNewCard={createNewCard}
                            deleteColumnDetails={deleteColumnDetails}
                        />
                    )
                })}

                {/* ----- */}
                {
                    !openCreateNew
                        ? <Box
                            sx={{
                                minWidth: '200px',
                                maxWidth: '250px',
                                mx: 2,
                                borderRadius: '6px',
                                height: 'fit-content',
                                bgcolor: '#ffffff3d'

                            }}
                            onClick={toggleOpen}
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
                        : <Box
                            sx={{
                                minWidth: '200px',
                                maxWidth: '200px',
                                mx: 2,
                                p: 1,
                                borderRadius: '6px',
                                height: 'fit-content',
                                bgcolor: '#ffffff3d',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1
                            }} >
                            <TextField
                                id="outlined-search"
                                label="Create new column"
                                type="search"
                                size="small"
                                autoFocus
                                autoComplete="off"
                                value={valueCreate}
                                onChange={(e) => { setValueCreate(e.target.value) }}
                                sx={{
                                    backgroundColor: 'transparent',
                                    minWidth: 120,
                                    maxWidth: 200,
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
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Button
                                    variant='contained' color='success'
                                    sx={{
                                        boxShadow: 'none',
                                        fontSize: '12px',
                                        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                    }}
                                    onClick={CreateColumn}
                                >
                                    Create column
                                </Button>
                                <Button onClick={toggleOpen}
                                    sx={{
                                        boxShadow: 'none',
                                        cursor: 'pointer',
                                        color: 'white',
                                        bgcolor: '#ffffff3d',
                                        '&:hover': { bgcolor: 'red' }
                                    }}
                                >
                                    <CloseIcon fontSize='small' />
                                </Button>

                            </Box>

                        </Box>
                }


            </Box>
        </SortableContext>
    )
}

export default LisColumns