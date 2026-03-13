import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 


const getConfig=(token)=>{
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}


export const fetchPrompts = async (token,search, category) => {
    const response = await axios.get(API_URL, {params: {search, category}, ...getConfig(token)})

    return response.data
}

export const createPrompt = async (token,promptData)=>{
    const response = await axios.post(API_URL, promptData,getConfig(token))

    return response.data
}


export const updatePrompt = async (token, id, promptData)=>{
    const response = await axios.put(`${API_URL}/${id}`, promptData, getConfig(token))
    return response.data
}

export const deletePrompt = async (token, id)=>{
    const response = await axios.delete(`${API_URL}/${id}`, getConfig(token))

    return response.data
}

export const upvotePromptApi = async (token, id) => {
    const response = await axios.post(`${API_URL}/${id}/upvote`, {}, getConfig(token))
    return response.data
}