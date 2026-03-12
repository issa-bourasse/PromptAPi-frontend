import React from 'react'
import PromptCard from './PromptCard'

function PromptList({prompts, onEdit, onDelete, onUpvote}) {
  if(prompts.length === 0){
    return <p className="no-prompts">No prompts found. Create your first prompt above!</p>
  }
  return (
    <div className="prompt-grid">
      {prompts.map((prompt)=>(
        <PromptCard
        key={prompt._id}
        prompt={prompt}
        onEdit={onEdit}
        OnDelete={onDelete}
        onUpvote={onUpvote}
      />
      ))}
    </div>
  )
}

export default PromptList