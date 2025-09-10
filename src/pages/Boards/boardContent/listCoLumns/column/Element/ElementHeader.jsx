import React from 'react'
import { Box } from '@mui/system';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useAnchorElement } from './HandlElement';
import ToggleFocusInput from '~/components/From/ToggleFocusInput';
import { updateColumnDetailsAPI } from '~/apis/axios';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentActiveBoard, updateCurrentActiveBoards } from '~/redux/activeBoard/activeBoardSlice';



const ElementHeader = ({ column, toggleOpenCard, handleDeleteColumn }) => {
    const dispacth = useDispatch()
     const board = useSelector(selectCurrentActiveBoard)
     console.log("🚀 ~ ElementHeader ~ board:", board)
    const COLUM_HEADER_HEIGHT = '50px';
    const { anchorEl, open, handleClick, handleClose } = useAnchorElement()
    const onUpdateColumnTitle = async (newTitle) => {
        // call api update column
        await updateColumnDetailsAPI(column._id, { title: newTitle })
        // update dữ liệu ở redux
        .then(() => {
            const newBoard = cloneDeep(board)
            const columnToUpdate = newBoard.columns.find(c => c._id === column._id)
            if (columnToUpdate) columnToUpdate.title = newTitle      
            dispacth(updateCurrentActiveBoards(newBoard))
        })
    }
    return (
        <div>
            <Box sx={{
                height: COLUM_HEADER_HEIGHT,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* <Typography
                    sx={{
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    {column.title}
                </Typography> */}
                <ToggleFocusInput
                    value={column.title}
                    onChangedValue={onUpdateColumnTitle}
                />
                <Box>
                    <div>
                        <Tooltip title="dropDown Column">
                            <KeyboardArrowDownIcon
                                sx={{
                                    color: 'text.primary',
                                    cursor: 'pointer'
                                }}
                                id="column-basic-dropdown"
                                aria-controls={open ? 'menu-dropdown-column' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : 'false'}
                                onClick={handleClick}
                            />
                        </Tooltip>
                        <Menu
                            id="menu-dropdown-column"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                list: {
                                    'aria-labelledby': 'column-basic-dropdown',
                                },
                            }}
                            sx={{ color: 'white' }}
                        >
                            <MenuItem
                                onClick={toggleOpenCard}
                                sx={{
                                    '&:hover': {
                                        color: 'success.light',
                                        '& .Add-Card-Icon': {
                                            color: 'success.light'
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon><AddCardIcon className='Add-Card-Icon' fontSize="small" /></ListItemIcon>
                                <ListItemText>App new card</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                onClick={handleDeleteColumn}
                                sx={{
                                    '&:hover': {
                                        color: 'warning.dark',
                                        '& .Delete-Forever-Icon': {
                                            color: 'warning.dark'
                                        }
                                    }
                                }}

                            >
                                <ListItemIcon><DeleteForeverIcon className='Delete-Forever-Icon' fontSize="small" /></ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default ElementHeader
