import React, { Component } from 'react';


class Test extends Component {

  render() {
    console.log("Rendering test");
    console.log(this.props.spotifyCode);
    return (
      <p>{this.props.spotifyCode}</p>
    )
  }

}

export default Test;