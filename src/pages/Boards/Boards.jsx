import React from 'react'
import { Container } from '@mui/system';
import AppBar from '~/components/appBar/AppBar';
import { BoardBar } from './boardBar/BoardBar';
import BoardContent from './boardContent/BoardContent';
const Boards = () => {
  return (
    <div>
       <Container disableGutters maxWidth={false} sx={{ height: '100vh'}}>
        <AppBar />
        <BoardBar />
        <BoardContent />
      </Container>
    </div>
  )
}

export default Boards