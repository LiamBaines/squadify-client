import React, { Component } from 'react';
import queryString from "query-string";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

class CodeProcessor extends Component {

  render() {
    let query = queryString.parse(this.props.location.search);
    this.props.setSpotifyCode(query.code);
    console.log("redirecting to " + query.state);
    return <Redirect to={query.state} spotifyCode={query.code}/>
  }

}

export default CodeProcessor;