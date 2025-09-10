/* eslint-disable no-unused-vars */
import { createSlice, current } from "@reduxjs/toolkit";

// Khởi tạo giá trị của 1 slice trong redux
const initialState = {
    currentActiveCard: null,
    isShowModalActiveCard: false
}

// khởi tạo 1 slice trong kho lưu trữ - redux store
export const activeCardSlice = createSlice({
    name: 'activeCard',
    initialState,
    // reducers: nơi xử lý đồng bộ
    reducers: {
        // lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của redux
        showModelActiveCard: (state) => {
            state.isShowModalActiveCard = true
        },
        // xóa và ẩn current active card
        clearAndHideCurrentActiveCard: (state) => {
            state.currentActiveCard = null,
                state.isShowModalActiveCard = false

        },
        updateCurrentActiveCard: (state, action) => {
            const fullCard = action.payload
            // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer , ở đây chúng ta gắn ra 1 biến có ý nghĩa hơn

            // xử lý dữ liệu cần thiết

            // update lại dữ liệu currentActiveCard trong redux
            state.currentActiveCard = fullCard
        }
    },
    // extraReducers: nới xử lý dữ liệu bất đồng bộ 
    extraReducers: (builder) => { }
})

// Active creator are generated for each case reducer function
// Action là nơi dành cho các conpoment bên dưới gọi bằng dispath() tới để cập nhật là dữ liẹu thông qua reducer (chạy đồng bộ)
// để ý ở trên thì không thấy   properties action đâu cả , bởi vì những cái action này đơn giản là được redux tạo tự động theo tên của redux

export const {
    clearAndHideCurrentActiveCard,
    showModelActiveCard,
    updateCurrentActiveCard
} = activeCardSlice.actions


export const selectCurrentActiveCard = (state) => {
    return state.activeCard.currentActiveCard
}

export const selectIsShowModalActiveCard = (state) => {
    return state.activeCard.isShowModalActiveCard
}

export const activeCardReducer = activeCardSlice.reducer




