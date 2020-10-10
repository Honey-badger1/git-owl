import React, {Component} from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        Header
        <form>
          <fieldset>
            <legend>Auth</legend>
            <p><label htmlFor="name">Имя <em>*</em></label><input type="text" id="name"/></p>
            <p><label htmlFor="email">E-mail</label><input type="email" id="email"/></p>
            <p><label htmlFor="password">Password <em>*</em><input type="password" id="password"/></label></p>
          </fieldset>
          <p><input type="submit" value="Отправить"/></p>
        </form>
      </div>
    )
  }
}
