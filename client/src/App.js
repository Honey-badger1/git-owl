import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from "./context/Auth.context";
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'

function App() {
  const {login, logout, token, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
