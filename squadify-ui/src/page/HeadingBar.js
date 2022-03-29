import React, { Component } from 'react';

class HeadingBar extends Component {

  render() {
    return (
      <div className="column">
        <div className="columns is-mobile is-vcentered p-1 m-0">
          <div id="headingContainer" className="column is-two-thirds">
            <h3 id="heading" className="title is-4 has-text-white">
              {this.props.firstName}'s squads
            </h3>
          </div>
          <div className="column is-one-third">
            <button className ="button is-rounded is-success is-fullwidth" onClick={() => this.props.createSquad()}>Add +</button>
        </div>
        </div>
      </div>
    )
  }

}

export default HeadingBar;