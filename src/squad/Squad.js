import React, { Component } from 'react';
import SquadActionButtons from "./buttons/SquadActionButtons.js";
import SquadHeading from "./heading/SquadHeading.js";
import SquadMember from "./member/SquadMember.js";
import config from "../SquadifyConfig.js";
import Notification from "../page/Notification.js";
import UpdateSquadRequest from "../.tmp/updatesquadrequest";

class Squad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.squad.name,
      squadId: props.squad.squadId,
      owner: props.squad.owner,
      members: props.squad.members,
      requests: props.squad.requests,
      playlistUrl: props.squad.playlist == null ? null : props.squad.playlist.url,
      isEditing: props.squad.isEditing,
      isPrimary: props.isPrimary,
      showNotification: false,
      isLoadingPlaylist: false
    }
    this.addPlaylistUrl = this.addPlaylistUrl.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.deleteSquad = this.deleteSquad.bind(this);
    this.copyInviteLinkToClipboard = this.copyInviteLinkToClipboard.bind(this);
    this.approveRequest = this.approveRequest.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.renameSquad = this.renameSquad.bind(this);
  }

  render() {
    console.log(this.state.squadId + " (" + this.state.name + ")")
    return (
      <div className="panel is-success has-background-white" key={this.state.squadId}>
        <SquadHeading squadName={this.state.name} isEditing={this.state.isEditing} isPrimary={this.state.isPrimary} renameSquad={this.renameSquad}/>
        <SquadMember key={this.state.squadId + this.state.owner.username} user={this.state.owner} isOwner={true}/>
        {this.state.members.map(member => <SquadMember key={this.state.squadId + member.username} user={member} deleteMember={this.deleteMember} isPrimary={this.state.isPrimary}/>)}
        {this.state.requests.map(request => <SquadMember key={this.state.squadId + request.username} user={request} isPrimary={this.state.isPrimary} type="pending" approveRequest={this.approveRequest} declineRequest={this.declineRequest}/>)}
        <SquadActionButtons key={this.state.squadId + "buttons"} isPrimary={this.state.isPrimary} playlistUrl={this.state.playlistUrl} isLoadingPlaylist={this.state.isLoadingPlaylist } addPlaylistUrl={this.addPlaylistUrl} createPlaylist={this.createPlaylist} deleteSquad={this.deleteSquad} copyInviteLinkToClipboard={this.copyInviteLinkToClipboard}/>
        <Notification visible={this.state.showNotification} ></Notification>
      </div>
    )
  }

  addPlaylistUrl(playlistUrl) {
    this.setState({ playlistUrl: playlistUrl });
  }

  renameSquad(name) {
    const request = new UpdateSquadRequest({
      name: name
    });
    let url = config.apiUrl + "/v1/squads/" + this.state.squadId;
    const response = fetch(url, {
      credentials: "include",
      method: "put",
      body: JSON.stringify(request)
    });
    response.then(response => {
      this.setState({
        name: name 
      })
    })
  }

  approveRequest(approvedRequest) {
    fetch(config.apiUrl + "/v1/squads/" + this.state.squadId + "/members/" + approvedRequest.username, {
      credentials: "include",
      method: "put"
    })
    this.setState({ 
      members: this.state.members.concat(approvedRequest),
      requests: this.state.requests.filter(request => request.username != approvedRequest.username)
    });
  }

  declineRequest(declinedRequest) {
    fetch(config.apiUrl + "/v1/squads/" + this.state.squadId + "/requests/" + declinedRequest.username, {
      credentials: "include",
      method: "delete"
    })
    this.setState({ 
      requests: this.state.requests.filter(request => request.username != declinedRequest.username)
    });
  }

  deleteMember(deletedMember) {
    fetch(config.apiUrl + "/v1/squads/" + this.state.squadId + "/members/" + deletedMember.username, {
      credentials: "include",
      method: "delete"
    });
    this.setState({ 
      members: this.state.members.filter(member => member.username !== deletedMember.username),
    });
  }

  createPlaylist() {
    this.setState({isLoadingPlaylist: true});
    const url = config.apiUrl + "/v1/squads/" + this.state.squadId + "/playlist";
    fetch(url, {
      method: "post",
      credentials: "include"
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
          isLoadingPlaylist: false,
          playlistUfl: json.url
          });
    });  
  }

  deleteSquad() {
    this.props.deleteSquad(this.state.squadId);
  }

  copyInviteLinkToClipboard() {
    let tempInput = document.createElement("input");
    tempInput.value = config.clientUrl + "/join/" + this.state.squadId;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    this.setState({showNotification: true});
    setTimeout(() => this.setState({showNotification: false}), 2000);
  }

}

export default Squad;