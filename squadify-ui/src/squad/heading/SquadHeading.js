import React, { Component } from 'react';

class SquadHeading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: props.isEditing
    }
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  render() {
    return this.state.isEditing ? 
      <EditSquadName squadName={this.props.squadName} renameSquad={this.props.renameSquad} toggleEditing={this.toggleEditing}/> :
      <DisplaySquadName squadName={this.props.squadName} canEdit={this.props.isPrimary} toggleEditing={this.toggleEditing}/>
  }

  toggleEditing() {
    let isEditing = this.state.isEditing;
    this.setState({ isEditing: !isEditing });
  }

}

class EditSquadName extends Component {

  render() {
    return (
      <div className="panel-heading p-0">
        <div className="field has-addons p-3">
          <div className="control is-expanded">
            <input id={this.props.squadName + "-edit"} className="input" type="text"/>
          </div>
          <div className="control">
            <button className="button is-info" onClick={() => {
              this.props.renameSquad(document.getElementById(this.props.squadName + "-edit").value);
              this.props.toggleEditing();
            }}>
              OK
            </button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const input = document.getElementById(this.props.squadName + "-edit")
    input.value = this.props.squadName;
    input.select();
    document.execCommand("copy");
  }

}

class DisplaySquadName extends Component {

  render() {
    return (
      <div className="panel-heading p-0">
        <div className="columns is-mobile is-vcentered p-1 m-0">
          <div className="column is-three-quarters">
            <p>{this.props.squadName}</p>
          </div>
          <EditSquadNameButton visible={this.props.canEdit} toggleEditing={this.props.toggleEditing}/>
      </div>
    </div>
    )
  }

}

class EditSquadNameButton extends Component {

  render() {
    return this.props.visible ?
      <div className="column is-one-quarter has-text-right">
        <i className="far fa-edit has-text-weight-normal is-clickable" onClick={() => this.props.toggleEditing()}/>
      </div>
      : null
  }

}

export default SquadHeading;