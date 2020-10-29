import React, {useContext, useState} from "react";
import 'materialize-css'
import {AlertContext} from "../context/alert/alertContext";
import {GithubContext} from "../context/github/githubContext";

export const Search = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const github = useContext(GithubContext)

  const onSubmit = event => {
    if (event.key !== 'Enter') {
      return
    }

    github.clearUsers()

    if (value.trim()) {
      alert.hide()
      github.search(value.trim())
    } else {
      alert.show('Enter Github user name')
    }
  }

  return (
    <div className="row">
      <div className="input-field col s6">
        <input
          value={value}
          id="first_name2"
          type="text"
          onKeyPress={onSubmit}
          onChange={event => setValue(event.target.value)}/>
          <label className="active" htmlFor="first_name2">Github User Name</label>
      </div>
    </div>
  )
}
