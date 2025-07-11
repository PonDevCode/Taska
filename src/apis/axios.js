import axios from "axios";
import { API_ROOT } from "~/utils/constant";

// Board
export const fetchBoardDetailsAPI = async (id) => {
    const res = await axios.get(`${API_ROOT}/v1/board/${id}`)
    return res.data
}
export const updateBoardDetailsAPI = async (id , data) => {
    const res = await axios.put(`${API_ROOT}/v1/board/${id}`,data)
    return res.data
}

export const movecardToDiffentColumnAPI = async (data) => {
    const res = await axios.put(`${API_ROOT}/v1/board/supports/moving_card`,data)
    return res.data
}
// Column
export const createNewColumnAPI = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/column`, data)
    return res.data
}

export const updateColumnDetailsAPI = async (id , data) => {
    const res = await axios.put(`${API_ROOT}/v1/column/${id}`,data)
    return res.data
}

export const deleteColumnDetailsAPI = async (id ) => {
    const res = await axios.delete(`${API_ROOT}/v1/column/${id}`)
    return res.data
}

// card
export const createNewCardAPI = async (data) => {
    const res = await axios.post(`${API_ROOT}/v1/card`, data)
    return res.data
}