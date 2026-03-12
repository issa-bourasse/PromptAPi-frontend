import React from 'react'
import { useState,useEffect } from 'react'


function PromptForm({onSubmit, editingPrompt, clearEditing}) {
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [promptText, setPromptText] = useState('')
        const [category, setCategory] = useState('')
        const [tags, setTags] = useState('')

    useEffect(()=>{
        if(editingPrompt){
            setTitle(editingPrompt.title || "")
            setDescription(editingPrompt.description || "")
            setPromptText(editingPrompt.promptText || "")
            setCategory(editingPrompt.category || "")
            setTags(editingPrompt.tags.join(',') || "")
        }
    },[editingPrompt])

    const resetForm = ()=>{
        setTitle('')
        setDescription('')
        setPromptText('')
        setCategory('')
        setTags('')
    }
const handleSubmit = (e)=>{
    e.preventDefault()

    const promptData = {
        title,
        description,
        promptText,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    }
    onSubmit(promptData)
    resetForm()
}

const handleCancel = ()=>{
    resetForm()

    clearEditing()
}

  return (
    <form className="prompt-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{editingPrompt ? '✏️ Edit Prompt' : '➕ Add New Prompt'}</h2>
      <input
        className="form-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        className="form-textarea"
        placeholder="Prompt Text"
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
      />
      <div className="form-row">
        <input
          className="form-input"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          {editingPrompt ? 'Update' : 'Create'}
        </button>
        <button className="btn btn-secondary" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default PromptForm