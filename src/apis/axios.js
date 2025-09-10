import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authozieAxios";

import { API_ROOT } from "~/utils/constant";

// Board
// export const fetchBoardDetailsAPI = async (id) => {
//     const res = await axios.get(`${API_ROOT}/v1/board/${id}`)
//     return res.data
// }
export const updateBoardDetailsAPI = async (id , data) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/board/${id}`,data)
    return res.data
}

export const movecardToDiffentColumnAPI = async (data) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/board/supports/moving_card`,data)
    return res.data
}
export const fetchBoardsAPI = async (searchPath) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/board${searchPath}`)
    return response.data
}

export const createNewBoardAPI = async (data) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/board`, data)
    toast.success('Board create successfully')
    return res.data
}

export const inviteUserToBoardAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/invitations/board`, data)
    toast.success('user invited to board successfully!')
    return response.data
}




// Column
export const createNewColumnAPI = async (data) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/column`, data)
    return res.data
}

export const updateColumnDetailsAPI = async (id , data) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/column/${id}`,data)
    return res.data
}

export const deleteColumnDetailsAPI = async (id ) => {
    const res = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/column/${id}`)
    return res.data
}

// card
export const createNewCardAPI = async (data) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/card`, data)
    return res.data
}
export const updateCardDetailsAPI = async (id , data) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/card/${id}`,data)
    return res.data
}

// user 
export const registerUser = async(data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/user/register`, data)
    toast.success('Account created successfully !')
    return response.data
}   

export const verifyUserAPI = async(data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/user/verify`, data)
    toast.success('Account verified successfully !')
    return response.data
} 

export const refreshTokenAPI = async() => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/user/refresh_token`)
    return response.data
} 