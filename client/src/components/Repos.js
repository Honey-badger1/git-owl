import React from "react";

export const Repos = ({repos}) =>(
  <React.Fragment>
    {repos.map(repo => (
      <div className="" key={repo.id}>
        <h5>
          <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
        </h5>
      </div>
      )
    )}
  </React.Fragment>
)
