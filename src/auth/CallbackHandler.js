import { Component } from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import config from "../SquadifyConfig";
import checkAuthorisation from "./checkAuthorisation";

class CallbackHandler extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        fetch(config.apiUrl + "/v1/user",
            { credentials: "include"}
        )
        .then(response => response.json())
        .then(checkAuthorisation)
        .then(this.props.setUser)
        .then(() => this.setState({ loading: false }))
    }

    render() {
        if (this.state.loading) {
            return null
        } else {
            return <Redirect to={queryString.parse(window.location.search).state}/>
        }
    }


}

export default CallbackHandler;