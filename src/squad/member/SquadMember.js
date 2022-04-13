import React, { Component } from "react";
import SquadMemberPendingButtons from "./SquadMemberPendingButtons.js";
import SquadMemberRemoveButton from "./SquadMemberRemoveButton.js";

class SquadMember extends Component {

  render() {
    return (
      <div className="panel-block p-0 m-0">
        <div className="column p-0 m-0">
        <div className="columns is-vcentered is-mobile p-1 m-0">
          <div className="column is-three-quarters">
          <div>
            {this.props.user.name} 
            {this.props.isOwner ? <span className="has-text-success"> <i className="fas fa-crown"> </i></span> : null}
            {this.props.type === "pending" ? <span className="has-text-weight-bold has-text-grey-light is-size-7">  (PENDING)  </span> : null}
          </div>
        </div>
        {(this.props.type === "pending" && this.props.isPrimary) ? <SquadMemberPendingButtons approveRequest={this.props.approveRequest} declineRequest={this.props.declineRequest} user={this.props.user}/> : null}
        {(this.props.type !== "pending" && this.props.isPrimary) ? <SquadMemberRemoveButton deleteMember={this.props.deleteMember} user={this.props.user}/> : null}
        </div>
      </div>
    </div>
    )
  }

} 

export default SquadMember;