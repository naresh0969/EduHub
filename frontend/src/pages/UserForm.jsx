import React from 'react'
import { useAuth } from "./AuthContext";


function UserForm() {
  const { setIsAuthenticated } = useAuth();

  return (
    <div>
      <h1>hello</h1>
      <button onClick={() => setIsAuthenticated(false)}>Logout</button>

    </div>
  )
}

export default UserForm
