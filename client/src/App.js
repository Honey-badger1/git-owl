import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from "./context/Auth.context";
import 'materialize-css'
import {useRoutes} from "./routes"
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/Navbar";
import {AlertState} from "./context/alert/AlertState";
import {GithubState} from "./context/github/GithubState";

function App() {
  const {login, logout, token, userId} = useAuth()
  const isAuthenticated = !!token
 // const isAuthenticated = true
  const routes = useRoutes(isAuthenticated)
  return (
    <GithubState>
      <AlertState>
        <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
          <Router>
            { isAuthenticated && <Navbar/> }
            <div className="container">
              {routes}
            </div>
          </Router>
        </AuthContext.Provider>
      </AlertState>
    </GithubState>
  )
}

export default App;
