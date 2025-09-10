import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from "~/utils/authozieAxios";

import { API_ROOT } from "~/utils/constant"
import { mapOrder } from '~/utils/sort.js'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'
// khởi giá trị state của một cái slice trong redux
const initialState = {
    currentActiveBoard: null
}

// các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu redux , dùng middleware createAsyncThunk đi kèm với extraReducers
// khởi tạo 1 cái slice trong kho lưu  trữ - Redux Store
export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoadDetailsAPI',
    async (boardId) => {
        const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/board/${boardId}`)
        return res.data
    }
)


export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    // Reducers nơi sử lý dữ liệu đồng bộ
    reducers: {
        updateCurrentActiveBoards: (state, action) => {
            // Action.payload là chuẩn đặt tên nhận dữ liệu vào redux , ở đây chúng ta gán nó  ra một biến có ý nghĩa hơn
            const fullBoard = action.payload
            // sử lý dữ liệu cần thiết

            // Update lại dữ liệu của cái currentActiveBoard  
            state.currentActiveBoard = fullBoard
        },
        // update nested data
        //https://redux-toolkit.js.org/usage/immer-reducers#updating-nested-data
        updateCardInBoard : (state, action) => {
            const inComingCard = action.payload

            // tìm board đến column rồi mới đến card
            const column = state.currentActiveBoard.columns.find(i => i._id === inComingCard.columnId)
            if(column){
                const card =column.cards.find(c => c._id === inComingCard._id)
                if (card) {
                    const key = Object.keys(inComingCard)
                    console.log(key);
                    
                    Object.keys(inComingCard).forEach(key => {
                        card[key]=inComingCard[key]
                    })
                }
            }
        },
    },

    // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            // action.payload ở đây chính là cái response.data trả về ở trên
            let board = action.payload

            // xử lý thành viên trong board gọp menber với owner
            board.FE_allUsers = board.owners.concat(board.members)

            // xử lý dữ liệu cần thiết
            board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)],
                        column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
                }
            })

            // update lại dữ liệu của cái currentActiveBoard
            state.currentActiveBoard = board


        })
    }


})

// Action creators are generated for each case reducer function
// Action là nơi dùng cho component bên dưới gọi dispacth() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// để ý ở trên thì không thấy propertions  action đâu cả , bởi vì những cái action này đơn giản là được thằng redux tạo tự động theo tên của redux nhé 
export const { updateCurrentActiveBoards,updateCardInBoard } = activeBoardSlice.actions



// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong kho redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}
// cái file này tên là activeBoardSilce nhưng chúng ta sẽ export một thứ tên là Reducer, mọi người lưu ý :D
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer