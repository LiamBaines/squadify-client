import React, { Component } from "react";

class InviteButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showNotification: false
    }
  }

  render() {
    return (
      <div className="control is-expanded"> 
        <button className="button is-info is-fullwidth" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}} onClick={() => this.props.copyInviteLinkToClipboard()}>Invite</button>
      </div>
    )
  }

}

export default InviteButton;