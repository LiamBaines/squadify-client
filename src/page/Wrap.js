import React, { Component } from 'react';
import HeadingBar from "./HeadingBar.js"
import Squads from "../squad/Squads.js"
import checkAuthorisation from "../auth/checkAuthorisation.js";
import redirectToSpotifyLogin from "../auth/redirectToSpotifyLogin.js";
import config from "../SquadifyConfig.js";

class Wrap extends Component {

  constructor(props) {
    super(props);
    this.state = { username: undefined }
    this.createSquad = this.createSquad.bind(this);
    this.deleteSquad = this.deleteSquad.bind(this);
  }

  componentDidMount() {
    console.log("Wrap did mount");
    fetch(config.apiUrl + "/user",
      { credentials: "include" }
    )
    .then(checkAuthorisation)
    .then(response => response.json())
    .then(json => this.setState(json))
    .catch(redirectToSpotifyLogin);
  }

  render() {
    return this.state.username ?
      <div className="container has-background-black is-fullheight p-4 is-max-desktop">
        <HeadingBar firstName={this.state.firstName} createSquad={this.createSquad}/>
        <Squads currentUser={this.state.username} squads={this.state.squads} deleteSquad={this.deleteSquad}/>
      </div>
      : null
  }

  createSquad() {
    const newSquads = this.state.squads;
    fetch(config.apiUrl + "/squads", {
      method: "post",
      credentials: "include"
    })
    .then(response => response.json())
    .then(newSquad => {
      newSquad.isEditing = true;
      newSquads.unshift(newSquad);
      this.setState({ squads: newSquads });
    })
  }

  deleteSquad(squadKey) {
    this.setState({ squads: this.state.squads.filter(squad => squad.squadKey !== squadKey) });
    let url = config.apiUrl;
    fetch(url + "/squads/" + squadKey, {
      method: "delete",
      credentials: "include"
    })
  }

}

export default Wrap;