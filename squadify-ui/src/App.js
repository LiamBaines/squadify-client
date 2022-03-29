import React, { Component } from 'react';
import Wrap from "./page/Wrap.js";
import JoinSquadHandler from "./squad/JoinSquadHandler";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {

  render() {
    console.log("Rendering Squadify");
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Wrap}/>
          <Route path="/join/:squadKey" render={props => <JoinSquadHandler squadKey={props.match.params.squadKey}/>}/>
        </Switch>
      </Router>
    )
  }

}

export default App;
