import React, { Component } from 'react';
import SquadActionButtons from "./buttons/SquadActionButtons.js";
import SquadHeading from "./heading/SquadHeading.js";
import SquadMember from "./member/SquadMember.js";
import config from "../SquadifyConfig.js";
import Notification from "../page/Notification.js";

class Squad extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.squad.name,
      owner: props.squad.owner,
      members: props.squad.members,
      memberRequests: props.squad.memberRequests,
      squadKey: props.squad.squadKey,
      playlistUrl: props.squad.playlistUrl,
      isEditing: props.squad.isEditing,
      isPrimary: props.isPrimary,
      showNotification: false,
      isLoadingPlaylist: false
    }
    this.addPlaylistUrl = this.addPlaylistUrl.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.deleteSquad = this.deleteSquad.bind(this);
    this.copyInviteLinkToClipboard = this.copyInviteLinkToClipboard.bind(this);
    this.manageSquadMembers = this.manageSquadMembers.bind(this);
    this.renameSquad = this.renameSquad.bind(this);
  }

  render() {
    return (
      <div className="panel is-success has-background-white" key={this.state.squadKey}>
        <SquadHeading squadName={this.state.name} isEditing={this.state.isEditing} isPrimary={this.state.isPrimary} renameSquad={this.renameSquad}/>
        <SquadMember key={this.state.squadKey + this.state.owner.username} user={this.state.owner} isOwner={true}/>
        {this.state.members.map(member => <SquadMember key={this.state.squadKey + member.username} user={member} manageSquadMembers={this.manageSquadMembers} isPrimary={this.state.isPrimary}/>)}
        {this.state.memberRequests.map(member => <SquadMember key={this.state.squadKey + member.username} user={member} isPrimary={this.state.isPrimary} type="pending" manageSquadMembers={this.manageSquadMembers}/>)}
        <SquadActionButtons key={this.state.squadKey + "buttons"} isPrimary={this.state.isPrimary} playlistUrl={this.state.playlistUrl} isLoadingPlaylist={this.state.isLoadingPlaylist } addPlaylistUrl={this.addPlaylistUrl} createPlaylist={this.createPlaylist} deleteSquad={this.deleteSquad} copyInviteLinkToClipboard={this.copyInviteLinkToClipboard}/>
        <Notification visible={this.state.showNotification} ></Notification>
      </div>
    )
  }

  addPlaylistUrl(playlistUrl) {
    this.setState({ playlistUrl: playlistUrl });
  }

  renameSquad(newName) {
    const request = {
      newName: newName
    };
    const response = fetch(config.baseUrl + ":8080/squads/" + this.state.squadKey + "/rename", {
      credentials: "include",
      method: "post",
      body: JSON.stringify(request)
    });
    response.then(response => {
      console.log(response);
      this.setState({ name: newName })
    })
  }

  manageSquadMembers(member, action) {
    const request = {
      username: member.username,
      action: action
    };
    fetch(config.baseUrl + ":8080/squads/" + this.state.squadKey + "/members", {
      credentials: "include",
      method: "post",
      body: JSON.stringify(request)
    })
    this.setState({ 
      memberRequests: this.state.memberRequests.filter(pendingMember => member.username !== pendingMember.username)
    })
    if (action === "ACCEPT") {
      const newMembers = this.state.members.slice();
      newMembers.push(member)
      this.setState({
        members: newMembers
      })
    }
    if (action === "REMOVE") {
      this.setState({
        members: this.state.members.filter(removedMember => member.username !== removedMember.username)
      })
    }
  }

  createPlaylist() {
    console.log("Setting isLoadingPlaylist to true")
    this.setState({isLoadingPlaylist: true});
    const url = config.baseUrl + ":8080/playlist/create/" + this.state.squadKey;
    fetch(url, {
      method: "post",
      credentials: "include"
    })
    .then(response => response.json()).then(json => {
      console.log("Setting isLoadingPlaylist to false")
      this.setState(
        {
          isLoadingPlaylist: false,
          playlistUrl: json.playlistUrl
        }
      );
    });  
  }

  deleteSquad() {
    this.props.deleteSquad(this.state.squadKey);
  }

  copyInviteLinkToClipboard() {
    let tempInput = document.createElement("input");
    tempInput.value = config.baseUrl + ":3000/join/" + this.state.squadKey;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    this.setState({showNotification: true});
    setTimeout(() => this.setState({showNotification: false}), 2000);
  }

}

export default Squad;