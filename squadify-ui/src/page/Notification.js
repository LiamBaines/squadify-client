import React, { Component } from "react";

class Notification extends Component {

  render() {
    return this.props.visible ?
      <div style={{position: "fixed", left: "50%", bottom: "5%", transform: "translateX(-50%)"}} className="notification p-4 is-warning">Invite link copied to clipboard</div>
      : null
  }

}

export default Notification;