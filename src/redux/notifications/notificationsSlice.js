import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from "~/utils/authozieAxios";

import { API_ROOT } from "~/utils/constant"

// khởi giá trị state của một cái slice trong redux
const initialState = {
    currentNotifications: null
}

// các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu redux , dùng middleware createAsyncThunk đi kèm với extraReducers
// khởi tạo 1 cái slice trong kho lưu  trữ - Redux Store
export const fetchInvitationsAPI = createAsyncThunk(
    'notifications/fetchInvitationsAPI',
    async () => {
        const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`)
        return res.data
    }
)

export const updateBoardInvitationsAPI = createAsyncThunk(
    'notifications/updateBoardInvitationsAPI',
    async ({status, invitationId }) => {
        const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, {status})
        return res.data
    }
)

// khởi tạo notificationSlice
export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    // Reducers nơi sử lý dữ liệu đồng bộ
    reducers: {
        clearCurrentNotifications: (state) => {
            state.currentNotifications= null
        },
        updateCurrentNotifications: (state , action) => {
            state.currentNotifications= action.payload
        },
        // thêm mới một cái bản ghi notification vào đầu mảng
        addNotification: (state , action) => {
            const incomingInvitation = action.payload
            // unshift thêm vào đầu mãng
            state.currentNotifications.unshift(incomingInvitation)
        },
    },

    // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
            let incomingInvitations = action.payload
            // đoạn này đảo ngược lại mảng invitation nhận được , đơn giản là để hiển thị cái mới nhất lên đầu
            state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
        })
        builder.addCase(updateBoardInvitationsAPI.fulfilled, (state, action) => {
            let incomingInvitation = action.payload
            // cập nhật lại dữ liệu boardInvitation bên trong nó sẽ có status mới khi update
            const getInvition = state.currentNotifications.find(i => i._id === incomingInvitation._id)
            getInvition.boardInvitation = incomingInvitation.boardInvitation
        })
    }


})


export const { clearCurrentNotifications, updateCurrentNotifications ,addNotification } = notificationSlice.actions



// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong kho redux store ra sử dụng
export const selectCurrentNotification = (state) => {
    return state.notification.currentNotifications
}
export const notificationReducer = notificationSlice.reducer