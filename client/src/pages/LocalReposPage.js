import React from "react";
import Button from '../components/Button/Button';

export const LocalReposPage = () => {
  return (
    <React.Fragment>
      <h1>Local Repositories</h1>

      <Button
        type="primary"
        onClick={() => console.log('click')}
      >
        go to desktop app
      </Button>

      <Button
        type="success"
        onClick={() => console.log('click')}
      >
        saved links
      </Button>

      <Button
        type="success"
        onClick={() => console.log('click')}
      >
        add link
      </Button>

    </React.Fragment>
  )
}
