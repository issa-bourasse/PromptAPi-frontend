import './App.css'
import { useState,useEffect } from 'react'
import { fetchPrompts,createPrompt,updatePrompt,deletePrompt,upvotePromptApi } from './api/promptApi'

import PromptList from './components/PromptList'
import PromptForm from './components/PromptForm'
import SearchBar from './components/SearchBar'

function App() {

  const [prompt,setPrompt] = useState([])
  const [search,setSearch] = useState('')
  const [category,setCategory] = useState('')
  const [editingPrompt,setEditingPrompt] = useState(null)

  useEffect(()=>{
    loadPrompts()
  },[search,category])

  const loadPrompts = async () => {
    try{
      const data = await fetchPrompts(search, category)
      setPrompt(data)
    } catch (error) {
      console.error('Error fetching prompts:', error)

    }
  }

  const handleSubmit = async (promptData) => {
    try{
      if(editingPrompt){
        await updatePrompt(editingPrompt._id, promptData)
        setEditingPrompt(null)
      }else{
        await createPrompt(promptData)
      }

      loadPrompts()
    }catch (error) {
      console.error('Error saving prompt:', error)
    }
  }

  const handleDelete = async (id) => {
    try{
      await deletePrompt(id)
      loadPrompts()
    }catch (error) {
      console.error('Error deleting prompt:', error)
    }
  }

  const handleUpvote = async (id) => {
    try{
      await upvotePromptApi(id)
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Prompt Library</h1>
        <p>Save, organize, search and upvote useful AI prompts</p>
      </header>

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
