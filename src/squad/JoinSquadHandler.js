import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import config from "../SquadifyConfig.js";
import checkAuthorisation from "../auth/checkAuthorisation.js";
import redirectToSpotifyLogin from "../auth/redirectToSpotifyLogin.js"

class JoinSquadHandler extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    return this.state.loading ?
      null :
      <Redirect to="/"/>
  }

  componentDidMount() {
    fetch(config.baseUrl + ":8080/squads/" + this.props.squadKey + "/join", {
      credentials: "include"
    })
    .then(checkAuthorisation)
    .then(() => this.setState({ loading: false }))
    .catch(redirectToSpotifyLogin)
  }

}

export default JoinSquadHandler;