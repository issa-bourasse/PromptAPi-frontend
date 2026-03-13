import React,{useState} from 'react'
import './AuthForm.css'

function AuthForm({type,onSubmit}) {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(type ==="register" && !name){
            setError("Name is required for registration")
            return
        }
        if(!email){
            setError("Email is required")
            return  
        }
        if(!password){
            setError("Password is required")
            return
        }
        const formData = {name,email,password}
        setError('')
        onSubmit(formData)

    }

  return (
    <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{type === "register" ? "Create Account" : "Welcome Back"}</h2>
            {type === "register" && (
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            )}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">
                {type === "register" ? "Register" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default AuthForm