import React, {useContext, useState} from "react";
import 'materialize-css'
import {AlertContext} from "../context/alert/alertContext";

export const Search = () => {
  const [value, setValue] = useState('')

  const {show} = useContext(AlertContext)

  const onSubmit = event => {
    if (event.key !== 'Enter') {
      return
    }

    if (value.trim()) {
      console.log('search user', value)
    } else {
      show('Enter Github user name')
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
