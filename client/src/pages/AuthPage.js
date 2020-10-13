import React, {useState} from "react";

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value })
  }



  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Git R A</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>

              <div className="input-field">
                <input placeholder="Enter email" id="email" type="text" name="email"
                       onChange={changeHandler} />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input placeholder="Enter password" id="password" type="password" name="password"
                       onChange={changeHandler} />
                <label htmlFor="email">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{marginRight: 20}}>Enter</button>
            <button className="btn grey lighten-1 black-text">Registration</button>
          </div>
        </div>
      </div>
    </div>
  )
}