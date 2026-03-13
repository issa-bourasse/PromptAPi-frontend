import axios from "axios";

const Auth_URL = import.meta.env.VITE_AUTH_URL


export const registerUser = async (userData) => {
    const response = await axios.post(`${Auth_URL}/register`, userData)
    return response.data
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${Auth_URL}/login`, userData)
    return response.data
}

export const getMe = async (token) => {
    const response = await axios.get(`${Auth_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}