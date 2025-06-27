import React from 'react'
import { Container } from '@mui/system';
import AppBar from '~/components/appBar/AppBar';
import { BoardBar } from './boardBar/BoardBar';
import BoardContent from './boardContent/BoardContent';
import { mockData } from '~/apis/mock-data';
const Boards = () => {
  return (
    <div>
       <Container disableGutters maxWidth={false} sx={{ height: '100vh'}}>
        <AppBar />
        <BoardBar Board={mockData?.board} />
        <BoardContent Board={mockData?.board} />
      </Container>
    </div>
  )
}

export default Boards