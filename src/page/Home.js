import React, { Component } from 'react';
import HeadingBar from "./HeadingBar.js"
import Squads from "../squad/Squads.js"
class Home extends Component {

  render() {
      return this.props.user ?
       <div className="container has-background-black is-fullheight p-4 is-max-desktop">
        <HeadingBar name={this.props.user.name} createSquad={this.props.createSquad}/>
        <Squads currentUser={this.props.user.username} squads={this.props.squads} deleteSquad={this.props.deleteSquad}/>
      </div>
      : null
  }

}

export default Home;