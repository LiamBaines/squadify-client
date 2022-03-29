import React, { Component } from 'react';
import Squad from "./Squad.js"

class Squads extends Component {
  render() {
    return (
      <div>
        {this.props.squads.map(squad => {
          return <Squad
            key={squad.squadKey}
            squad={squad}
            isPrimary={squad.owner.username === this.props.currentUser}
            deleteSquad={this.props.deleteSquad}/>
          })}
      </div>
    )
  }
}

export default Squads;