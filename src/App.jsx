import './App.css'
import { useState,useEffect } from 'react'
import { fetchPrompts,createPrompt,updatePrompt,deletePrompt,upvotePromptApi } from './api/promptApi'
import {loginUser,registerUser,getMe} from './api/authApi'
import PromptList from './components/PromptList'
import PromptForm from './components/PromptForm'
import SearchBar from './components/SearchBar'
import AuthForm from './components/AuthForm'

function App() {

  const [prompt,setPrompt] = useState([])
  const [search,setSearch] = useState('')
  const [category,setCategory] = useState('')
  const [editingPrompt,setEditingPrompt] = useState(null)
  const [authMode , setAuthMode] = useState('login')
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(localStorage.getItem('token') || '')
  const [message,setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadPrompts = async () => {
    try{
      setMessage('')
      const data = await fetchPrompts(token,search, category)
      setPrompt(data)
    } catch (error) {
      console.error('Error fetching prompts:', error)
      setMessage('Error fetching prompts')

    }
  }

  useEffect(()=>{
    const loadCurrentUser = async () =>{
      try{
        if(!token){
          setUser(null)
          setIsLoading(false)
          return
        }
        const currentUser = await getMe(token)
        setUser(currentUser)
      } catch (error) {
        localStorage.removeItem("token")
        setToken('')
        setUser(null)
      }
      setIsLoading(false)
    }
    loadCurrentUser()
  }, [token])  

  

  useEffect(()=>{
    if(token){
       loadPrompts()
    }
   
  },[token,search,category])

const handleRegister = async (userData) => {
  try{
    setMessage('')
    const data = await registerUser(userData)
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser({
      _id:data._id,
      name:data.name,
      email:data.email
    })
  }catch (error) {
    setMessage(error.response?.data?.message || 'Error registering user')
  }
}

const handleLogin = async (userData) => {
  try{
    setMessage('')
    const data = await loginUser(userData)
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser({
      _id:data._id,
      name:data.name,
      email:data.email
    })
  }catch (error) {
    setMessage(error.response?.data?.message || 'Error logging in')
  }
}

const handleLogout=()=>{
  localStorage.removeItem('token')

  setToken('')
  setUser(null)
  setPrompt([])
  setEditingPrompt(null)
  setMessage('')
}

  const handleSubmit = async (promptData) => {
    try{
      if(editingPrompt){
        await updatePrompt(token,editingPrompt._id, promptData)
        setEditingPrompt(null)
      }else{
        await createPrompt(token, promptData)
      }

      loadPrompts()
    }catch (error) {
      console.error('Error saving prompt:', error)
      setMessage('Error saving prompt')
    }
  }

  const handleDelete = async (id) => {
    try{
      await deletePrompt(token, id)
      loadPrompts()
    }catch (error) {
      console.error('Error deleting prompt:', error)
    }
  }

  const handleUpvote = async (id) => {
    try{
      await upvotePromptApi(token, id)
      loadPrompts()
    }catch (error) {
      console.error('Error upvoting prompt:', error)
    }
  }
const handleEdit = (prompt) => {
  setEditingPrompt(prompt)
}
const clearEditing = () => {
  setEditingPrompt(null)
}
if(!user){
  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Prompt Library</h1>
        <p>Save, organize, search and upvote useful AI prompts</p>
      </header>
       <p>Login or Create an account to use the platform</p>
      {message && <p style={{color:'red'}}>{message}</p>}

      {authMode === 'login' ? (
        <AuthForm type="login" onSubmit={handleLogin} />
      ) : (
        <AuthForm type="register" onSubmit={handleRegister} />
      )}

      <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
        Switch to {authMode === 'login' ? 'Need an account' : 'Already have an account? Login'}
      </button>
      </div>
  )
}
  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Prompt Library</h1>
        <p>Save, organize, search and upvote useful AI prompts</p>
      </header>
     
<button onClick={handleLogout}>Logout</button>
     <SearchBar
     search={search}
     setSearch={setSearch}
      category={category}
      setCategory={setCategory}
     />

     <PromptForm
     onSubmit={handleSubmit}
     editingPrompt={editingPrompt}
     clearEditing={clearEditing}
     />
     <PromptList
     prompts={prompt}
     onEdit={handleEdit}
      onDelete={handleDelete}
      onUpvote={handleUpvote}
     />
    </div>
  )
}

export default App
