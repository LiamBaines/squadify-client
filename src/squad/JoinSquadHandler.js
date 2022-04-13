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
      null
      : <Redirect to="/"/>
  }

  componentWillMount() {
    let url = config.apiUrl + "/v1/squads/" + this.props.squadId + "/requests/" + this.props.user.username
    console.log("PUT " + url)
    fetch(url, {
      credentials: "include",
      method: "put"
    })
    .then(checkAuthorisation)
    .then(() => this.setState({ loading: false }))
    .catch(redirectToSpotifyLogin)
  }

}

export default JoinSquadHandler;