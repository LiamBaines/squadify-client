import { Component } from 'react';

import config from "../SquadifyConfig.js";

class Login extends Component {

  render() {
    return null;
  }

  componentDidMount() {
    let redirect = window.location.pathname
    const url = "https://accounts.spotify.com/authorize"
      + "?client_id=" + config.clientId()
      + "&response_type=code"
      + "&state=" + redirect 
      + "&redirect_uri=" + config.baseUrlEscaped() + "%3A8080%2Fauth%2Fcallback";
    window.location.href = url;
  }

}

export default Login;