import React, {useContext, useEffect, Fragment} from "react";
import {GithubContext} from "../context/github/githubContext";
import {Link} from "react-router-dom";
import {Repos} from "../components/Repos";
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';

export const DetailPage = ({match}) => {
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
  const urlName = match.params.name

  useEffect(() => {
    getUser(urlName)
    getRepos(urlName)
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loader />
  }

  const {
    name, company, avatar_url, login, html_url, public_repos
  } = user

  return (
    <Fragment>
      <Link className='' to='/'>
        <Button
          type="error"
        >
          Main Page
        </Button>
      </Link>

      <div className="col s12 m7">
        <h2 className="header">{login}</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img src={avatar_url} alt={name} rel="noreferrer"/>
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>Information:</p>
              {login && <p>UserName: {login}</p>}
              {company && <p>Company: {company}</p>}
              {public_repos && <p>Public Repos: {public_repos}</p>}
            </div>
            <div className="card-action">
              <a href={html_url} target="_blank" rel="noreferrer">Profile on Github</a>
            </div>
          </div>
        </div>
      </div>

      <Repos repos={repos}/>
    </Fragment>
  )
}
