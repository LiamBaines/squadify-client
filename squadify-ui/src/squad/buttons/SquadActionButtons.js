import React, { Component } from "react";
import DeleteButton from "./DeleteButton.js";
import InviteButton from "./InviteButton.js";
import PlaylistButton from "./PlaylistButton.js";

class SquadActionButtons extends Component {

  render() {
    console.log("rendering squadactionbuttons with loading " + this.props.isLoadingPlaylist);
    return (
      <div className="field has-addons is-fullwidth">
        <PlaylistButton isPrimary={this.props.isPrimary} isLoadingPlaylist={this.props.isLoadingPlaylist} playlistUrl={this.props.playlistUrl} createPlaylist={this.props.createPlaylist}/>
        <InviteButton copyInviteLinkToClipboard={this.props.copyInviteLinkToClipboard}/>
        <DeleteButton visible={this.props.isPrimary} deleteSquad={this.props.deleteSquad}/>
      </div>
    )
  }

}

export default SquadActionButtons;