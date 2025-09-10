import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import authorizedAxiosInstance from "~/utils/authozieAxios";

import { API_ROOT } from "~/utils/constant"

// khởi giá trị state của một cái slice trong redux
const initialState = {
    currentUser: null
}

// các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu redux , dùng middleware createAsyncThunk đi kèm với extraReducers
// khởi tạo 1 cái slice trong kho lưu  trữ - Redux Store
export const loginUserAPI = createAsyncThunk(
    'user/LoginUserAPI',
    async (data) => {
        const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/user/login`, data)

        return res.data
    }
)
export const logoutUserAPI = createAsyncThunk(
    'user/logoutUserAPI',
    async (showSuccessMessage = true) => {
        const res = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/user/logout`)
        if (showSuccessMessage) {
            toast.success('logged out successfully')
        }
        return res.data
    }
)

export const updateUserAPI = createAsyncThunk(
    'user/updateUserAPI',
    async (data) => {
        const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/user/update`, data)
        return res.data
    }
)



export const userSlice = createSlice({
    name: 'user',
    initialState,
    // Reducers nơi sử lý dữ liệu đồng bộ
    reducers: {

    },

    // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            // action.payload ở đây chính là cái response.data trả về ở trên
            const user = action.payload

            // xử lý dữ liệu cần thiết

            // update lại dữ liệu của cái currentUser
            state.currentUser = user
        })
        builder.addCase(logoutUserAPI.fulfilled, (state) => {

            // update lại dữ liệu của cái currentUser khi logout là  null
            state.currentUser = null
        })

        builder.addCase(updateUserAPI.fulfilled, (state, action) => {
            const user = action.payload
            state.currentUser = user
        })
    }


})

// Action creators are generated for each case reducer function
// Action là nơi dùng cho component bên dưới gọi dispacth() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// để ý ở trên thì không thấy propertions  action đâu cả , bởi vì những cái action này đơn giản là được thằng redux tạo tự động theo tên của redux nhé 
// export const { } = userSlice.actions



// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong kho redux store ra sử dụng
export const selectCurrentUser = (state) => {
    return state.user.currentUser
}
// cái file này tên là activeBoardSilce nhưng chúng ta sẽ export một thứ tên là Reducer, mọi người lưu ý :D
// export default activeBoardSlice.reducer
export const userReducer = userSlice.reducer