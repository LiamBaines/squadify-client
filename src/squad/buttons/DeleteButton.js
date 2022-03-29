import React, { Component } from "react";

class DeleteButton extends Component {

  render() {
    return this.props.visible ?
      <div className="control">
        <button className="button is-danger" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}} onClick={() => this.props.deleteSquad()}><i className="far fa-trash-alt"></i></button>
      </div>
      : null
  }

}

export default DeleteButton;