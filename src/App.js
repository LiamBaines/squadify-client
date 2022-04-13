import React, { Component } from 'react';
import Home from "./page/Home.js";
import JoinSquadHandler from "./squad/JoinSquadHandler";
import redirectToSpotifyLogin from './auth/redirectToSpotifyLogin.js';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import config from "./SquadifyConfig.js";
import queryString from "query-string";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { squads: [] }
    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.createSquad = this.createSquad.bind(this);
    this.deleteSquad = this.deleteSquad.bind(this);
  }

  componentWillMount() {
    if (document.cookie) {
      fetch(config.apiUrl + "/v1/user", { credentials: "include"})
      .then(response => response.json())
      .then(json => {
        this.setState(json)
      })
    } else {
      redirectToSpotifyLogin();
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Home user={this.state.user} squads={this.state.squads} createSquad={this.createSquad} deleteSquad={this.deleteSquad} setUser={this.setUser}/>}/>
          <Route path="/join/:squadId" render={props => this.state.user ? <JoinSquadHandler squadId={props.match.params.squadId} user={this.state.user}/> : null}/>
          <Route path="/callback" render={() => <Redirect to={queryString.parse(window.location.search).state}/>}/>
        </Switch>
      </Router>
    )
  }

  setUser(json) {
    this.setState(json)
  }

  getUser() {
    if (!this.state.user) {
      redirectToSpotifyLogin();
    }
    return this.state.user;
  }

  createSquad() {
    const newSquads = this.state.squads;
    fetch(config.apiUrl + "/v1/squads", {
      method: "post",
      credentials: "include"
    })
    .then(response => response.json())
    .then(newSquad => {
      newSquad.isEditing = true;
      newSquads.unshift(newSquad);
      this.setState({ squads: newSquads });
      return newSquad;
    })
  }

  deleteSquad(squadId) {
    this.setState({ squads:  this.state.squads.filter(squad => squad.squadId !== squadId)})
    let url = config.apiUrl;
    fetch(url + "/v1/squads/" + squadId, {
      method: "delete",
      credentials: "include"
    })
  }

}

export default App;
