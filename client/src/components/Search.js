import React from "react";
import 'materialize-css'

export const Search = () => {
  const onSubmit = event => {
    if (event.key === 'Enter') {
      console.log(event);
    }
  }

  return (
    <div className="row">
      <div className="input-field col s6">
        <input value="" id="first_name2" type="text" onKeyPress={onSubmit}/>
          <label className="active" htmlFor="first_name2">Github User Name</label>
      </div>
    </div>
  )
}
