import React, { Component } from "react";

class SquadMemberRemoveButton extends Component {

  render() {
    return (
      <div className="column is-one-quarter has-text-right m-0 p-0">
        <span className="has-text-grey-light px-2 is-size-5 is-clickable" onClick={() => this.props.deleteMember(this.props.user)}><i className="fas fa-times"></i></span>
      </div>
    )
  }

}

export default SquadMemberRemoveButton;