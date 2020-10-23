import React from "react";
import {Search} from "../components/Search";
import {Card} from "../components/Card";
import {Alert} from "../components/Alert";

export const GithubReposPage = () => {
  const cards = new Array(20).fill('').map((_, i) => i);

  return (
  <React.Fragment>
    <h5>на этой странице мы ищем репозитории в github</h5>
    <Alert alert={{text: 'some alert'}}/>
    <Search />
    <div className="row">
      {cards.map(card => {
        return (
          <div className="col s3 m4" key={card}>
            <Card />
          </div>
        )
      })}
    </div>
  </React.Fragment>
  )
}
