import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {GithubReposPage} from "./pages/GithubReposPage";
import {LocalReposPage} from "./pages/LocalReposPage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";
import {Alert} from "./components/Alert";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <React.Fragment>
        {/*<Alert alert={{text: 'test alert'}}/>*/}
        <Switch>
          <Route path="/links" exact>
            <GithubReposPage/>
          </Route>
          <Route path="/create" exact>
            <LocalReposPage/>
          </Route>
          <Route path="/detail/:id">
            <DetailPage/>
          </Route>
          <Route path="/profile/:id">
            <DetailPage/>
          </Route>
          <Redirect to="/create"/>
        </Switch>
      </React.Fragment>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}
