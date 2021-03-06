import React, { Component } from "react";

class SquadMemberPendingButtons extends Component {

  render() {
    return (
      <div className="column is-one-quarter has-text-right m-0 p-0">
        <span className="has-text-success px-2 is-size-4 is-clickable" onClick={() => this.props.approveRequest(this.props.user)}><i className="fas fa-check"></i></span>
        <span className="has-text-danger px-2 is-size-4 is-clickable" onClick={() => this.props.declineRequest(this.props.user)}><i className="fas fa-times"></i></span>
      </div>
    )
  }

} 

export default SquadMemberPendingButtons;