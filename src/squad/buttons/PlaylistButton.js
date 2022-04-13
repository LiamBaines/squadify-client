import React, { Component } from "react";
import config from "../../SquadifyConfig.js";

class PlaylistButton extends Component {

  render() {
    return this.props.playlistUrl ?
      <GoToPlaylistButton playlistUrl={this.props.playlistUrl}/> :
      <CreatePlaylistButton isPrimary={this.props.isPrimary} isLoadingPlaylist={this.props.isLoadingPlaylist} createPlaylist={this.props.createPlaylist}/>
  }

}

class CreatePlaylistButton extends Component {
  render() {
    return this.props.isPrimary ?
      <div className="control is-expanded">
        <button className={"button is-success is-fullwidth" + (this.props.isLoadingPlaylist ? " is-loading" : "")} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}} onClick={() => this.props.createPlaylist()}>Create Playlist</button>
      </div>
      : null
  }
}

class GoToPlaylistButton extends Component {
  render() {
    return (
      <div className="control is-expanded">
        <a className={"button is-success is-fullwidth"} href={"spotify:playlist:" + this.props.playlistUrl} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>Go to Playlist</a>
      </div>
    )
  }
}

export default PlaylistButton;