import React, { Component } from "react";
import config from "../SquadifyConfig.js";

class JoinLogin extends Component {

  render() {
    console.log("Rendering JoinLogin")
    return null;
  }

  componentDidMount() {
    const response = fetch(config.apiUrl + "/auth/login?redirect=" + config.apiUrlEscaped + "%2Fjoin%2F" + this.props.squadKey);
    response.then(response => response.json()).then(json => {
      window.location.href = json.redirect;
    });
  }

}

export default JoinLogin;