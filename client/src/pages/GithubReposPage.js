import React, {useContext} from "react";
import {Search} from "../components/Search";
import {Card} from "../components/Card";
import {Alert} from "../components/Alert";
import {GithubContext} from "../context/github/githubContext";
import Loader from '../components/Loader/Loader';

export const GithubReposPage = () => {
  const {loading, users} = useContext(GithubContext)

  return (
  <React.Fragment>
    <h5>на этой странице мы ищем репозитории в github</h5>
    <Alert alert={{text: 'some alert'}}/>
    <Search />
    <div className="row">

      {loading
        // ? <p className="loading">Loading...</p>
        ? <Loader />
        : users.map(user => (
          <div className="col s3 m4" key={user.id}>
            <Card user={user} />
          </div>
        ))
      }

    </div>
  </React.Fragment>
  )
}
