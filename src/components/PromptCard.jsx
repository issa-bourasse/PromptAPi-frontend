import React from 'react'

function PromptCard({prompt , onEdit,OnDelete,onUpvote}) {
  return (
    <div className="prompt-card">
        <div className="card-header">
          <h3 className="card-title">{prompt.title}</h3>
          <span className="card-category">{prompt.category}</span>
        </div>
        <p className="card-description">{prompt.description}</p>
        <pre className="card-prompt-text">{prompt.promptText}</pre>
        <div className="card-tags">
          {prompt.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <button className="btn btn-upvote" onClick={()=>onUpvote(prompt._id)}>👍 {prompt.upvotes}</button>
          <div className="card-actions">
            <button className="btn btn-edit" onClick={()=>onEdit(prompt)}>Edit</button>
            <button className="btn btn-delete" onClick={()=>OnDelete(prompt._id)}>Delete</button>
          </div>
        </div>
    </div>
  )
}

export default PromptCard