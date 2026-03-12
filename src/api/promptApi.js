import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 


export const fetchPrompts = async (search, category) => {
    const response = await axios.get(API_URL,{params: {search, category}})

    return response.data
}

export const createPrompt = async (promptData)=>{
    const response = await axios.post(API_URL, promptData)

    return response.data
}


export const updatePrompt = async (id, promptData)=>{
    const response = await axios.put(`${API_URL}/${id}`, promptData)
    return response.data
}

export const deletePrompt = async (id)=>{
    const response = await axios.delete(`${API_URL}/${id}`)

    return response.data
}

export const upvotePromptApi = async (id) => {
    const response = await axios.post(`${API_URL}/${id}/upvote`)
    return response.data
}