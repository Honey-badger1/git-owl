import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {GithubReposPage} from "./pages/GithubReposPage";
import {LocalReposPage} from "./pages/LocalReposPage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/links" exact>
            <GithubReposPage/>
          </Route>
          <Route path="/create" exact>
            <LocalReposPage/>
          </Route>
          <Route path="/profile/:name" component={DetailPage}/>
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
