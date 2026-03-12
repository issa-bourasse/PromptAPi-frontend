import React from 'react'

function SearchBar({search , setSearch, category, setCategory}) {
  return (
    <div className="search-bar">
        <input className="search-input" type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search prompts...' />
        <input className="search-input" type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Filter by category...' />
    </div>
  )
}

export default SearchBar